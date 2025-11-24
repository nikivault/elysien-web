import { useState, useEffect } from "react";
import {
  BarChart3,
  Eye,
  Users,
  TrendingUp,
  Globe,
  Settings,
  Plus,
  Edit3,
  ExternalLink,
  Calendar,
  DollarSign,
} from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd get this from authentication context
    // For now, let's use mock data
    setUser({
      id: "123",
      full_name: "Sarah Chen",
      email: "sarah@example.com",
      username: "sarahchen",
      plan: "pro",
      profile_image:
        "https://images.unsplash.com/photo-1494790108755-2616c6da2b3c?w=150",
    });

    setPortfolio({
      id: "456",
      title: "Sarah Chen's Portfolio",
      subtitle: "Portrait & Lifestyle Photography",
      subdomain: "sarahchen",
      is_published: true,
      template_id: "photographer-pro",
    });

    setAnalytics({
      totalViews: 12547,
      uniqueVisitors: 8932,
      bounceRate: 32.5,
      avgSessionDuration: 145,
    });

    setRecentActivities([
      {
        id: 1,
        type: "view",
        description: "Portfolio viewed 23 times",
        time: "2 hours ago",
      },
      {
        id: 2,
        type: "edit",
        description: "Updated gallery section",
        time: "5 hours ago",
      },
      {
        id: 3,
        type: "social",
        description: "Instagram analytics synced",
        time: "1 day ago",
      },
      {
        id: 4,
        type: "sale",
        description: "Photo preset pack sold",
        time: "2 days ago",
      },
    ]);

    setLoading(false);
  }, []);

  const stats = [
    {
      name: "Portfolio Views",
      value: analytics.totalViews.toLocaleString(),
      change: "+12%",
      changeType: "increase",
      icon: Eye,
    },
    {
      name: "Unique Visitors",
      value: analytics.uniqueVisitors.toLocaleString(),
      change: "+8%",
      changeType: "increase",
      icon: Users,
    },
    {
      name: "Bounce Rate",
      value: `${analytics.bounceRate}%`,
      change: "-5%",
      changeType: "decrease",
      icon: TrendingUp,
    },
    {
      name: "Avg. Session",
      value: `${Math.floor(analytics.avgSessionDuration / 60)}m ${analytics.avgSessionDuration % 60}s`,
      change: "+3%",
      changeType: "increase",
      icon: Calendar,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0A0B1E] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-[#0A0B1E]"
      style={{
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={user?.profile_image}
                alt={user?.full_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user?.full_name?.split(" ")[0]}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {user?.plan === "pro"
                    ? "🚀 Pro Plan"
                    : user?.plan === "premium"
                      ? "👑 Premium Plan"
                      : "⭐ Free Plan"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`https://${portfolio?.subdomain}.elysien.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Site
              </a>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors"
                onClick={() =>
                  (window.location.href = "/dashboard/portfolio/builder")
                }
              >
                <Edit3 className="w-4 h-4" />
                Edit Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  vs last month
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Portfolio Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Overview */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Portfolio Overview
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {portfolio?.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {portfolio?.subtitle}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600">
                          Published
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {portfolio?.subdomain}.elysien.com
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    icon: Plus,
                    label: "Add Content",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: BarChart3,
                    label: "View Analytics",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: DollarSign,
                    label: "Manage Store",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: Settings,
                    label: "Settings",
                    color: "from-orange-500 to-red-500",
                  },
                ].map((action, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                    >
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
              View All Activity
            </button>
          </div>
        </div>

        {/* Plan Status */}
        {user?.plan === "free" && (
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Unlock More Features with Pro
                </h3>
                <p className="text-purple-100 mb-4">
                  Get custom domain, unlimited products, advanced analytics, and
                  more.
                </p>
                <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Upgrade to Pro - ₹399/month
                </button>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-2xl mb-2">🚀</div>
                <p className="text-purple-200 text-sm">
                  Join 5,000+ Pro creators
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
