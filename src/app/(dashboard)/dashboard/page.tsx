import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
  Plus,
} from "lucide-react";

function page() {
  return (
    <div className="max-w-5xl px-4 mx-auto md:max-w-7xl xl:p-0">
      <header className="flex flex-wrap justify-between gap-0-5 items-center pt-8 pb-6 md:pt-12 md:pb-4">
        <p className="text-xl">
          Bienvenido de nuevo, <span className="font-bold">Jahir</span>
        </p>
        <Button type="button" size="sm" variant="default">
          Cerrar sesión
        </Button>
      </header>
      <section className="grid grid-cols-1 gap-3 mt-5 lg:grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="p-4 bg-white shadow rounded-2xl md:p-5">
            <p className="mb-2 text-base font-bold text-primary">Gasto toal</p>
            <div>
              <span className="mr-1 text-base font-semibold">$</span>
              <span className="text-2xl font-bold md:text-[28px]">
                92.000,32
              </span>
            </div>
          </div>

          {/* SOLO MOBILE */}
          <div className="p-4 bg-white shadow rounded-2xl h-96 lg:hidden">
            <p className="mb-2 text-base font-bold text-primary">
              Gastos totales último meses
            </p>
          </div>

          {/* CUENTA */}
          <div className="p-4 bg-white shadow rounded-2xl md:p-5 lg:h-full lg:flex lg:flex-col lg:justify-between">
            <div className="flex justify-between mb-5">
              <span className="text-base font-bold text-primary">Cuentas</span>
              <a href="" className="flex items-center text-sm text-action">
                <Plus className="size-4" /> Agregar
              </a>
            </div>
            {/* TARJETA */}
            <article className="p-4 flex flex-col justify-between bg-linear-to-br from-[#023048] to-[#023048]/90 rounded-xl md:max-w-[60%] md:mx-auto lg:min-w-[260px] lg:h-[358px] lg:p-3">
              <div className="flex justify-between">
                <span className="text-muted">Tarjeta</span>
                <CreditCard className="text-white size-5" />
              </div>
              <p className="mt-3 mb-8 text-lg text-white font-bold md:text-xl">
                Cuenta de lider
              </p>
              <div className="flex justify-between">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm text-muted">Cierre día</span>
                  <span className="text-sm font-bold text-white">26</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm text-muted">Pago día</span>
                  <span className="text-sm font-bold text-white">05</span>
                </div>
              </div>
            </article>

            <div className="flex items-center justify-between mt-8">
              <div>
                <span className="text-base">Gasto</span>
                <div>
                  <span className="mr-1 text-sm font-semibold">$</span>
                  <span className="text-lg font-bold md:text-2xl">
                    92.000,32
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" className="cursor-pointer">
                  <ChevronLeft className="text-black size-5" />
                </button>
                <button type="button" className="cursor-pointer">
                  <ChevronRight className="text-black size-5" />
                </button>
              </div>
            </div>

            <Button className="w-full mt-6" variant="default">
              Ver detalles
            </Button>
          </div>
        </div>

        {/* DATOS */}
        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 lg:col-start-2 lg:col-end-4 lg:space-y-0">
          {/* COLUMNA 1 - Ocupa toda la altura */}
          <div className="space-y-3">
            {/* Reducción vs mes pasado */}
            <div className="p-4 bg-primary rounded-2xl md:p-5">
              <p className="mb-2 text-base text-muted">
                Reducción vs mes pasado
              </p>
              <div className="text-white">
                <span className="mr-1 text-base font-semibold">$</span>
                <span className="text-2xl font-bold md:text-[28px]">
                  300.000,00
                </span>
              </div>
              <div className="mt-5 space-x-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-1 font-bold text-black rounded-lg bg-secondary">
                  <Plus className="size-3" /> 50.000,00
                </span>
                <span className="text-muted">vs mes anterior</span>
              </div>
            </div>

            {/* Grid de 4 tarjetas */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="p-4 bg-white shadow rounded-2xl">
                <p className="text-base font-bold text-muted">
                  Pago de este mes
                </p>
                <div className="mt-2">
                  <span className="mr-1 text-sm font-semibold">$</span>
                  <span className="text-lg font-bold">92.435,00</span>
                </div>
              </div>

              <div className="p-4 bg-white shadow rounded-2xl">
                <p className="mb-2 text-base font-bold text-muted">
                  Movimientos activos
                </p>
                <span className="text-lg font-bold">23</span>
              </div>

              <div className="p-4 bg-white shadow rounded-2xl">
                <p className="mb-2 text-base font-bold text-muted">
                  Cuentas con gastos
                </p>
                <span className="text-lg font-bold">4</span>
              </div>

              <div className="p-4 bg-white shadow rounded-2xl">
                <p className="mb-2 text-base font-bold text-muted">
                  Cuentas libres
                </p>
                <span className="text-lg font-bold">0</span>
              </div>
            </div>
          </div>

          {/* COLUMNA 2 - Movimientos */}
          <div className="p-4 bg-white shadow rounded-2xl md:p-5">
            <div className="flex justify-between mb-5">
              <span className="text-base font-bold text-primary">
                Ultimos movimientos
              </span>
              <a href="" className="text-sm font-bold text-action">
                Todos
              </a>
            </div>

            <div className="max-h-[276px] space-y-3 overflow-y-auto">
              <div className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <div className="flex items-start gap-1">
                  <span className="inline-block p-1 rounded-sm bg-secondary">
                    <DollarSign className="text-black size-4" />
                  </span>
                  <div>
                    <p className="text-sm text-black">Supermercado</p>
                    <span className="text-xs text-muted">
                      20 Nov 2024, 08:00
                    </span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-sm">1/4</span>
                </div>
                <div>
                  <span className="text-sm text-black">-$5.000,00</span>
                </div>
              </div>
              <div className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-gray-50">
                <div className="flex items-start gap-1">
                  <span className="inline-block p-1 rounded-sm bg-secondary">
                    <DollarSign className="text-black size-4" />
                  </span>
                  <div>
                    <p className="text-sm text-black">Supermercado</p>
                    <span className="text-xs text-muted">
                      20 Nov 2024, 08:00
                    </span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-sm">1/4</span>
                </div>
                <div>
                  <span className="text-sm text-black">-$5.000,00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico (solo desktop) */}
          <div className="hidden p-4 bg-white shadow rounded-2xl h-96 col-start-1 col-end-3 md:p-5 lg:block">
            <p className="mb-2 text-base font-bold text-primary">
              Gastos totales último meses
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
