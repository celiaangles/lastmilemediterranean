import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "array",
      description:
        'Write the full title and select words to mark as "highlight" for the blue accent color.',
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              {
                title: "Highlight",
                value: "highlight",
                icon: () => "H",
              },
            ],
            annotations: [],
          },
        },
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      initialValue:
        "Conectamos tu negocio con cada rincón del Mediterráneo. Desde Mallorca hasta la península, cada kilómetro importa.",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      initialValue: "Contacta un Experto",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Link",
      type: "string",
      initialValue: "/contacto",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      description: "Full-width hero image (truck on bridge, etc.)",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
  ],
});
