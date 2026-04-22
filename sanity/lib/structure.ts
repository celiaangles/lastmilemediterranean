import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.listItem()
        .title("Home Page")
        .id("homePage")
        .child(
          S.document().schemaType("homePage").documentId("homePage")
        ),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("blogPost").title("Blog Posts"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
    ]);
