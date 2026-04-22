import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Alimentación Refrigerada"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      description: "Used on cards (home page + services list).",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: "image",
      title: "Card / Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "temperatureRange",
      title: "Temperature Range",
      description: 'Optional label, e.g. "0°C a 8°C"',
      type: "string",
    }),
    defineField({
      name: "features",
      title: "Key Features",
      description: "Bullet points shown on the detail page.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "longDescription",
      title: "Long Description",
      description: "Rich text shown on the detail page.",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      description: "Lower numbers appear first on /servicios.",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "temperatureRange", media: "image" },
  },
});
