import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "about", title: "About" },
    { name: "stats", title: "Stats" },
    { name: "services", title: "Services" },
    { name: "fleet", title: "Fleet" },
    { name: "testimonials", title: "Testimonials" },
    { name: "faq", title: "FAQ" },
    { name: "blog", title: "Blog" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "hero", group: "hero" }),
    defineField({ name: "about", type: "aboutSection", group: "about" }),
    defineField({ name: "stats", type: "statsSection", group: "stats" }),
    defineField({ name: "services", type: "servicesSection", group: "services" }),
    defineField({ name: "fleet", type: "fleetSection", group: "fleet" }),
    defineField({
      name: "testimonials",
      type: "testimonialsSection",
      group: "testimonials",
    }),
    defineField({ name: "faq", type: "faqSection", group: "faq" }),
    defineField({ name: "blog", type: "blogSection", group: "blog" }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
