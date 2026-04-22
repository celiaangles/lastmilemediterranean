import { defineArrayMember, defineField, defineType } from "sanity";

const linkArray = defineField({
  name: "items",
  title: "Links",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      name: "link",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "Href", type: "string" }),
      ],
      preview: { select: { title: "label", subtitle: "href" } },
    }),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
    { name: "contact", title: "Contact & Social" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "Last Mile Mediterranean",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "header",
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      group: "header",
      of: [
        defineArrayMember({
          type: "object",
          name: "link",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Href", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "headerCta",
      title: "Header CTA (Contacta button)",
      type: "object",
      group: "header",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "Contacto",
        }),
        defineField({
          name: "href",
          title: "Href",
          type: "string",
          initialValue: "/contacto",
        }),
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      group: "contact",
      initialValue: "hello@lastmilemediterranean.com",
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
      ],
    }),
    defineField({
      name: "footerColumns",
      title: "Footer Link Columns",
      description:
        "Each column is a group of links. The design uses 3 columns.",
      type: "array",
      group: "footer",
      of: [
        defineArrayMember({
          type: "object",
          name: "footerColumn",
          fields: [
            defineField({
              name: "title",
              title: "Column Title (optional)",
              type: "string",
            }),
            linkArray,
          ],
          preview: {
            select: { title: "title", items: "items" },
            prepare({ title, items }) {
              const count = Array.isArray(items) ? items.length : 0;
              return {
                title: title || `Column (${count} links)`,
                subtitle: `${count} link${count === 1 ? "" : "s"}`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright",
      type: "string",
      group: "footer",
      initialValue: "Last Mile Mediterranean 2025 All Rights Reserved",
    }),
    defineField({
      name: "designedByLabel",
      title: "Designed By",
      type: "string",
      group: "footer",
      initialValue: "Diseñado por INEFABLE",
    }),
  ],
});
