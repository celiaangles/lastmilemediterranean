import Link from "next/link";
import { PortableText, PortableTextComponents } from "next-sanity";
import { ArrowUpRight } from "./icons";
import { urlFor } from "@/sanity/lib/image";
type SanityImageSource = Parameters<typeof urlFor>[0];

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type PortableTextBlock = any;

type Props = {
  title?: PortableTextBlock[];
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: SanityImageSource;
};

const titleComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <>{children}</>,
  },
  marks: {
    highlight: ({ children }) => (
      <span className="text-[var(--brand-blue-accent)]">{children}</span>
    ),
  },
};

export function Hero({
  title,
  subtitle = "Conectamos tu negocio con cada rincón del Mediterráneo. Desde Mallorca hasta la península, cada kilómetro importa.",
  ctaLabel = "Contacta un Experto",
  ctaHref = "/contacto",
  backgroundImage,
}: Props) {
  const bgUrl = backgroundImage
    ? urlFor(backgroundImage).width(2000).height(1200).fit("crop").url()
    : null;

  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: bgUrl
            ? `url(${bgUrl})`
            : "linear-gradient(135deg, #1c2a3a 0%, #2b4358 50%, #7a6041 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 80% at 15% 85%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0) 70%)",
        }}
      />

      <div className="relative z-10 px-[60px] pb-[60px] w-full">
        <div className="grid md:grid-cols-2 gap-0 items-end">
          <div>
            <h1 className="text-white font-semibold leading-[1.05] tracking-tight text-[44px] md:text-[64px]">
              {title ? (
                <PortableText value={title} components={titleComponents} />
              ) : (
                "Tu Partner Logístico de Última Milla"
              )}
            </h1>
            <p className="mt-[20px] max-w-xl text-[18px] leading-[1.35] text-white/85">
              {subtitle}
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-black/80 backdrop-blur px-5 py-3 text-sm font-medium text-white border border-white/10 hover:bg-black transition-colors"
            >
              {ctaLabel}
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
