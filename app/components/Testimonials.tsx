"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
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

export function Testimonials({
  heading = "Empresas Que",
  headingHighlighted = "Confían en Nosotros",
  ctaLabel = "Sobre Nosotros",
  ctaHref = "/nosotros",
  testimonials,
}: Props) {
  const list =
    testimonials && testimonials.length > 0 ? testimonials : defaultList;

  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isResetting = useRef(false);
  const count = list.length;

  const extendedList = [...list, ...list, ...list];

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
      <div className="py-20 md:py-24 border-t border-[var(--border-subtle)]">
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
          {extendedList.map((t, i) => {
            const logoUrl = t.brandLogo
              ? urlFor(t.brandLogo).width(400).url()
              : null;
            return (
              <article
                key={`${i}`}
                className="snap-start shrink-0 w-[85%] md:w-[348px] rounded-2xl border border-white/20 p-[21px] flex flex-col gap-[7px]"
                style={{ backgroundColor: "#252929", height: 356 }}
              >
                <div className="h-10 flex items-center">
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
                <div className="mt-auto">
                  <div className="text-[14px] font-medium text-white">
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
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i + count)}
              aria-label={`Ir a testimonio ${i + 1}`}
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
