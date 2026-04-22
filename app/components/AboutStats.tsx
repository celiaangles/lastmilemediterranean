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
    <section className="bg-[var(--brand-blue)] text-white min-h-screen flex flex-col">
      <div className="flex-1 px-6 md:px-[60px] pt-16 md:pt-20">
        <div className="flex flex-col gap-10">
          <div>
            <div className="text-[18px] tracking-normal text-white/85 font-medium mb-4">
              {a.aboutEyebrow}
            </div>
            <p className="text-[24px] leading-[1.45] text-white font-medium">
              {a.aboutBody}
            </p>
          </div>
          <div>
            <div className="text-[18px] tracking-normal text-white/85 font-medium mb-4">
              {a.purposeEyebrow}
            </div>
            <p className="text-[24px] leading-[1.45] text-white font-medium">
              {a.purposeBody}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-[60px] pb-16 md:pb-20">
        <div className="border-t border-white/25 pt-10 md:pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {s.map((stat, i) => (
              <div key={i}>
                <div className="text-[42px] md:text-[64px] font-medium tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-[11px] tracking-[0.18em] text-white/90 font-medium">
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
