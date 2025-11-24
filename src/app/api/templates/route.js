import sql from "../utils/sql";

// Get templates
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const premium_only = searchParams.get("premium") === "true";
    const free_only = searchParams.get("free") === "true";
    const limit = parseInt(searchParams.get("limit")) || 50;
    const offset = parseInt(searchParams.get("offset")) || 0;

    let whereConditions = ["is_active = true"];
    let params = [];

    if (category) {
      whereConditions.push(`category = $${params.length + 1}`);
      params.push(category);
    }

    if (premium_only) {
      whereConditions.push("is_premium = true");
    } else if (free_only) {
      whereConditions.push("is_premium = false");
    }

    const whereClause = `WHERE ${whereConditions.join(" AND ")}`;

    const templates = await sql(
      `SELECT 
        id, name, description, category, preview_image, 
        template_data, is_premium, created_at
      FROM templates
      ${whereClause}
      ORDER BY 
        CASE WHEN is_premium THEN 1 ELSE 0 END,
        created_at DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset],
    );

    return Response.json({
      success: true,
      templates,
      pagination: {
        limit,
        offset,
        total: templates.length,
      },
    });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return Response.json(
      { error: "Failed to fetch templates" },
      { status: 500 },
    );
  }
}

// Create new template (admin only)
export async function POST(request) {
  try {
    const {
      name,
      description,
      category,
      preview_image,
      template_data,
      is_premium = false,
    } = await request.json();

    // Validate required fields
    if (!name || !template_data) {
      return Response.json(
        { error: "Missing required fields: name, template_data" },
        { status: 400 },
      );
    }

    // Validate template_data is valid JSON
    if (typeof template_data !== "object") {
      return Response.json(
        { error: "template_data must be a valid JSON object" },
        { status: 400 },
      );
    }

    // Create template
    const templates = await sql`
      INSERT INTO templates (
        name, description, category, preview_image, 
        template_data, is_premium
      )
      VALUES (
        ${name}, ${description}, ${category}, ${preview_image},
        ${JSON.stringify(template_data)}, ${is_premium}
      )
      RETURNING *
    `;

    const template = templates[0];

    return Response.json(
      {
        success: true,
        template,
        message: "Template created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating template:", error);
    return Response.json(
      { error: "Failed to create template" },
      { status: 500 },
    );
  }
}
