import { ServicesCarousel } from "@/components/modules/ServicesCarousel";

export default function Home() {
  return (
    <section className="flex min-h-screen items-center bg-primary pb-12 pt-0 md:pb-16 md:pt-0 lg:pt-0">
      <div className="container-custom w-full">
        <ServicesCarousel />
      </div>
    </section>
  );
}
