"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
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

function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

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
  const isResetting = useRef(false);
  const [infoHeight, setInfoHeight] = useState(0);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const count = list.length;

  // The rendered list is: [...clones] [original items] [...clones]
  // Indices: 0..count-1 (clone set) | count..2*count-1 (real) | 2*count..3*count-1 (clone set)
  const extendedList = [...list, ...list, ...list];

  // Measure all info containers and set uniform height to the tallest
  useEffect(() => {
    const heights = infoRefs.current
      .filter(Boolean)
      .map((el) => el!.scrollHeight);
    const max = Math.max(...heights, 0);
    if (max > 0) setInfoHeight(max);
  }, [extendedList.length]);

  // On mount, scroll to the start of the real set (index = count) without animation
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[count] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({ left: card.offsetLeft - 60, behavior: "instant" });
    }
  }, [count]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      if (isResetting.current) return;
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
      setActive(closest % count);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count]);

  // After a smooth scroll ends, silently reset to the real set if we're in a clone region
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScrollEnd = () => {
      if (isResetting.current) return;
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
      // If in clone region, jump to corresponding real card
      if (closest < count || closest >= 2 * count) {
        const realIndex = closest % count;
        const realCard = cards[realIndex + count] as HTMLElement | undefined;
        if (realCard) {
          isResetting.current = true;
          el.scrollTo({ left: realCard.offsetLeft - 60, behavior: "instant" });
          requestAnimationFrame(() => {
            isResetting.current = false;
          });
        }
      }
    };
    el.addEventListener("scrollend", onScrollEnd);
    return () => el.removeEventListener("scrollend", onScrollEnd);
  }, [count]);

  const scrollTo = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - 60, behavior: "smooth" });
  }, []);

  // Find the current extended index (in the real set) matching `active`
  const findCurrentExtended = useCallback(() => {
    const el = trackRef.current;
    if (!el) return count;
    const cards = Array.from(el.children) as HTMLElement[];
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = count;
    let min = Infinity;
    cards.forEach((c, i) => {
      const cardCenter = c.offsetLeft + c.clientWidth / 2;
      const d = Math.abs(cardCenter - center);
      if (d < min) {
        min = d;
        closest = i;
      }
    });
    return closest;
  }, [count]);

  const scrollPrev = useCallback(() => {
    const current = findCurrentExtended();
    scrollTo(current - 1);
  }, [findCurrentExtended, scrollTo]);

  const scrollNext = useCallback(() => {
    const current = findCurrentExtended();
    scrollTo(current + 1);
  }, [findCurrentExtended, scrollTo]);

  return (
    <section className="bg-[var(--surface-dark)] text-white">
      <div className="py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 px-6 md:px-[60px]">
          <h2 className="text-3xl md:text-[44px] font-medium leading-[1.15] tracking-tight">
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
          <div className="flex items-center gap-3 self-start md:self-auto">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-4 rounded-lg bg-white/5 border border-white/60 px-5 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors"
            >
              {ctaLabel}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button
              onClick={scrollPrev}
              aria-label="Anterior"
              className="flex items-center justify-center h-[57px] w-[57px] rounded-lg bg-white/5 border border-white/60 text-white hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Siguiente"
              className="flex items-center justify-center h-[57px] w-[57px] rounded-lg bg-white/5 border border-white/60 text-white hover:bg-white/10 transition-colors"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 px-6 md:px-[60px] no-scrollbar"
        >
          {extendedList.map((s, i) => {
            const img = s.image
              ? urlFor(s.image).width(1200).height(800).fit("crop").url()
              : null;
            const body = s.shortDescription || s.description;
            const href = s.slug ? `/servicios/${s.slug}` : "#";
            return (
              <Link
                key={`${s._id || i}-${i}`}
                href={href}
                className="group relative snap-start shrink-0 w-[85%] md:w-[calc(45%-10px)] rounded-2xl overflow-hidden aspect-[4/3] bg-[var(--surface-card)] p-4"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.02] transition-transform duration-500"
                  style={{
                    backgroundImage: img
                      ? `url(${img})`
                      : "linear-gradient(135deg, #1e2836 0%, #2a3a4d 100%)",
                  }}
                />
                <div
                  ref={(el) => { infoRefs.current[i] = el; }}
                  className="absolute bottom-4 left-4 right-4 rounded-xl p-4"
                  style={{ backgroundColor: "#191E1E", minHeight: infoHeight > 0 ? infoHeight : undefined }}
                >
                  <h3 className="text-xl md:text-2xl font-medium">
                    {s.title}
                  </h3>
                  {body && (
                    <p className="mt-2 text-[13px] md:text-sm text-white/80 leading-relaxed">
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
              onClick={() => scrollTo(i + count)}
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
