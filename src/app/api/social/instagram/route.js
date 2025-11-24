import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const { userId, accessToken, username } = await request.json();

    if (!userId || !accessToken || !username) {
      return Response.json(
        { error: "Missing required fields: userId, accessToken, username" },
        { status: 400 },
      );
    }

    // Simulate Instagram API call to get user data
    // In production, you'd use the actual Instagram Basic Display API
    const mockInstagramData = {
      id: "instagram_" + Date.now(),
      username: username,
      followers_count: Math.floor(Math.random() * 10000) + 1000,
      posts_count: Math.floor(Math.random() * 500) + 50,
      engagement_rate: (Math.random() * 10 + 2).toFixed(2),
    };

    // Check if social account already exists
    const existingAccount = await sql`
      SELECT id FROM social_accounts 
      WHERE user_id = ${userId} AND platform = 'instagram'
    `;

    let accountId;

    if (existingAccount.length > 0) {
      // Update existing account
      accountId = existingAccount[0].id;
      await sql`
        UPDATE social_accounts SET
          username = ${mockInstagramData.username},
          access_token = ${accessToken},
          followers_count = ${mockInstagramData.followers_count},
          posts_count = ${mockInstagramData.posts_count},
          engagement_rate = ${mockInstagramData.engagement_rate},
          last_synced_at = NOW(),
          is_active = true,
          updated_at = NOW()
        WHERE id = ${accountId}
      `;
    } else {
      // Create new social account
      const newAccount = await sql`
        INSERT INTO social_accounts (
          user_id, platform, username, access_token,
          followers_count, posts_count, engagement_rate,
          last_synced_at, is_active
        ) VALUES (
          ${userId}, 'instagram', ${mockInstagramData.username}, ${accessToken},
          ${mockInstagramData.followers_count}, ${mockInstagramData.posts_count}, ${mockInstagramData.engagement_rate},
          NOW(), true
        ) RETURNING id
      `;
      accountId = newAccount[0].id;
    }

    // Create analytics entry for today
    const today = new Date().toISOString().split("T")[0];

    await sql`
      INSERT INTO social_analytics (
        social_account_id, date, followers_count, posts_count,
        likes_count, comments_count, engagement_rate, reach, impressions
      ) VALUES (
        ${accountId}, ${today}, ${mockInstagramData.followers_count}, ${mockInstagramData.posts_count},
        ${Math.floor(Math.random() * 5000) + 1000}, ${Math.floor(Math.random() * 500) + 50},
        ${mockInstagramData.engagement_rate}, ${Math.floor(Math.random() * 50000) + 5000}, ${Math.floor(Math.random() * 100000) + 10000}
      )
      ON CONFLICT (social_account_id, date) 
      DO UPDATE SET
        followers_count = EXCLUDED.followers_count,
        posts_count = EXCLUDED.posts_count,
        engagement_rate = EXCLUDED.engagement_rate,
        reach = EXCLUDED.reach,
        impressions = EXCLUDED.impressions
    `;

    return Response.json({
      success: true,
      account: {
        id: accountId,
        platform: "instagram",
        username: mockInstagramData.username,
        followers_count: mockInstagramData.followers_count,
        posts_count: mockInstagramData.posts_count,
        engagement_rate: mockInstagramData.engagement_rate,
        connected: true,
      },
    });
  } catch (error) {
    console.error("Instagram connection error:", error);
    return Response.json(
      { error: "Failed to connect Instagram account" },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return Response.json(
        { error: "Missing userId parameter" },
        { status: 400 },
      );
    }

    const accounts = await sql`
      SELECT 
        id, platform, username, followers_count, posts_count,
        engagement_rate, last_synced_at, is_active
      FROM social_accounts 
      WHERE user_id = ${userId} AND platform = 'instagram' AND is_active = true
    `;

    if (accounts.length === 0) {
      return Response.json({
        success: true,
        account: null,
        connected: false,
      });
    }

    return Response.json({
      success: true,
      account: accounts[0],
      connected: true,
    });
  } catch (error) {
    console.error("Error fetching Instagram account:", error);
    return Response.json(
      { error: "Failed to fetch Instagram account" },
      { status: 500 },
    );
  }
}

// Get Instagram analytics
export async function PUT(request) {
  try {
    const { accountId, days = 30 } = await request.json();

    if (!accountId) {
      return Response.json({ error: "Missing accountId" }, { status: 400 });
    }

    const analytics = await sql`
      SELECT 
        date, followers_count, posts_count, likes_count,
        comments_count, engagement_rate, reach, impressions
      FROM social_analytics 
      WHERE social_account_id = ${accountId}
        AND date >= (CURRENT_DATE - INTERVAL '${days} days')
      ORDER BY date DESC
    `;

    // Calculate growth metrics
    const latest = analytics[0] || {};
    const previous = analytics[1] || {};

    const growth = {
      followers:
        latest.followers_count && previous.followers_count
          ? (
              ((latest.followers_count - previous.followers_count) /
                previous.followers_count) *
              100
            ).toFixed(1)
          : "0",
      engagement:
        latest.engagement_rate && previous.engagement_rate
          ? (latest.engagement_rate - previous.engagement_rate).toFixed(1)
          : "0",
    };

    return Response.json({
      success: true,
      analytics,
      growth,
      summary: {
        total_followers: latest.followers_count || 0,
        total_posts: latest.posts_count || 0,
        avg_engagement:
          analytics.length > 0
            ? (
                analytics.reduce(
                  (sum, item) => sum + parseFloat(item.engagement_rate || 0),
                  0,
                ) / analytics.length
              ).toFixed(2)
            : "0",
        total_reach: analytics.reduce(
          (sum, item) => sum + (item.reach || 0),
          0,
        ),
      },
    });
  } catch (error) {
    console.error("Error fetching Instagram analytics:", error);
    return Response.json(
      { error: "Failed to fetch Instagram analytics" },
      { status: 500 },
    );
  }
}
