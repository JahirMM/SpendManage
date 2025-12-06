import { LayoutDashboard, CreditCard, Wallet, FileBarChart } from "lucide-react";

function Features() {
  const data = [
    {
      title: "Dashboard Completo",
      description:
        "Visualiza todas tus métricas importantes: deuda total, movimientos activos, saldos, y otros datos clave de un vistazo.",
      icon: LayoutDashboard,
    },
    {
      title: "Cuentas",
      description:
        "Crea cuentas y configura las fechas de cierre y pago para cada una, asegurando un control preciso de tus compromisos.",
      icon: CreditCard,
    },
    {
      title: "Movimientos y Gastos",
      description:
        "Registra tus gastos a cuotas. El sistema calcula automáticamente cuánto has pagado y cuánto falta. Accede al historial completo de todos tus movimientos.",
      icon: Wallet,
    },
    {
      title: "Reportes",
      description:
        "Genera estados de cuenta mensuales automáticos. Revisa meses anteriores cuando lo necesites. Filtra el historial por movimientos activos o completados fácilmente.",
      icon: FileBarChart,
    },
  ];
  return (
    <section className="relative mt-40 bg-primary rounded-2xl md:bg-background-page">
        <div className="relative z-30 p-10">
          <div className="mb-10 space-y-2 text-center">
            <h2 className="text-sm tracking-widest uppercase text-secondary">
              características
            </h2>
            <p className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              Todo lo que necesitas para gestionar tus gastos
            </p>
            <p className="mx-auto text-sm max-w-80 text-muted md:w-full">
              Herramientas simples pero poderosas para llevar el control de tus
              deudas y pagos
            </p>
          </div>
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:flex-wrap sm:justify-center md:justify-between">
            {data.map((feature, index) => (
              <article
                key={index}
                className="bg-white shadow p-5 h-[252px] w-[255px] rounded-xl"
              >
                <span className="inline-block p-2 rounded-md bg-secondary">
                  <feature.icon className="text-white size-5" />
                </span>
                <p className="text-lg font-bold text-primary">
                  {feature.title}
                </p>
                <p className="text-sm">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="absolute rounded-2xl top-0 w-full bg-primary hidden sm:block md:h-[80%] xl:h-[70%]"></div>
    </section>
  );
}

export default Features;
