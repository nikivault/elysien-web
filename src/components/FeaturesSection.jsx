import {
  Palette,
  BarChart3,
  ShoppingBag,
  Globe,
  Smartphone,
  Zap,
  Users,
  Crown,
  Star,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Palette,
      title: "Professional Templates",
      description:
        "Choose from 50+ designer templates built specifically for creators. Customize colors, fonts, and layouts to match your brand.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Social Media Analytics",
      description:
        "Connect Instagram, YouTube, TikTok and get real-time analytics. Track followers, engagement, and top-performing content.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: ShoppingBag,
      title: "Digital Store",
      description:
        "Sell digital products, courses, presets, and services. Accept payments worldwide with our secure checkout system.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Custom Domain",
      description:
        "Connect your own domain and remove ELYSIEN branding. Look professional with your personalized web address.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description:
        "Your portfolio looks perfect on every device. Responsive design ensures your work shines on desktop, tablet, and mobile.",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Built for speed and SEO. Your portfolio loads instantly and ranks well on Google, driving more traffic to your work.",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      features: [
        "Basic portfolio website",
        "ELYSIEN subdomain",
        "5 template designs",
        "Weekly analytics updates",
        "1 digital product",
        "Basic SEO",
      ],
      icon: Star,
      popular: false,
    },
    {
      name: "Pro",
      price: "₹399",
      period: "per month",
      features: [
        "Everything in Free",
        "Custom domain connection",
        "50+ premium templates",
        "Daily analytics updates",
        "Unlimited digital products",
        "Advanced SEO tools",
        "Email support",
        "Remove ELYSIEN branding",
      ],
      icon: Users,
      popular: true,
    },
    {
      name: "Premium",
      price: "₹999",
      period: "per month",
      features: [
        "Everything in Pro",
        "AI website builder",
        "AI bio generator",
        "Live analytics dashboard",
        "Team collaboration",
        "Priority support",
        "Advanced integrations",
        "White-label solution",
      ],
      icon: Crown,
      popular: false,
    },
  ];

  return (
    <section
      id="features"
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
            Everything You Need to
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Build Your Brand
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From portfolio websites to analytics dashboards, we provide all the
            tools content creators need to showcase their work and grow their
            audience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-900/50 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Plan Comparison */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Start free and upgrade as you grow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-900/50 rounded-3xl p-8 border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                plan.popular
                  ? "border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800"
                  : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.popular ? "from-purple-500 to-blue-500" : "from-gray-400 to-gray-600"} flex items-center justify-center mb-6`}
              >
                <plan.icon className="w-6 h-6 text-white" />
              </div>

              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h4>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={
                  plan.name === "Free"
                    ? "/signup"
                    : "/signup?plan=" + plan.name.toLowerCase()
                }
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg"
                    : "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {plan.name === "Free" ? "Start Free" : "Get Started"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
