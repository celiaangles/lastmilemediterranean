import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "brandLogo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      description: "Company / brand logo",
    }),
    defineField({
      name: "quote",
      title: "Message",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Author Position",
      type: "string",
      description: 'e.g. "CEO y Copropietario, Frutas Caimari"',
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "author", subtitle: "role", media: "brandLogo" },
  },
});
