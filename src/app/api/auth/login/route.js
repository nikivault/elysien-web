import sql from "../../utils/sql";
import { verify } from "argon2";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Find user by email
    const users = await sql`
      SELECT id, email, username, full_name, password_hash, plan, profile_image, bio
      FROM users 
      WHERE email = ${email}
    `;

    if (users.length === 0) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await verify(user.password_hash, password);
    if (!isValidPassword) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Get user's portfolio
    const portfolios = await sql`
      SELECT id, title, subtitle, subdomain, is_published, template_id
      FROM portfolios 
      WHERE user_id = ${user.id}
      LIMIT 1
    `;

    const portfolio = portfolios[0] || null;

    // Return user data (excluding password hash)
    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      full_name: user.full_name,
      plan: user.plan,
      profile_image: user.profile_image,
      bio: user.bio,
      portfolio: portfolio,
    };

    return Response.json({
      success: true,
      user: userData,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
