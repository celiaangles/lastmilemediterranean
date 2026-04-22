import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import {
  serviceBySlugQuery,
  serviceSlugsQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ArrowUpRight } from "../../components/icons";
type SanityImageSource = Parameters<typeof urlFor>[0];

export const revalidate = 60;

type Service = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  longDescription?: PortableTextBlock[];
  image?: SanityImageSource;
  gallery?: SanityImageSource[];
  temperatureRange?: string;
  features?: string[];
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

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(serviceSlugsQuery);
    return (slugs || []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let service: Service | null = null;
  let settings: SiteSettings | null = null;
  try {
    [service, settings] = await Promise.all([
      client.fetch<Service>(serviceBySlugQuery, { slug }),
      client.fetch<SiteSettings>(siteSettingsQuery),
    ]);
  } catch {
    /* keep nulls, render not-found below */
  }

  if (!service) return notFound();

  const heroImg = service.image
    ? urlFor(service.image).width(2000).height(1000).fit("crop").url()
    : null;

  return (
    <>
      <Header navLinks={settings?.navLinks} cta={settings?.headerCta} />

      <main>
        <section className="relative bg-[var(--surface-dark)] text-white pt-32 md:pt-40 pb-16">
          <div className="container-x">
            <Link
              href="/servicios"
              className="inline-flex items-center gap-1.5 text-[12px] text-white/60 hover:text-white transition-colors mb-6"
            >
              ← Volver a servicios
            </Link>
            {service.temperatureRange && (
              <div className="text-[11px] tracking-[0.2em] text-[var(--brand-blue-accent)] font-medium mb-4">
                {service.temperatureRange}
              </div>
            )}
            <h1 className="text-4xl md:text-[64px] font-medium leading-[1.05] tracking-tight max-w-3xl">
              {service.title}
            </h1>
            {service.shortDescription && (
              <p className="mt-6 max-w-2xl text-[15px] md:text-lg text-white/80 leading-relaxed">
                {service.shortDescription}
              </p>
            )}
          </div>
        </section>

        {heroImg && (
          <section className="bg-[var(--surface-dark)]">
            <div className="container-x">
              <div
                className="aspect-[16/7] rounded-2xl bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url(${heroImg})` }}
              />
            </div>
          </section>
        )}

        <section className="bg-[var(--surface-dark)] text-white py-16 md:py-20">
          <div className="container-x grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 prose-invert">
              {service.longDescription ? (
                <div className="space-y-4 text-[15px] md:text-base text-white/85 leading-relaxed [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-2 [&_a]:text-[var(--brand-blue-accent)] [&_a]:underline [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6">
                  <PortableText value={service.longDescription} />
                </div>
              ) : (
                <p className="text-white/70">
                  {service.shortDescription ||
                    "Próximamente: más información sobre este servicio."}
                </p>
              )}
            </div>

            <aside className="md:col-span-1">
              {service.features && service.features.length > 0 && (
                <div className="rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] p-6">
                  <div className="text-[11px] tracking-[0.18em] font-medium text-white/60 mb-4">
                    CARACTERÍSTICAS
                  </div>
                  <ul className="space-y-3">
                    {service.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-[14px] text-white/90 leading-snug"
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--brand-blue-accent)] flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                href="/contacto"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-blue)] hover:bg-[var(--brand-blue-accent)] transition-colors px-5 py-3 text-sm font-medium text-white"
              >
                Contactar sobre este servicio <ArrowUpRight />
              </Link>
            </aside>
          </div>
        </section>

        {service.gallery && service.gallery.length > 0 && (
          <section className="bg-[var(--surface-dark)] pb-20">
            <div className="container-x grid md:grid-cols-3 gap-4">
              {service.gallery.map((g, i) => {
                const url = urlFor(g).width(800).height(600).fit("crop").url();
                return (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${url})` }}
                  />
                );
              })}
            </div>
          </section>
        )}
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
