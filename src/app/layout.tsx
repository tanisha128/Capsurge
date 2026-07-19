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
  description: "Standalone extraction of the Navbar and the rotating services carousel cards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body className="antialiased font-sans font-medium" suppressHydrationWarning>
        <header className="sticky top-0 z-50 border-b border-surface-dim bg-white">
          <div className="container-custom flex h-16 items-center justify-center md:h-20">
            <Logo />
          </div>
        </header>
        <main className="pt-0">{children}</main>
      </body>
    </html>
  );
}
