import Link from "next/link";
import { ArrowUpRight, LogoLMM } from "./icons";

type NavLink = { label?: string; href?: string };

type Props = {
  navLinks?: NavLink[];
  cta?: { label?: string; href?: string };
};

const defaultNav: NavLink[] = [
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Flota", href: "/flota" },
  { label: "Blog", href: "/blog" },
];

export function Header({ navLinks, cta }: Props) {
  const links = navLinks && navLinks.length > 0 ? navLinks : defaultNav;
  const ctaLabel = cta?.label || "Contacto";
  const ctaHref = cta?.href || "/contacto";

  return (
    <header className="absolute top-0 left-0 right-0 z-50 pt-5">
      <div className="flex items-center justify-between gap-3 px-[60px]">
        {/* Left pill: logo + nav */}
        <div className="flex flex-1 items-center justify-between gap-6 rounded-[8px] bg-[#0f0f10] border border-white/[0.06] pl-5 pr-7 py-3">
          <Link href="/" className="flex-shrink-0 text-white">
            <LogoLMM className="h-9 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {links.map((l, i) => (
              <Link
                key={i}
                href={l.href || "#"}
                className="text-[18px] text-white/90 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right pill: Contacto + blue arrow square */}
        <Link
          href={ctaHref}
          className="flex items-center gap-3 rounded-[8px] bg-[#0f0f10] border border-white/[0.06] pl-6 pr-2 py-2 text-white hover:bg-[#17171a] transition-colors"
        >
          <span className="text-[18px]">{ctaLabel}</span>
          <span className="flex items-center justify-center h-10 w-10 rounded-xl bg-[var(--brand-blue)] text-white">
            <ArrowUpRight className="h-[16px] w-[16px]" />
          </span>
        </Link>
      </div>
    </header>
  );
}
