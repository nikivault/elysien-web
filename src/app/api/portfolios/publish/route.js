import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const { userId, portfolioData } = await request.json();

    if (!userId || !portfolioData) {
      return Response.json(
        { error: "Missing required fields: userId, portfolioData" },
        { status: 400 },
      );
    }

    // Get user information to create subdomain
    const user = await sql`
      SELECT username, email FROM users WHERE id = ${userId}
    `;

    if (user.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const username = user[0].username;
    const subdomain = `${username}.elysien.com`;

    // Check if portfolio already exists for this user
    const existingPortfolio = await sql`
      SELECT id FROM portfolios WHERE user_id = ${userId}
    `;

    let portfolioId;

    if (existingPortfolio.length > 0) {
      // Update existing portfolio
      portfolioId = existingPortfolio[0].id;

      await sql`
        UPDATE portfolios SET
          title = ${portfolioData.title || "My Portfolio"},
          subtitle = ${portfolioData.subtitle || "Content Creator"},
          theme_settings = ${JSON.stringify(portfolioData)},
          is_published = true,
          subdomain = ${subdomain},
          meta_title = ${portfolioData.title || "My Portfolio"},
          meta_description = ${portfolioData.bio || "Content Creator Portfolio"},
          updated_at = NOW()
        WHERE id = ${portfolioId}
      `;

      // Clear existing sections
      await sql`DELETE FROM portfolio_sections WHERE portfolio_id = ${portfolioId}`;
    } else {
      // Create new portfolio
      const newPortfolio = await sql`
        INSERT INTO portfolios (
          user_id, title, subtitle, theme_settings,
          is_published, subdomain, meta_title, meta_description
        ) VALUES (
          ${userId}, ${portfolioData.title || "My Portfolio"}, ${portfolioData.subtitle || "Content Creator"},
          ${JSON.stringify(portfolioData)}, true, ${subdomain},
          ${portfolioData.title || "My Portfolio"}, ${portfolioData.bio || "Content Creator Portfolio"}
        ) RETURNING id
      `;
      portfolioId = newPortfolio[0].id;
    }

    // Create portfolio sections from portfolioData
    if (portfolioData.sections && portfolioData.sections.length > 0) {
      const sectionsToInsert = portfolioData.sections
        .filter((section) => section.enabled)
        .map((section, index) => ({
          portfolio_id: portfolioId,
          section_type: section.type,
          title: section.title || section.type,
          content: section.data.content || section.data.description || "",
          media_urls: JSON.stringify([]),
          settings: JSON.stringify(section.data),
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

    // Update user's portfolio analytics for today
    const today = new Date().toISOString().split("T")[0];

    await sql`
      INSERT INTO analytics (user_id, date, portfolio_views, unique_visitors)
      VALUES (${userId}, ${today}, 0, 0)
      ON CONFLICT (user_id, date) DO NOTHING
    `;

    return Response.json({
      success: true,
      message: "Portfolio published successfully",
      url: `https://${subdomain}`,
      subdomain: subdomain,
      portfolioId: portfolioId,
    });
  } catch (error) {
    console.error("Portfolio publish error:", error);
    return Response.json(
      { error: "Failed to publish portfolio" },
      { status: 500 },
    );
  }
}

// Get published portfolio by subdomain
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const subdomain = url.searchParams.get("subdomain");
    const portfolioId = url.searchParams.get("portfolioId");

    let portfolio;

    if (subdomain) {
      portfolio = await sql`
        SELECT p.*, u.username, u.full_name, u.profile_image, u.bio
        FROM portfolios p
        JOIN users u ON p.user_id = u.id
        WHERE p.subdomain = ${subdomain} AND p.is_published = true
      `;
    } else if (portfolioId) {
      portfolio = await sql`
        SELECT p.*, u.username, u.full_name, u.profile_image, u.bio
        FROM portfolios p
        JOIN users u ON p.user_id = u.id
        WHERE p.id = ${portfolioId} AND p.is_published = true
      `;
    } else {
      return Response.json(
        { error: "Missing subdomain or portfolioId parameter" },
        { status: 400 },
      );
    }

    if (portfolio.length === 0) {
      return Response.json({ error: "Portfolio not found" }, { status: 404 });
    }

    // Get portfolio sections
    const sections = await sql`
      SELECT section_type, title, content, media_urls, settings, sort_order
      FROM portfolio_sections
      WHERE portfolio_id = ${portfolio[0].id} AND is_visible = true
      ORDER BY sort_order ASC
    `;

    // Get social accounts for this user
    const socialAccounts = await sql`
      SELECT platform, username, followers_count, posts_count, engagement_rate
      FROM social_accounts
      WHERE user_id = ${portfolio[0].user_id} AND is_active = true
    `;

    // Increment view count
    const today = new Date().toISOString().split("T")[0];
    await sql`
      INSERT INTO analytics (user_id, date, portfolio_views, unique_visitors)
      VALUES (${portfolio[0].user_id}, ${today}, 1, 1)
      ON CONFLICT (user_id, date) 
      DO UPDATE SET portfolio_views = analytics.portfolio_views + 1
    `;

    return Response.json({
      success: true,
      portfolio: {
        ...portfolio[0],
        sections,
        socialAccounts,
        themeSettings: portfolio[0].theme_settings,
      },
    });
  } catch (error) {
    console.error("Error fetching published portfolio:", error);
    return Response.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 },
    );
  }
}
