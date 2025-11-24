import sql from "../../utils/sql";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: "Template ID is required" },
        { status: 400 },
      );
    }

    const templates = await sql`
      SELECT id, name, description, category, preview_image, template_data, is_premium, is_active
      FROM templates
      WHERE id = ${id} AND is_active = true
    `;

    if (templates.length === 0) {
      return Response.json({ error: "Template not found" }, { status: 404 });
    }

    const template = templates[0];

    // Parse template_data if it's a string
    if (typeof template.template_data === "string") {
      try {
        template.template_data = JSON.parse(template.template_data);
      } catch (error) {
        console.warn("Could not parse template_data:", error);
      }
    }

    return Response.json({
      success: true,
      template,
    });
  } catch (error) {
    console.error("Error fetching template:", error);
    return Response.json(
      { error: "Failed to fetch template" },
      { status: 500 },
    );
  }
}
