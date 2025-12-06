import { ChevronsRight } from "lucide-react";
import React from "react";

function HowItWorks() {
  const data = [
    {
      id: 1,
      title: "Crea tu cuenta",
      description:
        "Regístrate gratis en menos de un minuto y accede a todas las funcionalidades.",
    },
    {
      id: 2,
      title: "Agrega tus cuentas",
      description: "Registra tus gatos que deseas monitorear.",
    },
    {
      id: 3,
      title: "Controla tus gastos",
      description:
        "Visualiza tus estadísticas, registra movimientos y toma mejores decisiones.",
    },
  ];

  return (
    <section className="mt-40">
      <div className="space-y-2 text-center mb-14">
        <p className="text-sm font-bold tracking-widest uppercase text-secondary">
          CÓMO FUNCIONA
        </p>
        <h2 className="text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
          Tres pasos para controlar tus gastos
        </h2>
      </div>

      {/* Mobile/Tablet: columna simple */}
      <div className="flex flex-col gap-8 text-center lg:hidden">
        {data.map((item, index) => (
          <React.Fragment key={item.id}>
            <article key={item.id} className="space-y-3">
              <span className="block text-3xl font-bold text-secondary">
                {item.id}
              </span>
              <h3 className="text-lg font-semibold text-primary">
                {item.title}
              </h3>
              <p className="mx-auto text-sm max-w-60 text-muted">
                {item.description}
              </p>
            </article>
            {index !== data.length - 1 && (
              <div className="flex items-center self-center">
                <span className="rounded-full size-1.5 bg-primary"></span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Desktop (lg+): grid horizontal alineado */}
      <div
        className="items-start justify-center hidden gap-10 text-center lg:grid"
        style={{
          gridTemplateColumns: `repeat(${data.length * 2 - 1}, auto)`,
        }}
      >
        {data.map((item, index) => (
          <React.Fragment key={item.id}>
            <article className="grid gap-3 grid-rows-[auto_auto_1fr]">
              <span className="text-3xl font-bold text-secondary">
                {item.id}
              </span>
              <h3 className="text-lg font-semibold text-primary">
                {item.title}
              </h3>
              <p className="mx-auto text-sm max-w-60 text-muted">
                {item.description}
              </p>
            </article>
            {index !== data.length - 1 && (
              <div className="flex items-center self-center">
                <ChevronsRight className="size-5 text-primary" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
