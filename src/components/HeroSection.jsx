import {
  ArrowRight,
  Play,
  Stars,
  Zap,
  Globe,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="pt-32 pb-20 px-6 relative overflow-hidden"
      style={{
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        background:
          "linear-gradient(135deg, #0A0B1E 0%, #1E1B4B 50%, #312E81 100%)",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #6366F1 0%, transparent 70%)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Stars className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90 text-sm font-medium">
              Trusted by 10,000+ creators worldwide
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="text-white font-bold leading-tight mb-6"
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              letterSpacing: "-0.02em",
            }}
          >
            Build Your Creator Empire
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              All in One Platform
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            Create stunning portfolio websites, sell digital products, track
            analytics, and connect your social media - all without coding. Join
            thousands of creators who've built their dream websites with
            ELYSIEN.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="/signup"
              className="px-8 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg, #A855F7 0%, #6366F1 100%)",
                boxShadow: "0 10px 30px rgba(168, 85, 247, 0.4)",
              }}
            >
              Start Building Free
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/templates"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-semibold text-lg transition-all duration-300 hover:bg-white/10 flex items-center gap-3"
            >
              <Play className="w-5 h-5" />
              Browse Templates
            </a>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-white/80">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">Custom Domains</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/80">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">Social Analytics</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/80">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">Zero Commission</span>
            </div>
          </div>
        </div>

        {/* Hero mockup */}
        <div className="relative">
          <div
            className="max-w-5xl mx-auto transform hover:scale-[1.02] transition-transform duration-500"
            style={{
              filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
            }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
              <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Your Portfolio Preview
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    This is where your beautiful creator portfolio will live.
                    Showcase your work, sell products, and connect with your
                    audience.
                  </p>
                  <div className="flex justify-center gap-4 mt-8">
                    <div className="w-20 h-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full" />
                    <div className="w-16 h-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full" />
                    <div className="w-24 h-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}
