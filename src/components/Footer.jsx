import {
  Sparkles,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Templates", href: "/templates" },
        { name: "Pricing", href: "#pricing" },
        { name: "Showcase", href: "#showcase" },
        { name: "What's New", href: "/changelog" },
      ],
    },
    {
      title: "Creators",
      links: [
        { name: "Getting Started", href: "/docs/getting-started" },
        { name: "Help Center", href: "/help" },
        { name: "Community", href: "/community" },
        { name: "Success Stories", href: "/stories" },
        { name: "Creator Resources", href: "/resources" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Press Kit", href: "/press" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "GDPR", href: "/gdpr" },
        { name: "Security", href: "/security" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/elysien", label: "Twitter" },
    {
      icon: Instagram,
      href: "https://instagram.com/elysien",
      label: "Instagram",
    },
    { icon: Youtube, href: "https://youtube.com/elysien", label: "YouTube" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/elysien",
      label: "LinkedIn",
    },
  ];

  return (
    <footer
      className="bg-gray-900 text-white"
      style={{
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Creator Tips
            </h3>
            <p className="text-purple-100 text-lg mb-8">
              Get weekly insights, template releases, and growth strategies
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
              <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)",
                }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3
                className="text-2xl font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ELYSIEN
              </h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering creators worldwide to build stunning portfolios, grow
              their audience, and monetize their passion. Join the creator
              economy revolution.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 flex items-center justify-center transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 ELYSIEN. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <a
                  href="/status"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  System Status
                </a>
                <span className="text-gray-600">•</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">
                    All systems operational
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <a
                href="/affiliate"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Affiliate Program
              </a>
              <a
                href="/api"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                API
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <a
                  href="mailto:hello@elysien.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  hello@elysien.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
