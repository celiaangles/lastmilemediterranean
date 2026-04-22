type About = {
  aboutEyebrow?: string;
  aboutBody?: string;
  purposeEyebrow?: string;
  purposeBody?: string;
};

type Stat = { value: string; label: string };

type Props = {
  about?: About;
  stats?: { stats?: Stat[] };
};

const defaultAbout: About = {
  aboutEyebrow: "SOBRE NOSOTROS",
  aboutBody:
    "En Last Mile Mediterranean somos un partner logístico de origen familiar arraigado en las Islas Baleares, donde la confianza, la innovación y el conocimiento local se unen para crear experiencias de entrega de última milla fiables en todo el Mediterráneo. Desde Mallorca operamos hacia Madrid, Alicante, Cádiz y más allá.",
  purposeEyebrow: "PROPÓSITO",
  purposeBody:
    "Garantizamos entregas fiables con control de temperatura, sustentadas en confianza, expertise local y tecnología inteligente. Cada kilómetro que recorremos protege tu producto, fortalece tu marca y conecta comunidades a lo largo del Mediterráneo. Tu mercancía, nuestra responsabilidad. Si quieres que ampliemos nuestros servicios a tu zona, no dudes en contactarnos.",
};

const defaultStats: Stat[] = [
  { value: "+ 6.500", label: "ENTREGAS REALIZADAS" },
  { value: "+ 6.000", label: "KILÓMETROS RECORRIDOS" },
  { value: "+ 250", label: "VEHÍCULOS DISPONIBLES" },
  { value: "+ 300", label: "NEGOCIOS SATISFECHOS" },
];

export function AboutStats({ about, stats }: Props) {
  const a = { ...defaultAbout, ...about };
  const s =
    stats?.stats && stats.stats.length > 0 ? stats.stats : defaultStats;

  return (
    <section className="bg-[var(--brand-blue)] text-white">
      <div className="container-x py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <div className="text-[11px] tracking-[0.18em] text-white/85 font-semibold mb-4">
              {a.aboutEyebrow}
            </div>
            <p className="text-[15px] md:text-base leading-[1.65] text-white">
              {a.aboutBody}
            </p>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.18em] text-white/85 font-semibold mb-4">
              {a.purposeEyebrow}
            </div>
            <p className="text-[15px] md:text-base leading-[1.65] text-white">
              {a.purposeBody}
            </p>
          </div>
        </div>

        <div className="mt-14 md:mt-16 border-t border-white/25 pt-10 md:pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {s.map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-[11px] tracking-[0.18em] text-white/90 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
