import sql from "../utils/sql";
import { hash, verify } from "argon2";

// Create new user (signup)
export async function POST(request) {
  try {
    const {
      email,
      username,
      full_name,
      password,
      plan = "free",
    } = await request.json();

    // Validate required fields
    if (!email || !username || !full_name || !password) {
      return Response.json(
        {
          error:
            "Missing required fields: email, username, full_name, password",
        },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate username format (alphanumeric, hyphens, underscores only)
    const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
    if (!usernameRegex.test(username)) {
      return Response.json(
        {
          error:
            "Username must be 3-30 characters and contain only letters, numbers, hyphens, and underscores",
        },
        { status: 400 },
      );
    }

    // Validate plan
    const validPlans = ["free", "pro", "premium"];
    if (!validPlans.includes(plan)) {
      return Response.json(
        { error: "Invalid plan. Must be: free, pro, or premium" },
        { status: 400 },
      );
    }

    // Check if email or username already exists
    const existingUser = await sql`
      SELECT id FROM users 
      WHERE email = ${email} OR username = ${username}
    `;

    if (existingUser.length > 0) {
      return Response.json(
        { error: "Email or username already exists" },
        { status: 409 },
      );
    }

    // Hash password
    const password_hash = await hash(password);

    // Create user
    const users = await sql`
      INSERT INTO users (email, username, full_name, password_hash, plan)
      VALUES (${email}, ${username}, ${full_name}, ${password_hash}, ${plan})
      RETURNING id, email, username, full_name, plan, created_at
    `;

    const user = users[0];

    // Create default portfolio
    const portfolios = await sql`
      INSERT INTO portfolios (user_id, title, subtitle, subdomain, is_published)
      VALUES (
        ${user.id}, 
        ${full_name + "'s Portfolio"}, 
        ${"Welcome to my creative space"}, 
        ${username}, 
        false
      )
      RETURNING id, title, subtitle, subdomain
    `;

    const portfolio = portfolios[0];

    // Create default portfolio sections
    const defaultSections = [
      {
        section_type: "hero",
        title: `Hi, I'm ${full_name}`,
        content:
          "Welcome to my portfolio! I create amazing content and would love to share my work with you.",
        sort_order: 1,
      },
      {
        section_type: "about",
        title: "About Me",
        content:
          "Tell your audience about yourself, your journey, and what makes you unique.",
        sort_order: 2,
      },
      {
        section_type: "gallery",
        title: "My Work",
        content: "Showcase your best projects and creative work here.",
        sort_order: 3,
      },
      {
        section_type: "contact",
        title: "Get In Touch",
        content: "Ready to work together? I would love to hear from you.",
        sort_order: 4,
      },
    ];

    for (const section of defaultSections) {
      await sql`
        INSERT INTO portfolio_sections (portfolio_id, section_type, title, content, sort_order)
        VALUES (${portfolio.id}, ${section.section_type}, ${section.title}, ${section.content}, ${section.sort_order})
      `;
    }

    return Response.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          full_name: user.full_name,
          plan: user.plan,
          created_at: user.created_at,
        },
        portfolio: {
          id: portfolio.id,
          title: portfolio.title,
          subtitle: portfolio.subtitle,
          subdomain: portfolio.subdomain,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// Get all users (admin only - could be used for showcase)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 50;
    const offset = parseInt(searchParams.get("offset")) || 0;
    const plan = searchParams.get("plan");

    let query = sql`
      SELECT 
        id, email, username, full_name, plan, profile_image, bio, 
        created_at, updated_at
      FROM users 
    `;

    // Add plan filter if specified
    if (plan && ["free", "pro", "premium"].includes(plan)) {
      query = sql`
        SELECT 
          id, email, username, full_name, plan, profile_image, bio, 
          created_at, updated_at
        FROM users 
        WHERE plan = ${plan}
      `;
    }

    const users = await sql`
      ${query}
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;

    return Response.json({
      success: true,
      users,
      pagination: {
        limit,
        offset,
        total: users.length,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
