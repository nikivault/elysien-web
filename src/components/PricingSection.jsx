import { Check, Star, Users, Crown, ArrowRight } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Basic portfolio website",
        "ELYSIEN subdomain (username.elysien.com)",
        "5 template designs",
        "Weekly analytics updates",
        "1 digital product listing",
        "Basic SEO optimization",
        "Community support",
        "ELYSIEN branding",
      ],
      icon: Star,
      popular: false,
      color: "gray",
    },
    {
      name: "Pro",
      price: "₹399",
      period: "per month",
      description: "For serious creators",
      features: [
        "Everything in Free",
        "Custom domain connection",
        "50+ premium templates",
        "Daily analytics updates",
        "Unlimited digital products",
        "Advanced SEO tools",
        "Email support",
        "Remove ELYSIEN branding",
        "Social media integrations",
        "Contact forms & leads",
      ],
      icon: Users,
      popular: true,
      color: "purple",
    },
    {
      name: "Premium",
      price: "₹999",
      period: "per month",
      description: "For agencies & teams",
      features: [
        "Everything in Pro",
        "AI website builder",
        "AI bio generator & content",
        "Live analytics dashboard",
        "Team collaboration (5 members)",
        "Priority support",
        "Advanced integrations",
        "White-label solution",
        "Custom CSS/HTML",
        "Advanced store features",
      ],
      icon: Crown,
      popular: false,
      color: "gold",
    },
  ];

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.",
    },
    {
      question: "Do you take a commission on sales?",
      answer:
        "Free plan has a 5% commission on sales. Pro plan has 0-2% commission. Premium plan has 0% commission on all sales.",
    },
    {
      question: "Can I use my own domain?",
      answer:
        "Custom domains are available on Pro and Premium plans. We'll help you connect your domain with easy step-by-step instructions.",
    },
    {
      question: "What social platforms can I connect?",
      answer:
        "You can connect Instagram, YouTube, TikTok, Twitter, LinkedIn, and more. Analytics sync automatically based on your plan.",
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 px-6 bg-gray-50 dark:bg-[#0F1120]"
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Start free and grow with us. No hidden fees, no surprises. Cancel
            anytime.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full p-1 border border-gray-200 dark:border-gray-700">
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium">
              Monthly
            </button>
            <button className="px-6 py-2 rounded-full text-gray-600 dark:text-gray-400 font-medium">
              Annual (Save 20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-900 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular
                  ? "border-2 border-purple-500 ring-4 ring-purple-100 dark:ring-purple-900/30 scale-105"
                  : "border border-gray-200 dark:border-gray-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    plan.color === "purple"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500"
                      : plan.color === "gold"
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                        : "bg-gradient-to-r from-gray-400 to-gray-600"
                  }`}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>

                <div className="mb-2">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={
                  plan.name === "Free"
                    ? "/signup"
                    : `/signup?plan=${plan.name.toLowerCase()}`
                }
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg transform hover:scale-105"
                    : "border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {plan.name === "Free" ? "Start Free" : "Get Started"}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Still have questions?
            </p>
            <a
              href="/contact"
              className="text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300"
            >
              Contact our support team →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
