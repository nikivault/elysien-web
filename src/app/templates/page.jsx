"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Crown, Check, Star, Grid, List } from "lucide-react";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", name: "All Templates", count: 0 },
    { id: "photography", name: "Photography", count: 0 },
    { id: "content-creator", name: "Content Creator", count: 0 },
    { id: "artist", name: "Digital Artist", count: 0 },
    { id: "music", name: "Music & Audio", count: 0 },
    { id: "fashion", name: "Fashion & Style", count: 0 },
    { id: "food", name: "Food & Lifestyle", count: 0 },
    { id: "tech", name: "Technology", count: 0 },
    { id: "business", name: "Business", count: 0 },
    { id: "travel", name: "Travel & Adventure", count: 0 },
    { id: "fitness", name: "Fitness & Health", count: 0 },
    { id: "beauty", name: "Beauty & Wellness", count: 0 },
    { id: "gaming", name: "Gaming & Esports", count: 0 },
    { id: "education", name: "Education", count: 0 },
    { id: "minimal", name: "Minimalist", count: 0 },
    { id: "creative", name: "Creative & Art", count: 0 },
    { id: "luxury", name: "Luxury & Premium", count: 0 },
    { id: "podcast", name: "Podcast & Audio", count: 0 },
  ];

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch("/api/templates");
      if (!response.ok) throw new Error("Failed to fetch templates");
      const data = await response.json();
      setTemplates(data.templates);
      setFilteredTemplates(data.templates);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching templates:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = templates;

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (template) => template.category === selectedCategory,
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Premium filter
    if (showPremiumOnly) {
      filtered = filtered.filter((template) => template.is_premium);
    }

    setFilteredTemplates(filtered);
  }, [templates, selectedCategory, searchTerm, showPremiumOnly]);

  const handleSelectTemplate = (templateId, templateName) => {
    try {
      // Navigate to portfolio builder
      localStorage.setItem(
        "selectedTemplate",
        JSON.stringify({ id: templateId, name: templateName }),
      );
      window.location.href = `/dashboard/portfolio/builder?template=${templateId}`;
    } catch (error) {
      console.error("Error selecting template:", error);
    }
  };

  const TemplateCard = ({ template }) => (
    <div className="group bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Template Preview */}
      <div className="relative h-64 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />

        {/* Premium Badge */}
        {template.is_premium && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold text-sm">
              <Crown className="w-3 h-3" />
              PRO
            </div>
          </div>
        )}

        {/* Template Preview Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {template.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Portfolio Preview
            </div>
          </div>

          {/* Mock layout based on template data */}
          <div className="space-y-2">
            <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
            <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto"></div>
          </div>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-3">
            <button
              onClick={() => handleSelectTemplate(template.id, template.name)}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200"
            >
              Use Template
            </button>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30 hover:bg-white/30 transition-all duration-200">
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Template Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {template.name}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              4.8
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
          {template.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
            {template.category
              .replace("-", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </span>

          {template.is_premium ? (
            <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-medium">Premium</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Free</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0B1E] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading templates...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0B1E]">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {" "}
                Template
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Select from 50+ professionally designed templates crafted
              specifically for content creators. Customize colors, fonts, and
              layouts to match your brand.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPremiumOnly}
                  onChange={(e) => setShowPremiumOnly(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Premium only
                </span>
              </label>

              <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-purple-500 text-white" : "text-gray-500"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-purple-500 text-white" : "text-gray-500"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Categories */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const count =
                    category.id === "all"
                      ? templates.length
                      : templates.filter((t) => t.category === category.id)
                          .length;

                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between ${
                        selectedCategory === category.id
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                      <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {filteredTemplates.length} template
                {filteredTemplates.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Templates Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
            >
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                  <Filter className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-xl">No templates found</p>
                  <p>Try adjusting your search or filters</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
