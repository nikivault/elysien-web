import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Templates", href: "/templates" },
    { name: "Pricing", href: "#pricing" },
    { name: "Showcase", href: "#showcase" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0A0B1E]/90 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? "shadow-[0_8px_32px_rgba(99,102,241,0.15)] border-b border-[#6366F1]/20"
          : ""
      }`}
      style={{
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)",
                boxShadow: "0 8px 20px rgba(99, 102, 241, 0.3)",
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1
              className="text-2xl font-bold"
              style={{
                background: "linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ELYSIEN
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-700 dark:text-slate-300 hover:text-[#6366F1] dark:hover:text-[#6366F1] transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/signin"
              className="text-slate-700 dark:text-slate-300 hover:text-[#6366F1] dark:hover:text-[#6366F1] transition-colors duration-200 font-medium"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="px-6 py-2.5 rounded-full text-white font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
              }}
            >
              Get Started Free
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-700 dark:text-slate-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-700 dark:text-slate-300 hover:text-[#6366F1] dark:hover:text-[#6366F1] transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <a
                  href="/signin"
                  className="text-slate-700 dark:text-slate-300 hover:text-[#6366F1] dark:hover:text-[#6366F1] transition-colors duration-200 font-medium"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="px-6 py-3 rounded-full text-white font-semibold text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)",
                  }}
                >
                  Get Started Free
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
