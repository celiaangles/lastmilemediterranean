import type { SchemaTypeDefinition } from "sanity";

import { hero } from "./objects/hero";
import { aboutSection } from "./objects/aboutSection";
import { statsSection } from "./objects/statsSection";
import { servicesSection } from "./objects/servicesSection";
import { fleetSection } from "./objects/fleetSection";
import { testimonialsSection } from "./objects/testimonialsSection";
import { faqSection } from "./objects/faqSection";
import { blogSection } from "./objects/blogSection";

import { service } from "./documents/service";
import { blogPost } from "./documents/blogPost";

import { siteSettings } from "./singletons/siteSettings";
import { homePage } from "./singletons/homePage";

export const schemaTypes: SchemaTypeDefinition[] = [
  hero,
  aboutSection,
  statsSection,
  servicesSection,
  fleetSection,
  testimonialsSection,
  faqSection,
  blogSection,
  service,
  blogPost,
  siteSettings,
  homePage,
];
