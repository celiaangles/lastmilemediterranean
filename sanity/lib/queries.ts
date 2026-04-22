import { groq } from "next-sanity";

const serviceCardProjection = groq`{
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  image,
  temperatureRange
}`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  hero{
    title,
    subtitle,
    ctaLabel,
    ctaHref,
    backgroundImage
  },
  about,
  stats,
  services{
    heading, headingHighlighted, ctaLabel, ctaHref,
    "services": featuredServices[]->${serviceCardProjection}
  },
  fleet{
    heading, headingHighlighted, ctaLabel, ctaHref,
    vehicles[]{ name, image, highlighted }
  },
  testimonials{
    heading, headingHighlighted, ctaLabel, ctaHref,
    testimonials[]{ quote, author, role, brandLogo }
  },
  faq,
  blog{
    heading, headingHighlighted, ctaLabel, ctaHref, postsToShow
  },
  seoTitle,
  seoDescription
}`;

export const allServicesQuery = groq`*[_type == "service"] | order(order asc, title asc)${serviceCardProjection}`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  longDescription,
  image,
  gallery,
  temperatureRange,
  features
}`;

export const serviceSlugsQuery = groq`*[_type == "service" && defined(slug.current)][].slug.current`;

export const latestPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc)[0...$limit]{
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  coverImage,
  publishedAt
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName,
  logo,
  navLinks,
  headerCta,
  contactEmail,
  social,
  footerColumns[]{
    title,
    items[]{ label, href }
  },
  copyright,
  designedByLabel
}`;
