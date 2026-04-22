import { defineArrayMember, defineField, defineType } from "sanity";

export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "Testimonials Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Plain part of the heading",
      initialValue: "Empresas Que",
    }),
    defineField({
      name: "headingHighlighted",
      title: "Heading (blue / accent part)",
      type: "string",
      initialValue: "Confían en Nosotros",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "Sobre Nosotros",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
      initialValue: "/nosotros",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "testimonial",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
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
              title: "Role / Company",
              type: "string",
              description: 'e.g. "CEO y Copropietario, Frutas Caimari"',
            }),
            defineField({
              name: "brandLogo",
              title: "Brand Logo",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "author", subtitle: "role", media: "brandLogo" },
          },
        }),
      ],
    }),
  ],
});
