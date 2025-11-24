"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Eye,
  Settings,
  Palette,
  Type,
  Layout,
  Image,
  Plus,
  Trash2,
  ArrowLeft,
  Check,
  Instagram,
  Youtube,
  Twitter,
  Globe,
  Camera,
} from "lucide-react";

export default function PortfolioBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeSection, setActiveSection] = useState("design");
  const [portfolioData, setPortfolioData] = useState({
    title: "My Portfolio",
    subtitle: "Content Creator",
    bio: "Passionate content creator sharing my journey and inspiring others.",
    colors: {
      primary: "#6366F1",
      accent: "#EC4899",
      background: "#FFFFFF",
      text: "#1F2937",
    },
    typography: {
      heading: "Inter",
      body: "Inter",
    },
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Hero Section",
        enabled: true,
        data: {
          title: "Hey, I'm Sarah Chen",
          subtitle: "Content Creator & Photographer",
          description:
            "Creating visual stories that inspire and connect with people around the world.",
          backgroundImage: "/hero-bg.jpg",
          profileImage: "/profile.jpg",
        },
      },
      {
        id: "about",
        type: "about",
        title: "About Me",
        enabled: true,
        data: {
          title: "About Me",
          content:
            "I'm a passionate content creator who loves capturing moments and sharing stories through photography and video. My journey started 3 years ago, and I've worked with brands like Nike, Adobe, and Canon.",
          image: "/about.jpg",
        },
      },
      {
        id: "portfolio",
        type: "portfolio",
        title: "Portfolio",
        enabled: true,
        data: {
          title: "My Work",
          items: [
            {
              id: 1,
              title: "Brand Campaign",
              image: "/work1.jpg",
              category: "Photography",
            },
            {
              id: 2,
              title: "Travel Series",
              image: "/work2.jpg",
              category: "Video",
            },
            {
              id: 3,
              title: "Product Shoot",
              image: "/work3.jpg",
              category: "Photography",
            },
          ],
        },
      },
      {
        id: "contact",
        type: "contact",
        title: "Contact",
        enabled: true,
        data: {
          title: "Let's Work Together",
          email: "hello@sarahchen.com",
          phone: "+1 (555) 123-4567",
          socialLinks: {
            instagram: "@sarahchen",
            youtube: "SarahChenCreates",
            twitter: "@sarahchen",
          },
        },
      },
    ],
    socialAccounts: {
      instagram: { username: "@sarahchen", connected: false },
      youtube: { username: "SarahChenCreates", connected: false },
      tiktok: { username: "@sarahchen", connected: false },
    },
  });

  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Get selected template from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get("template");

    if (templateId) {
      fetchTemplate(templateId);
    } else {
      const savedTemplate = localStorage.getItem("selectedTemplate");
      if (savedTemplate) {
        const template = JSON.parse(savedTemplate);
        setSelectedTemplate(template);
      }
    }
  }, []);

  const fetchTemplate = async (templateId) => {
    try {
      const response = await fetch(`/api/templates/${templateId}`);
      if (response.ok) {
        const template = await response.json();
        setSelectedTemplate(template);

        // Apply template settings to portfolio data
        if (template.template_data) {
          const templateData = JSON.parse(template.template_data);
          setPortfolioData((prev) => ({
            ...prev,
            colors: templateData.colors || prev.colors,
            typography: templateData.typography || prev.typography,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching template:", error);
    }
  };

  const handleSavePortfolio = async () => {
    setSaving(true);
    try {
      // Get user ID - in production this would come from auth context
      const userId = "demo-user-123"; // For demo purposes

      const response = await fetch("/api/portfolios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          templateId: selectedTemplate?.id,
          portfolioData,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Portfolio saved successfully!");
        console.log("Saved portfolio:", result);
      } else {
        throw new Error("Failed to save portfolio");
      }
    } catch (error) {
      console.error("Error saving portfolio:", error);
      alert("Failed to save portfolio. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublishPortfolio = async () => {
    try {
      // Get user ID - in production this would come from auth context
      const userId = "demo-user-123"; // For demo purposes

      const response = await fetch("/api/portfolios/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          portfolioData,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Portfolio published! Your site is live at: ${result.url}`);

        // Open the published site in a new tab
        window.open(result.url, "_blank");
      } else {
        throw new Error("Failed to publish portfolio");
      }
    } catch (error) {
      console.error("Error publishing portfolio:", error);
      alert("Failed to publish portfolio. Please try again.");
    }
  };

  const updatePortfolioData = (key, value) => {
    setPortfolioData((prev) => ({ ...prev, [key]: value }));
  };

  const updateSectionData = (sectionId, newData) => {
    setPortfolioData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? { ...section, data: { ...section.data, ...newData } }
          : section,
      ),
    }));
  };

  const connectSocialAccount = async (platform) => {
    try {
      // This would typically open OAuth flow
      // For demo, we'll simulate connection
      setPortfolioData((prev) => ({
        ...prev,
        socialAccounts: {
          ...prev.socialAccounts,
          [platform]: {
            ...prev.socialAccounts[platform],
            connected: true,
          },
        },
      }));
      alert(`${platform} account connected successfully!`);
    } catch (error) {
      console.error(`Error connecting ${platform}:`, error);
    }
  };

  const DesignPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Colors
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={portfolioData.colors.primary}
                onChange={(e) =>
                  updatePortfolioData("colors", {
                    ...portfolioData.colors,
                    primary: e.target.value,
                  })
                }
                className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={portfolioData.colors.primary}
                onChange={(e) =>
                  updatePortfolioData("colors", {
                    ...portfolioData.colors,
                    primary: e.target.value,
                  })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Accent Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={portfolioData.colors.accent}
                onChange={(e) =>
                  updatePortfolioData("colors", {
                    ...portfolioData.colors,
                    accent: e.target.value,
                  })
                }
                className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={portfolioData.colors.accent}
                onChange={(e) =>
                  updatePortfolioData("colors", {
                    ...portfolioData.colors,
                    accent: e.target.value,
                  })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Typography
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Heading Font
            </label>
            <select
              value={portfolioData.typography.heading}
              onChange={(e) =>
                updatePortfolioData("typography", {
                  ...portfolioData.typography,
                  heading: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="Inter">Inter</option>
              <option value="Poppins">Poppins</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Dancing Script">Dancing Script</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Body Font
            </label>
            <select
              value={portfolioData.typography.body}
              onChange={(e) =>
                updatePortfolioData("typography", {
                  ...portfolioData.typography,
                  body: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="Inter">Inter</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Lato">Lato</option>
              <option value="Roboto">Roboto</option>
              <option value="Source Sans Pro">Source Sans Pro</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const ContentPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Basic Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Portfolio Title
            </label>
            <input
              type="text"
              value={portfolioData.title}
              onChange={(e) => updatePortfolioData("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={portfolioData.subtitle}
              onChange={(e) => updatePortfolioData("subtitle", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              rows={4}
              value={portfolioData.bio}
              onChange={(e) => updatePortfolioData("bio", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Sections
        </h3>
        <div className="space-y-3">
          {portfolioData.sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  {section.type === "hero" && (
                    <Camera className="w-4 h-4 text-purple-600" />
                  )}
                  {section.type === "about" && (
                    <Type className="w-4 h-4 text-purple-600" />
                  )}
                  {section.type === "portfolio" && (
                    <Layout className="w-4 h-4 text-purple-600" />
                  )}
                  {section.type === "contact" && (
                    <Globe className="w-4 h-4 text-purple-600" />
                  )}
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {section.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={section.enabled}
                    onChange={(e) => {
                      const updatedSections = portfolioData.sections.map((s) =>
                        s.id === section.id
                          ? { ...s, enabled: e.target.checked }
                          : s,
                      );
                      updatePortfolioData("sections", updatedSections);
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-11 h-6 rounded-full transition-colors ${section.enabled ? "bg-purple-600" : "bg-gray-300"}`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${section.enabled ? "translate-x-5" : "translate-x-0"} mt-0.5 ml-0.5`}
                    ></div>
                  </div>
                </label>

                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SocialPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Connect Social Accounts
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Connect your social media accounts to automatically sync analytics and
          showcase your latest content.
        </p>

        <div className="space-y-4">
          {Object.entries(portfolioData.socialAccounts).map(
            ([platform, account]) => (
              <div
                key={platform}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    {platform === "instagram" && (
                      <Instagram className="w-5 h-5 text-white" />
                    )}
                    {platform === "youtube" && (
                      <Youtube className="w-5 h-5 text-white" />
                    )}
                    {platform === "tiktok" && (
                      <Type className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white capitalize">
                      {platform}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {account.connected ? account.username : "Not connected"}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => connectSocialAccount(platform)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    account.connected
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-purple-500 text-white hover:bg-purple-600"
                  }`}
                >
                  {account.connected ? (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Connected
                    </div>
                  ) : (
                    "Connect"
                  )}
                </button>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );

  if (previewMode) {
    return (
      <div className="min-h-screen bg-white">
        {/* Preview Mode */}
        <div className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setPreviewMode(false)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Editor
            </button>

            <div className="text-white text-sm">
              Preview Mode - This is how your portfolio will look to visitors
            </div>

            <button
              onClick={handlePublishPortfolio}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Publish Portfolio
            </button>
          </div>
        </div>

        {/* Portfolio Preview */}
        <div className="pt-20">
          <div
            style={{
              color: portfolioData.colors.primary,
              fontFamily: portfolioData.typography.heading,
            }}
          >
            {/* Render portfolio sections based on data */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
              <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">
                  {portfolioData.sections[0]?.data?.title || "Your Portfolio"}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  {portfolioData.sections[0]?.data?.subtitle ||
                    "Content Creator"}
                </p>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  {portfolioData.sections[0]?.data?.description ||
                    portfolioData.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0B1E]">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Portfolio Builder
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedTemplate
                    ? `Using ${selectedTemplate.name} template`
                    : "Custom portfolio"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreviewMode(true)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>

              <button
                onClick={handleSavePortfolio}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto">
          <div className="p-6">
            {/* Tabs */}
            <div className="flex mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {[
                { id: "design", name: "Design", icon: Palette },
                { id: "content", name: "Content", icon: Type },
                { id: "social", name: "Social", icon: Instagram },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === tab.id
                      ? "bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Panel Content */}
            {activeSection === "design" && <DesignPanel />}
            {activeSection === "content" && <ContentPanel />}
            {activeSection === "social" && <SocialPanel />}
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 p-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-8 min-h-96">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Layout className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Portfolio Editor
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Use the sidebar to customize your portfolio design, content, and
                social connections. Click Preview to see how your portfolio will
                look to visitors.
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="text-left p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Design
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Customize colors, fonts, and visual styling to match your
                    brand
                  </p>
                </div>

                <div className="text-left p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Content
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Add your personal information, bio, and manage portfolio
                    sections
                  </p>
                </div>

                <div className="text-left p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Social
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Connect Instagram, YouTube, and TikTok for automatic
                    analytics
                  </p>
                </div>

                <div className="text-left p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Publish
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Get your custom subdomain and publish your portfolio live
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
