import Link from "next/link";
import { ArrowUpRight } from "./icons";

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
import { urlFor } from "@/sanity/lib/image";
type SanityImageSource = Parameters<typeof urlFor>[0];

type Post = {
  _id?: string;
  title: string;
  slug?: string;
  category?: string;
  coverImage?: SanityImageSource;
  publishedAt?: string;
};

type Props = {
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  posts?: Post[];
};

const defaultPosts: Post[] = [
  {
    title: "7 Claves para Elegir tu Partner de Transporte Refrigerado",
    category: "LOGÍSTICA",
    publishedAt: "2025-01-15",
  },
  {
    title:
      "Qué No Sabes Sobre el Transporte de Carretera y Deberías Saber",
    category: "TRANSPORTES",
    publishedAt: "2025-01-22",
  },
  {
    title:
      "Tecnología en la Última Milla: Cómo la Digitalización Mejora tus Entregas",
    category: "INNOVACIÓN",
    publishedAt: "2025-01-29",
  },
];

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function Blog({
  heading = "Últimas Notícias y Posts",
  ctaLabel = "Ve a Nuestro Blog",
  ctaHref = "/blog",
  posts,
}: Props) {
  const list = posts && posts.length > 0 ? posts : defaultPosts;

  return (
    <section className="bg-[var(--surface-dark)] text-white">
      <div className="container-x py-20 md:py-24 border-t border-[var(--border-subtle)]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <h2 className="text-3xl md:text-[44px] font-medium leading-[1.15] tracking-tight">
            {heading}
          </h2>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-4 rounded-lg bg-white/5 border border-white/60 px-5 py-4 text-base font-medium text-white hover:bg-white/10 transition-colors self-start md:self-auto"
          >
            {ctaLabel}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {list.slice(0, 3).map((p, i) => {
            const img = p.coverImage
              ? urlFor(p.coverImage).width(800).height(600).fit("crop").url()
              : null;
            return (
              <Link
                key={p._id || i}
                href={p.slug ? `/blog/${p.slug}` : "#"}
                className="group relative rounded-2xl overflow-hidden bg-[var(--surface-card)] p-4 h-[477px] border border-white/20"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.02] transition-transform duration-500"
                  style={{
                    backgroundImage: img
                      ? `url(${img})`
                      : "linear-gradient(135deg, #1e2836 0%, #2a3a4d 100%)",
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl p-4 flex flex-col" style={{ backgroundColor: "#191E1E" }}>
                  {p.category && (
                    <div className="text-[10px] tracking-[0.2em] font-medium text-[var(--brand-blue-accent)] mb-2">
                      {p.category}
                    </div>
                  )}
                  <h3 className="text-lg md:text-xl font-medium leading-snug group-hover:text-[var(--brand-blue-accent)] transition-colors">
                    {p.title}
                  </h3>
                  {p.publishedAt && (
                    <div className="mt-auto pt-3 text-[12px] text-white/60">
                      {formatDate(p.publishedAt)}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
