import { ArrowRight, Sparkles, Zap, BarChart3 } from "lucide-react";

export default function CTASection() {
  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0A0B1E 0%, #1E1B4B 50%, #312E81 100%)",
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-10 left-20 w-64 h-64 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #A855F7 0%, transparent 70%)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-10 right-20 w-80 h-80 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
            animation: "pulse 6s ease-in-out infinite reverse",
          }}
        />

        {/* Floating Icons */}
        <div
          className="absolute top-1/4 left-1/4 text-white/20"
          style={{ animation: "float 8s ease-in-out infinite" }}
        >
          <Sparkles className="w-8 h-8" />
        </div>
        <div
          className="absolute top-1/3 right-1/3 text-white/20"
          style={{ animation: "float 6s ease-in-out infinite reverse" }}
        >
          <Zap className="w-6 h-6" />
        </div>
        <div
          className="absolute bottom-1/3 left-1/3 text-white/20"
          style={{ animation: "float 10s ease-in-out infinite" }}
        >
          <BarChart3 className="w-7 h-7" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Headline */}
        <h2
          className="text-white font-bold leading-tight mb-6"
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            letterSpacing: "-0.02em",
          }}
        >
          Ready to Build Your
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Creator Empire?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Join thousands of creators who are building stunning portfolios,
          connecting with their audience, and monetizing their passion. Start
          your journey today — it's completely free.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center gap-3 text-white/80">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="font-medium">No coding required</span>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="font-medium">Setup in 5 minutes</span>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="font-medium">Free forever plan</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="/signup"
            className="group px-10 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #A855F7 0%, #6366F1 100%)",
              boxShadow: "0 15px 35px rgba(168, 85, 247, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(168, 85, 247, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(168, 85, 247, 0.4)";
            }}
          >
            <span className="relative z-10">Start Building Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>

          <a
            href="/templates"
            className="px-10 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/50"
          >
            View Templates
          </a>
        </div>

        {/* Trust indicators */}
        <div className="text-center">
          <p className="text-white/60 text-sm mb-4">
            Trusted by 10,000+ creators worldwide
          </p>
          <div className="flex justify-center items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">
                ★
              </span>
            ))}
            <span className="text-white/80 ml-2 text-sm">
              4.9/5 from 2,500+ reviews
            </span>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(5px) rotate(-5deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}
