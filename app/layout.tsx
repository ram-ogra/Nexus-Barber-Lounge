import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus Barber Lounge | Premium Grooming — Jhotwara, Jaipur",
  description:
    "Jaipur's finest barbershop experience. Premium haircuts, beard styling, and grooming at Nexus Barber Lounge, Jhotwara.",
  keywords: "barber jaipur, haircut jhotwara, beard styling jaipur, best barber jaipur",
  openGraph: {
    title: "Nexus Barber Lounge",
    description: "Premium grooming. Elevated experience. Jhotwara, Jaipur.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
