"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "./icons";
import { urlFor } from "@/sanity/lib/image";
type SanityImageSource = Parameters<typeof urlFor>[0];

type Service = {
  _id?: string;
  title: string;
  slug?: string;
  shortDescription?: string;
  description?: string;
  image?: SanityImageSource;
  temperatureRange?: string;
};

type Props = {
  heading?: string;
  headingHighlighted?: string;
  ctaLabel?: string;
  ctaHref?: string;
  services?: Service[];
};

const defaultServices: Service[] = [
  {
    title: "Alimentación Refrigerada",
    slug: "alimentacion-refrigerada",
    shortDescription:
      "Mantenemos la cadena de frío intacta desde el origen hasta el destino. Ideal para productos frescos, lácteos, frutas y verduras que requieren temperaturas controladas entre 0°C y 8°C.",
  },
  {
    title: "Alimentación Congelada",
    slug: "alimentacion-congelada",
    shortDescription:
      "Transporte especializado con temperaturas de -18°C a -25°C para productos congelados, helados, pescados y carnes. Garantizamos la calidad desde la carga hasta la entrega final.",
  },
  {
    title: "Transporte Seco",
    slug: "transporte-seco",
    shortDescription:
      "Solución completa para productos no perecederos, paquetería y mercancía general. Rutas optimizadas y entregas puntuales en toda la geografía peninsular e insular.",
  },
];

export function Services({
  heading = "Nuestros Servicios de",
  headingHighlighted = "Transporte Especializado",
  ctaLabel = "Nuestros Servicios",
  ctaHref = "/servicios",
  services,
}: Props) {
  const list = services && services.length > 0 ? services : defaultServices;

  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      if (cards.length === 0) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let min = Infinity;
      cards.forEach((c, i) => {
        const cardCenter = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(cardCenter - center);
        if (d < min) {
          min = d;
          closest = i;
        }
      });
      setActive(closest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  return (
    <section className="bg-[var(--surface-dark)] text-white">
      <div className="container-x py-20 md:py-24">
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

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar"
        >
          {list.map((s, i) => {
            const img = s.image
              ? urlFor(s.image).width(1200).height(800).fit("crop").url()
              : null;
            const body = s.shortDescription || s.description;
            const href = s.slug ? `/servicios/${s.slug}` : "#";
            return (
              <Link
                key={s._id || i}
                href={href}
                className="group relative snap-start shrink-0 w-[85%] md:w-[calc(50%-10px)] rounded-2xl overflow-hidden aspect-[4/3] bg-[var(--surface-card)]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.02] transition-transform duration-500"
                  style={{
                    backgroundImage: img
                      ? `url(${img})`
                      : "linear-gradient(135deg, #1e2836 0%, #2a3a4d 100%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {s.title}
                  </h3>
                  {body && (
                    <p className="mt-2 text-[13px] md:text-sm text-white/80 leading-relaxed max-w-md">
                      {body}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-1.5">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Ir a servicio ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                active === i
                  ? "w-6 bg-white/90"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
