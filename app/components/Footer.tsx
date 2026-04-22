import Link from "next/link";
import { FacebookIcon, InstagramIcon, LogoLMM } from "./icons";

type LinkItem = { label?: string; href?: string };
type Column = { title?: string; items?: LinkItem[] };

type Props = {
  copyright?: string;
  designedByLabel?: string;
  contactEmail?: string;
  footerColumns?: Column[];
  social?: { facebook?: string; instagram?: string };
};

const defaultColumns: Column[] = [
  {
    items: [
      { label: "Servicios", href: "/servicios" },
      { label: "Flota", href: "/flota" },
    ],
  },
  {
    items: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    items: [
      { label: "Política Privacidad", href: "/privacidad" },
      { label: "Cookies", href: "/cookies" },
      { label: "Términos y condiciones", href: "/terminos" },
    ],
  },
];

export function Footer({
  copyright = "Last Mile Mediterranean 2025 All Rights Reserved",
  designedByLabel = "Diseñado por INEFABLE",
  contactEmail = "hello@lastmilemediterranean.com",
  footerColumns,
  social,
}: Props) {
  const cols =
    footerColumns && footerColumns.length > 0 ? footerColumns : defaultColumns;

  return (
    <footer className="bg-black text-white border-t border-[var(--border-subtle)]">
      <div className="container-x py-14 md:py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <LogoLMM className="h-8 w-auto text-white" />
          </div>

          <div className="grid grid-cols-3 gap-6">
            {cols.map((col, i) => (
              <div key={i}>
                {col.title && (
                  <div className="text-[11px] tracking-[0.18em] font-semibold text-white/50 mb-3">
                    {col.title}
                  </div>
                )}
                <ul className="space-y-2.5">
                  {col.items?.map((it, j) => (
                    <li key={j}>
                      <Link
                        href={it.href || "#"}
                        className="text-[13px] text-white/80 hover:text-white transition-colors"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-[12px] text-white/60">
            {copyright}
            <div className="mt-1">{designedByLabel}</div>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${contactEmail}`}
              className="text-[12px] text-white/70 hover:text-white transition-colors"
            >
              {contactEmail}
            </a>
            <div className="flex items-center gap-3 text-white/80">
              {social?.facebook && (
                <a
                  href={social.facebook}
                  aria-label="Facebook"
                  className="hover:text-white transition-colors"
                >
                  <FacebookIcon />
                </a>
              )}
              {social?.instagram && (
                <a
                  href={social.instagram}
                  aria-label="Instagram"
                  className="hover:text-white transition-colors"
                >
                  <InstagramIcon />
                </a>
              )}
              {!social?.facebook && !social?.instagram && (
                <>
                  <span className="text-white/80">
                    <FacebookIcon />
                  </span>
                  <span className="text-white/80">
                    <InstagramIcon />
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
