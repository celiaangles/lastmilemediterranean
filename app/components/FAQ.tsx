"use client";

import { useState } from "react";
import { PlusIcon, MinusIcon } from "./icons";

type Item = { question: string; answer: string };
type Props = {
  heading?: string;
  items?: Item[];
};

const defaultItems: Item[] = [
  {
    question: "¿En qué zonas de España operáis?",
    answer:
      "Nuestra base principal está en Mallorca, pero operamos en toda la geografía española incluyendo Madrid, Alicante, Cádiz y otras ciudades de la península. También cubrimos el resto de las Islas Baleares y conexiones inter islas.",
  },
  {
    question: "¿Qué tipo de vehículos utilizáis para el transporte refrigerado?",
    answer:
      "Contamos con una flota de más de 250 vehículos equipados con sistemas de refrigeración y congelación profesionales, incluyendo furgonetas Renault Maxity y otros modelos adaptados a cada tipo de carga y volumen de mercancía.",
  },
  {
    question: "¿Cómo garantizáis la cadena de frío durante el transporte?",
    answer:
      "Todos nuestros vehículos cuentan con sistemas de monitorización de temperatura en tiempo real. Realizamos controles de temperatura en origen, tránsito y destino, y emitimos registros para garantizar la trazabilidad completa del envío.",
  },
  {
    question: "¿Ofrecéis servicio urgente o entregas en el mismo día?",
    answer:
      "Sí, ofrecemos servicios express y entregas same day en determinadas rutas y zonas. Contacta con nuestro equipo comercial para consultar disponibilidad según tu ubicación y necesidades específicas.",
  },
  {
    question: "¿Qué documentación necesito para contratar vuestros servicios?",
    answer:
      "Para empresas: CIF, datos de facturación y descripción de la mercancía a transportar. Para el primer envío, nuestro equipo te guiará en el proceso y te ayudará a configurar tu cuenta de cliente en pocos minutos.",
  },
  {
    question: "¿Hacéis transporte de productos con certificación ecológica u orgánica?",
    answer:
      "Absolutamente. Trabajamos con numerosos productores y distribuidores de producto ecológico, garantizando la separación y el cuidado especial que estos productos requieren durante todo el proceso logístico.",
  },
  {
    question: "¿Puedo hacer seguimiento de mi envío en tiempo real?",
    answer:
      "Sí, proporcionamos sistemas de tracking para que puedas monitorizar el estado de tu envío. Nuestro equipo también está disponible para resolver cualquier duda o proporcionar actualizaciones durante el tránsito.",
  },
];

export function FAQ({ heading = "Preguntas Frecuentes", items }: Props) {
  const list = items && items.length > 0 ? items : defaultItems;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-[var(--brand-blue)] text-white">
      <div className="container-x py-20 md:py-24">
        <h2 className="text-3xl md:text-[44px] font-semibold leading-tight tracking-tight mb-10">
          {heading}
        </h2>
        <div className="space-y-2.5">
          {list.map((item, i) => {
            const open = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-xl bg-white/10 backdrop-blur-[2px] border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 text-left"
                  aria-expanded={open}
                >
                  <span className="text-[15px] md:text-base font-medium">
                    {item.question}
                  </span>
                  {open ? (
                    <MinusIcon className="flex-shrink-0" />
                  ) : (
                    <PlusIcon className="flex-shrink-0" />
                  )}
                </button>
                {open && (
                  <div className="px-5 md:px-6 pb-5 pt-0">
                    <p className="text-[13px] md:text-sm text-white/90 leading-relaxed max-w-3xl">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
