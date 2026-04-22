import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Last Mile Mediterranean — Tu Partner Logístico de Última Milla",
  description:
    "Partner logístico de última milla desde las Islas Baleares. Entregas refrigeradas, flota especializada y cobertura en todo el Mediterráneo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="antialiased">
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
