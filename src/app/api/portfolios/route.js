import sql from "../utils/sql";

// Get portfolios (with optional filtering)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");
    const subdomain = searchParams.get("subdomain");
    const published_only = searchParams.get("published") === "true";
    const limit = parseInt(searchParams.get("limit")) || 50;
    const offset = parseInt(searchParams.get("offset")) || 0;

    let whereConditions = [];
    let params = [];

    if (user_id) {
      whereConditions.push(`user_id = $${params.length + 1}`);
      params.push(user_id);
    }

    if (subdomain) {
      whereConditions.push(`subdomain = $${params.length + 1}`);
      params.push(subdomain);
    }

    if (published_only) {
      whereConditions.push("is_published = true");
    }

    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    const portfolios = await sql(
      `SELECT 
        p.id, p.user_id, p.title, p.subtitle, p.template_id, 
        p.theme_settings, p.is_published, p.subdomain, 
        p.meta_title, p.meta_description, p.created_at, p.updated_at,
        u.username, u.full_name, u.profile_image, u.bio
      FROM portfolios p
      JOIN users u ON p.user_id = u.id
      ${whereClause}
      ORDER BY p.updated_at DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset],
    );

    return Response.json({
      success: true,
      portfolios,
      pagination: {
        limit,
        offset,
        total: portfolios.length,
      },
    });
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return Response.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 },
    );
  }
}

// Create new portfolio
export async function POST(request) {
  try {
    const {
      user_id,
      userId, // Support both formats
      title,
      subtitle,
      template_id = "minimal",
      templateId, // Support both formats
      theme_settings = {},
      portfolioData, // Support portfolio builder format
      subdomain,
      meta_title,
      meta_description,
    } = await request.json();

    // Handle different parameter formats
    const finalUserId = user_id || userId;
    const finalTemplateId = template_id || templateId || "minimal";

    // Validate required fields
    if (!finalUserId) {
      return Response.json(
        { error: "Missing required fields: user_id or userId" },
        { status: 400 },
      );
    }

    // Get user information to create subdomain
    const user = await sql`
      SELECT username, email FROM users WHERE id = ${finalUserId}
    `;

    if (user.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const username = user[0].username;
    const finalSubdomain = subdomain || username;

    // Handle portfolio builder data
    let finalTitle = title;
    let finalSubtitle = subtitle;
    let finalThemeSettings = theme_settings;

    if (portfolioData) {
      finalTitle = portfolioData.title || title || "My Portfolio";
      finalSubtitle = portfolioData.subtitle || subtitle || "Content Creator";
      finalThemeSettings = portfolioData;
    }

    // Validate subdomain if provided
    if (finalSubdomain) {
      const subdomainRegex = /^[a-zA-Z0-9_-]{3,30}$/;
      if (!subdomainRegex.test(finalSubdomain)) {
        return Response.json(
          {
            error:
              "Invalid subdomain format. Must be 3-30 characters with letters, numbers, hyphens, and underscores only.",
          },
          { status: 400 },
        );
      }

      // Check if subdomain is already taken
      const existingPortfolio = await sql`
        SELECT id FROM portfolios WHERE subdomain = ${finalSubdomain}
      `;

      if (existingPortfolio.length > 0) {
        return Response.json(
          { error: "Subdomain already taken" },
          { status: 409 },
        );
      }
    }

    // Check if user already has a portfolio
    const userPortfolio = await sql`
      SELECT id FROM portfolios WHERE user_id = ${finalUserId}
    `;

    let portfolioId;

    if (userPortfolio.length > 0) {
      // Update existing portfolio
      portfolioId = userPortfolio[0].id;

      await sql`
        UPDATE portfolios SET
          title = ${finalTitle || "My Portfolio"},
          subtitle = ${finalSubtitle || "Content Creator"},
          template_id = ${finalTemplateId},
          theme_settings = ${JSON.stringify(finalThemeSettings)},
          subdomain = ${finalSubdomain},
          meta_title = ${meta_title || finalTitle || "My Portfolio"},
          meta_description = ${meta_description || (portfolioData?.bio) || "Creator Portfolio"},
          updated_at = NOW()
        WHERE id = ${portfolioId}
      `;
    } else {
      // Create portfolio
      const portfolios = await sql`
        INSERT INTO portfolios (
          user_id, title, subtitle, template_id, theme_settings,
          subdomain, meta_title, meta_description
        )
        VALUES (
          ${finalUserId}, ${finalTitle || "My Portfolio"}, ${finalSubtitle || "Content Creator"}, ${finalTemplateId}, 
          ${JSON.stringify(finalThemeSettings)}, ${finalSubdomain}, 
          ${meta_title || finalTitle || "My Portfolio"}, ${meta_description || (portfolioData?.bio) || "Creator Portfolio"}
        )
        RETURNING *
      `;

      portfolioId = portfolios[0].id;
    }

    // If portfolioData includes sections, update those too
    if (portfolioData && portfolioData.sections) {
      // Clear existing sections
      await sql`DELETE FROM portfolio_sections WHERE portfolio_id = ${portfolioId}`;

      // Insert new sections
      const sectionsToInsert = portfolioData.sections
        .filter((section) => section.enabled)
        .map((section, index) => ({
          portfolio_id: portfolioId,
          section_type: section.type,
          title: section.title || section.type,
          content: section.data?.content || section.data?.description || "",
          media_urls: JSON.stringify([]),
          settings: JSON.stringify(section.data || {}),
          sort_order: index,
          is_visible: true,
        }));

      for (const section of sectionsToInsert) {
        await sql`
          INSERT INTO portfolio_sections (
            portfolio_id, section_type, title, content, 
            media_urls, settings, sort_order, is_visible
          ) VALUES (
            ${section.portfolio_id}, ${section.section_type}, ${section.title},
            ${section.content}, ${section.media_urls}, ${section.settings},
            ${section.sort_order}, ${section.is_visible}
          )
        `;
      }
    }

    return Response.json(
      {
        success: true,
        portfolioId,
        subdomain: `${finalSubdomain}.elysien.com`,
        message: "Portfolio saved successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return Response.json(
      { error: "Failed to create portfolio" },
      { status: 500 },
    );
  }
}

// Update portfolio
export async function PUT(request) {
  try {
    const {
      id,
      title,
      subtitle,
      template_id,
      custom_css,
      theme_settings,
      is_published,
      subdomain,
      meta_title,
      meta_description,
      favicon_url,
    } = await request.json();

    if (!id) {
      return Response.json(
        { error: "Portfolio ID is required" },
        { status: 400 },
      );
    }

    // Build dynamic update query
    let setClause = [];
    let values = [];

    if (title !== undefined) {
      setClause.push(`title = $${values.length + 1}`);
      values.push(title);
    }
    if (subtitle !== undefined) {
      setClause.push(`subtitle = $${values.length + 1}`);
      values.push(subtitle);
    }
    if (template_id !== undefined) {
      setClause.push(`template_id = $${values.length + 1}`);
      values.push(template_id);
    }
    if (custom_css !== undefined) {
      setClause.push(`custom_css = $${values.length + 1}`);
      values.push(custom_css);
    }
    if (theme_settings !== undefined) {
      setClause.push(`theme_settings = $${values.length + 1}`);
      values.push(JSON.stringify(theme_settings));
    }
    if (is_published !== undefined) {
      setClause.push(`is_published = $${values.length + 1}`);
      values.push(is_published);
    }
    if (subdomain !== undefined) {
      // Validate subdomain format
      if (subdomain) {
        const subdomainRegex = /^[a-zA-Z0-9_-]{3,30}$/;
        if (!subdomainRegex.test(subdomain)) {
          return Response.json(
            { error: "Invalid subdomain format" },
            { status: 400 },
          );
        }

        // Check if subdomain is already taken by another portfolio
        const existingPortfolio = await sql`
          SELECT id FROM portfolios WHERE subdomain = ${subdomain} AND id != ${id}
        `;

        if (existingPortfolio.length > 0) {
          return Response.json(
            { error: "Subdomain already taken" },
            { status: 409 },
          );
        }
      }
      setClause.push(`subdomain = $${values.length + 1}`);
      values.push(subdomain);
    }
    if (meta_title !== undefined) {
      setClause.push(`meta_title = $${values.length + 1}`);
      values.push(meta_title);
    }
    if (meta_description !== undefined) {
      setClause.push(`meta_description = $${values.length + 1}`);
      values.push(meta_description);
    }
    if (favicon_url !== undefined) {
      setClause.push(`favicon_url = $${values.length + 1}`);
      values.push(favicon_url);
    }

    if (setClause.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    // Add updated_at
    setClause.push(`updated_at = NOW()`);

    // Add id for WHERE clause
    values.push(id);

    const portfolios = await sql(
      `UPDATE portfolios SET ${setClause.join(", ")} WHERE id = $${values.length} RETURNING *`,
      values,
    );

    if (portfolios.length === 0) {
      return Response.json({ error: "Portfolio not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      portfolio: portfolios[0],
      message: "Portfolio updated successfully",
    });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return Response.json(
      { error: "Failed to update portfolio" },
      { status: 500 },
    );
  }
}
