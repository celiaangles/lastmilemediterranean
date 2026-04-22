import Link from "next/link";
import { ArrowUpRight, VanIcon } from "./icons";

type Vehicle = { name: string; highlighted?: boolean };

type Props = {
  heading?: string;
  headingHighlighted?: string;
  ctaLabel?: string;
  ctaHref?: string;
  vehicles?: Vehicle[];
};

const defaultVehicles: Vehicle[] = [
  { name: "" },
  { name: "" },
  { name: "" },
  { name: "" },
  { name: "" },
  { name: "Renault Maxity", highlighted: true },
  { name: "" },
  { name: "" },
  { name: "" },
  { name: "" },
];

export function Fleet({
  heading = "Más de 250 Vehículos Listos",
  headingHighlighted = "para tu Mercancía",
  ctaLabel = "Nuestra Flota",
  ctaHref = "/flota",
  vehicles,
}: Props) {
  const list =
    vehicles && vehicles.length > 0 ? vehicles : defaultVehicles;

  return (
    <section className="bg-[var(--surface-dark)] text-white">
      <div className="container-x py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
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
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-card)] border border-[var(--border-subtle)] px-4 py-2.5 text-[13px] text-white hover:bg-[var(--surface-card-2)] transition-colors self-start md:self-auto"
          >
            {ctaLabel}
            <ArrowUpRight />
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-4 md:gap-8 max-w-5xl mx-auto">
          {list.slice(0, 10).map((v, i) => (
            <div key={i} className="flex flex-col items-center">
              <VanIcon highlighted={!!v.highlighted} className="w-full h-auto" />
              {v.highlighted && v.name && (
                <div className="mt-3 text-xs text-white/80">{v.name}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
