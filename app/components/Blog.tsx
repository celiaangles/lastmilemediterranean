import Link from "next/link";
import { ArrowUpRight } from "./icons";
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
          <h2 className="text-3xl md:text-[44px] font-semibold leading-[1.15] tracking-tight">
            {heading}
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
          {list.slice(0, 3).map((p, i) => {
            const img = p.coverImage
              ? urlFor(p.coverImage).width(800).height(600).fit("crop").url()
              : null;
            return (
              <Link
                key={p._id || i}
                href={p.slug ? `/blog/${p.slug}` : "#"}
                className="group rounded-2xl overflow-hidden bg-[var(--surface-card)] border border-[var(--border-subtle)] flex flex-col"
              >
                <div
                  className="aspect-[4/3] bg-cover bg-center"
                  style={{
                    backgroundImage: img
                      ? `url(${img})`
                      : "linear-gradient(135deg, #1e2836 0%, #2a3a4d 100%)",
                  }}
                />
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                  {p.category && (
                    <div className="text-[10px] tracking-[0.2em] font-semibold text-[var(--brand-blue-accent)] mb-2">
                      {p.category}
                    </div>
                  )}
                  <h3 className="text-lg md:text-xl font-semibold leading-snug group-hover:text-[var(--brand-blue-accent)] transition-colors">
                    {p.title}
                  </h3>
                  {p.publishedAt && (
                    <div className="mt-auto pt-5 text-[12px] text-white/60">
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
