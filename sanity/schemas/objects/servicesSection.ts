import { defineArrayMember, defineField, defineType } from "sanity";

export const servicesSection = defineType({
  name: "servicesSection",
  title: "Services Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Plain part of the heading",
      initialValue: "Nuestros Servicios de",
    }),
    defineField({
      name: "headingHighlighted",
      title: "Heading (blue / accent part)",
      type: "string",
      initialValue: "Transporte Especializado",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "Nuestros Servicios",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
      initialValue: "/servicios",
    }),
    defineField({
      name: "featuredServices",
      title: "Featured Services",
      description:
        "Pick the services shown in the home page carousel. They are edited under 'Services' in the sidebar.",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "service" }],
        }),
      ],
      validation: (r) => r.max(6),
    }),
  ],
});
