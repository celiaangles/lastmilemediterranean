import Link from "next/link";
import { ArrowUpRight } from "./icons";
import { urlFor } from "@/sanity/lib/image";
type SanityImageSource = Parameters<typeof urlFor>[0];

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  brandLogo?: SanityImageSource;
  brandName?: string;
};

type Props = {
  heading?: string;
  headingHighlighted?: string;
  ctaLabel?: string;
  ctaHref?: string;
  testimonials?: Testimonial[];
};

const defaultList: Testimonial[] = [
  {
    quote:
      "Last Mile Mediterranean ha transformado nuestras entregas. Los productos refrigerados llegan siempre en perfecto estado y a tiempo. ¡Han elevado la calidad de mis entregas de manera excepcional!",
    author: "Jaume Agulló",
    role: "Propietario, Ca'n Jaume Artesans",
    brandName: "CAN JAUME",
  },
  {
    quote:
      "Desde que empezamos a trabajar con Last Mile Mediterranean, todo ha fluido a la perfección. Su profesionalidad en el transporte refrigerado nos da la tranquilidad de saber que nuestros productos llegarán en las mejores condiciones.",
    author: "Francisco Caimari",
    role: "CEO y Copropietario, Frutas Caimari",
    brandName: "Fruites Caimari",
  },
  {
    quote:
      "Nuestra colaboración con Last Mile Mediterranean es sólida desde los inicios. Llevamos años trabajando juntos y no tenemos queja alguna. Es un transporte especializado con clientes muy satisfechos.",
    author: "Joaquin Novell",
    role: "CEO, Pescados Novell",
    brandName: "Oliver & Sons",
  },
];

export function Testimonials({
  heading = "Empresas Que",
  headingHighlighted = "Confían en Nosotros",
  ctaLabel = "Sobre Nosotros",
  ctaHref = "/nosotros",
  testimonials,
}: Props) {
  const list =
    testimonials && testimonials.length > 0 ? testimonials : defaultList;

  return (
    <section className="bg-[var(--surface-dark)] text-white">
      <div className="container-x py-20 md:py-24 border-t border-[var(--border-subtle)]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <h2 className="text-3xl md:text-[44px] font-semibold leading-[1.15] tracking-tight">
            {heading}
            {headingHighlighted && (
              <>
                <br />
                <span className="text-[var(--brand-blue-accent)]">
                  {headingHighlighted}
                </span>
              </>
            )}
          </h2>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] px-4 py-2.5 text-[13px] text-white hover:bg-[var(--surface-card-2)] transition-colors self-start md:self-auto"
          >
            {ctaLabel}
            <ArrowUpRight />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {list.slice(0, 3).map((t, i) => {
            const logoUrl = t.brandLogo
              ? urlFor(t.brandLogo).width(400).url()
              : null;
            return (
              <article
                key={i}
                className="rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] p-6 md:p-7 flex flex-col"
              >
                <div className="h-10 flex items-center mb-5">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={t.brandName || t.author}
                      className="h-8 w-auto object-contain opacity-90"
                    />
                  ) : (
                    <span className="text-white/80 text-sm tracking-[0.15em] font-medium">
                      {t.brandName || ""}
                    </span>
                  )}
                </div>
                <p className="text-[14px] leading-relaxed text-white/85 flex-1">
                  {t.quote}
                </p>
                <div className="mt-6">
                  <div className="text-[14px] font-semibold text-white">
                    {t.author}
                  </div>
                  {t.role && (
                    <div className="text-[12px] text-white/60 mt-0.5">
                      {t.role}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-1.5">
          <span className="h-1.5 w-6 rounded-full bg-white/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        </div>
      </div>
    </section>
  );
}
