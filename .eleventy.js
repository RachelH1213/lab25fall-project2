module.exports = function(eleventyConfig) {
  // 1) 复制静态资源
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
   eleventyConfig.addPassthroughCopy("styles");
  // 2) posts 集合（按日期倒序）
  eleventyConfig.addCollection("posts", (api) => {
    return api.getFilteredByGlob("posts/*.md").sort((a, b) => b.date - a.date);
  });

  // 3) 简易日期过滤器：{{ someDate | date('yyyy-LL-dd') }} -> 2025-10-05
  eleventyConfig.addFilter("date", (value, format = "yyyy-LL-dd") => {
    if (!value) return "";
    const d = new Date(value);
    const pad = (n) => String(n).padStart(2, "0");
    if (format === "yyyy-LL-dd") {
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    }
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: { input: ".", includes: "_includes", output: "_site" }
  };
};