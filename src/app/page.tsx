import { ServicesCarousel } from "@/components/modules/ServicesCarousel";

export default function Home() {
  return (
    // The cards are built for a dark surface (white/5 fills, white text),
    // so the demo page reproduces the deep-navy background they sit on.
    <section className="min-h-screen bg-primary flex items-center py-8 md:py-10">
      <div className="container-custom w-full">
        <ServicesCarousel />
      </div>
    </section>
  );
}
