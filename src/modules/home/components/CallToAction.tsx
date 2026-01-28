import { Button } from "@/components/ui/button";

function CallToAction() {
  return (
    <section className="mb-10 space-y-4 text-center mt-30">
      <p className="text-3xl font-bold text-primary lg:text-5xl">Comienza a controlar tus gastos hoy</p>
      <p className="text-base">Únete y toma control de tus finanzas</p>
      <Button variant="default" size="lg" type="button">
        Comienza ahora
      </Button>
    </section>
  );
}

export default CallToAction;
