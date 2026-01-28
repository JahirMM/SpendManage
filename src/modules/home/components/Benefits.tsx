import { Wallet } from "lucide-react";

function Benefits() {
  const data = [
    {
      title: "Vsualización clara",
      description:
        "Gráficos e indicadores que te muestran exactamente dónde estás.",
      icon: Wallet,
    },
    {
      title: "Gratuito",
      description: "Sin costos ocultos. Todas las funciones gratis.",
      icon: Wallet,
    },
    {
      title: "Fácil de Usar",
      description:
        "Interface intuitiva y claras. Empieza a usarlo en segundos.",
      icon: Wallet,
    },
  ];
  return (
    <section className="grid grid-cols-1 gap-4 p-5 mt-40 bg-primary rounded-2xl md:grid-cols-2 lg:px-14">
      <div>
        <div className="mb-8">
          <p className="mb-4 text-sm font-bold tracking-widest uppercase text-secondary">
            Beneficios
          </p>
          <h2 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            ¿Por qué usar FinanzApp?
          </h2>
        </div>
        <div className="space-y-4">
          {data.map((benefit, index) => (
            <article key={index}>
              <span className="inline-block p-1 rounded-md bg-secondary">
                <benefit.icon className="text-white size-4" />
              </span>
              <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
              <p className="text-sm text-muted">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="h-[452px] w-[352px] rounded-xl bg-blue-400">
            <img src="/images/home/account.png" alt="Lista de cuentas que el usuario puede crear" className="w-full h-full rounded-xl" />
        </div>
      </div>
    </section>
  );
}

export default Benefits;
