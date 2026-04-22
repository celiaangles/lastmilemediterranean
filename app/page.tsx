import { client } from "@/sanity/lib/client";
import {
  homePageQuery,
  latestPostsQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AboutStats } from "./components/AboutStats";
import { Services } from "./components/Services";
import { Fleet } from "./components/Fleet";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Blog } from "./components/Blog";
import { Footer } from "./components/Footer";

export const revalidate = 60;

async function safeFetch<T>(query: string, params: Record<string, unknown> = {}) {
  try {
    return (await client.fetch<T>(query, params)) ?? null;
  } catch {
    return null;
  }
}

type HomeData = {
  hero?: Parameters<typeof Hero>[0];
  about?: Parameters<typeof AboutStats>[0]["about"];
  stats?: Parameters<typeof AboutStats>[0]["stats"];
  services?: Parameters<typeof Services>[0];
  fleet?: Parameters<typeof Fleet>[0];
  testimonials?: Parameters<typeof Testimonials>[0];
  faq?: Parameters<typeof FAQ>[0];
  blog?: {
    heading?: string;
    ctaLabel?: string;
    ctaHref?: string;
    postsToShow?: number;
  };
};

type SiteSettings = {
  navLinks?: Parameters<typeof Header>[0]["navLinks"];
  headerCta?: Parameters<typeof Header>[0]["cta"];
  contactEmail?: string;
  social?: { facebook?: string; instagram?: string };
  footerColumns?: Parameters<typeof Footer>[0]["footerColumns"];
  copyright?: string;
  designedByLabel?: string;
};

export default async function HomePage() {
  const [home, settings] = await Promise.all([
    safeFetch<HomeData>(homePageQuery),
    safeFetch<SiteSettings>(siteSettingsQuery),
  ]);
  const posts = await safeFetch<Parameters<typeof Blog>[0]["posts"]>(
    latestPostsQuery,
    { limit: home?.blog?.postsToShow ?? 3 }
  );

  return (
    <>
      <Header navLinks={settings?.navLinks} cta={settings?.headerCta} />
      <main>
        <Hero {...(home?.hero || {})} />
        <AboutStats about={home?.about} stats={home?.stats} />
        <Services {...(home?.services || {})} />
        <Fleet {...(home?.fleet || {})} />
        <Testimonials {...(home?.testimonials || {})} />
        <FAQ {...(home?.faq || {})} />
        <Blog
          heading={home?.blog?.heading}
          ctaLabel={home?.blog?.ctaLabel}
          ctaHref={home?.blog?.ctaHref}
          posts={posts || undefined}
        />
      </main>
      <Footer
        copyright={settings?.copyright}
        designedByLabel={settings?.designedByLabel}
        contactEmail={settings?.contactEmail}
        footerColumns={settings?.footerColumns}
        social={settings?.social}
      />
    </>
  );
}
