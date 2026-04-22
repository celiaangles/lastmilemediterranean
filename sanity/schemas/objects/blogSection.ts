import { defineField, defineType } from "sanity";

export const blogSection = defineType({
  name: "blogSection",
  title: "Blog Section (homepage teaser)",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Plain part of the heading",
      initialValue: "Últimas Notícias y Posts",
    }),
    defineField({
      name: "headingHighlighted",
      title: "Heading (blue / accent part)",
      type: "string",
      initialValue: "",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "Ve a Nuestro Blog",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
      initialValue: "/blog",
    }),
    defineField({
      name: "postsToShow",
      title: "Posts to Show",
      type: "number",
      initialValue: 3,
      validation: (r) => r.min(1).max(6).integer(),
    }),
  ],
});
