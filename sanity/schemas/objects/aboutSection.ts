import { defineField, defineType } from "sanity";

export const aboutSection = defineType({
  name: "aboutSection",
  title: "About Section",
  type: "object",
  fields: [
    defineField({
      name: "aboutEyebrow",
      title: "About Eyebrow",
      type: "string",
      initialValue: "SOBRE NOSOTROS",
    }),
    defineField({
      name: "aboutBody",
      title: "About Body",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "purposeEyebrow",
      title: "Purpose Eyebrow",
      type: "string",
      initialValue: "PROPÓSITO",
    }),
    defineField({
      name: "purposeBody",
      title: "Purpose Body",
      type: "text",
      rows: 4,
    }),
  ],
});
