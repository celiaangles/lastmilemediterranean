import Link from "next/link";
import { client } from "@/sanity/lib/client";
import {
  allServicesQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ArrowUpRight } from "../components/icons";
type SanityImageSource = Parameters<typeof urlFor>[0];

export const revalidate = 60;

type Service = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  image?: SanityImageSource;
  temperatureRange?: string;
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

async function safeFetch<T>(query: string) {
  try {
    return (await client.fetch<T>(query)) ?? null;
  } catch {
    return null;
  }
}

export default async function ServiciosPage() {
  const [services, settings] = await Promise.all([
    safeFetch<Service[]>(allServicesQuery),
    safeFetch<SiteSettings>(siteSettingsQuery),
  ]);

  const list = services || [];

  return (
    <>
      <Header navLinks={settings?.navLinks} cta={settings?.headerCta} />

      <main>
        <section className="bg-[var(--surface-dark)] text-white pt-32 md:pt-40 pb-10">
          <div className="container-x">
            <div className="text-[11px] tracking-[0.2em] text-white/60 font-medium mb-4">
              NUESTROS SERVICIOS
            </div>
            <h1 className="text-4xl md:text-[64px] font-medium leading-[1.05] tracking-tight max-w-3xl">
              Transporte{" "}
              <span className="text-[var(--brand-blue-accent)]">
                Especializado
              </span>{" "}
              de Última Milla
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] md:text-base text-white/75 leading-relaxed">
              Cada tipo de mercancía tiene sus propios requisitos. Descubre
              nuestras soluciones, diseñadas para proteger tu producto en cada
              kilómetro.
            </p>
          </div>
        </section>

        <section className="bg-[var(--surface-dark)] text-white pb-24">
          <div className="container-x">
            {list.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center text-white/70">
                Aún no has creado servicios.{" "}
                <Link
                  href="/studio/structure/service"
                  className="underline hover:text-white"
                >
                  Créalos en el Studio
                </Link>
                .
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map((s) => {
                  const img = s.image
                    ? urlFor(s.image).width(1200).height(800).fit("crop").url()
                    : null;
                  return (
                    <Link
                      key={s._id}
                      href={`/servicios/${s.slug}`}
                      className="group rounded-2xl overflow-hidden bg-[var(--surface-card)] border border-[var(--border-subtle)] flex flex-col"
                    >
                      <div
                        className="aspect-[4/3] bg-cover bg-center group-hover:scale-[1.03] transition-transform duration-500"
                        style={{
                          backgroundImage: img
                            ? `url(${img})`
                            : "linear-gradient(135deg, #1e2836 0%, #2a3a4d 100%)",
                        }}
                      />
                      <div className="p-6 flex-1 flex flex-col">
                        {s.temperatureRange && (
                          <div className="text-[11px] tracking-[0.18em] font-medium text-[var(--brand-blue-accent)] mb-2">
                            {s.temperatureRange}
                          </div>
                        )}
                        <h3 className="text-xl font-medium group-hover:text-[var(--brand-blue-accent)] transition-colors">
                          {s.title}
                        </h3>
                        {s.shortDescription && (
                          <p className="mt-2 text-[13px] text-white/75 leading-relaxed">
                            {s.shortDescription}
                          </p>
                        )}
                        <div className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[12px] text-white/70 group-hover:text-white transition-colors">
                          Ver detalles <ArrowUpRight />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
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
