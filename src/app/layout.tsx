import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Logo } from "@/components/shared/Logo";
import "@/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CapSurge — Rotating Services Cards (Isolated Demo)",
  description: "Standalone extraction of the rotating services carousel cards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body className="antialiased font-sans font-medium" suppressHydrationWarning>
        <header className="flex justify-center pt-6 pb-2" style={{ backgroundColor: "#f4f4f4" }}>
          <Logo />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
