import { defineArrayMember, defineField, defineType } from "sanity";

export const fleetSection = defineType({
  name: "fleetSection",
  title: "Fleet Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Plain part of the heading",
      initialValue: "Más de 250 Vehículos Listos",
    }),
    defineField({
      name: "headingHighlighted",
      title: "Heading (blue / accent part)",
      type: "string",
      initialValue: "para tu Mercancía",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "Nuestra Flota",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
      initialValue: "/flota",
    }),
    defineField({
      name: "vehicles",
      title: "Vehicles",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "vehicle",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "highlighted",
              title: "Highlighted (shown in blue)",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "name", media: "image" },
          },
        }),
      ],
    }),
  ],
});
