import {
  ExternalLink,
  Instagram,
  Youtube,
  Camera,
  Music,
  Palette,
} from "lucide-react";

export default function CreatorShowcase() {
  const creators = [
    {
      name: "Sarah Chen",
      type: "Photographer",
      followers: "125K",
      description: "Portrait & lifestyle photography",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c6da2b3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      portfolio:
        "https://images.unsplash.com/photo-1452721226168-f75c2d6314ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      icon: Camera,
      color: "from-pink-500 to-rose-500",
      stats: {
        posts: "1.2K",
        engagement: "8.5%",
        growth: "+15%",
      },
    },
    {
      name: "Alex Rodriguez",
      type: "Content Creator",
      followers: "89K",
      description: "Tech reviews & tutorials",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      portfolio:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      icon: Youtube,
      color: "from-blue-500 to-cyan-500",
      stats: {
        posts: "892",
        engagement: "12.3%",
        growth: "+22%",
      },
    },
    {
      name: "Maya Patel",
      type: "Digital Artist",
      followers: "156K",
      description: "Illustration & character design",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      portfolio:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      icon: Palette,
      color: "from-purple-500 to-indigo-500",
      stats: {
        posts: "2.1K",
        engagement: "15.7%",
        growth: "+31%",
      },
    },
    {
      name: "David Kim",
      type: "Music Producer",
      followers: "67K",
      description: "Electronic music & beats",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      portfolio:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      icon: Music,
      color: "from-green-500 to-emerald-500",
      stats: {
        posts: "645",
        engagement: "9.8%",
        growth: "+18%",
      },
    },
  ];

  return (
    <section
      id="showcase"
      className="py-20 px-6 bg-white dark:bg-[#0A0B1E]"
      style={{
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            style={{ lineHeight: "1.1" }}
          >
            Built by Creators,
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              For Creators
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            See how thousands of creators are using ELYSIEN to build their
            online presence, grow their audience, and monetize their passion.
          </p>
        </div>

        {/* Creator Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {creators.map((creator, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-900/50 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Portfolio Preview */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={creator.portfolio}
                  alt={`${creator.name}'s portfolio`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Creator Info */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {creator.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-r ${creator.color} flex items-center justify-center`}
                      >
                        <creator.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 font-medium">
                        {creator.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {creator.followers}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      followers
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {creator.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {creator.stats.posts}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Posts
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {creator.stats.engagement}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Engagement
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {creator.stats.growth}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Growth
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stats */}
        <div className="grid md:grid-cols-4 gap-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">10,000+</div>
            <div className="text-purple-100">Creators Joined</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">₹2.5M+</div>
            <div className="text-purple-100">Revenue Generated</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">50M+</div>
            <div className="text-purple-100">Portfolio Views</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">99.9%</div>
            <div className="text-purple-100">Uptime</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Join Them?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Start building your creator portfolio today and join thousands of
            creators who are growing their audience and monetizing their
            passion.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #A855F7 0%, #6366F1 100%)",
              boxShadow: "0 10px 30px rgba(168, 85, 247, 0.4)",
            }}
          >
            Get Started Free
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
