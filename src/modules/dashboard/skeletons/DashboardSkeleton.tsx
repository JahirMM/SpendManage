import { Skeleton } from "@/components/ui/skeleton";

function DashboardSkeleton() {
  return (
    <div className="max-w-5xl px-4 py-3 mx-auto md:max-w-7xl xl:p-0">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-7 w-52" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 gap-3 mt-5 lg:grid-cols-3">
        {/* Left Column */}
        <section className="flex flex-col gap-3">
          {/* TotalExpenseCard Skeleton */}
          <div className="rounded-xl border bg-card p-6">
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-9 w-44" />
          </div>

          {/* ExpensesChart Mobile Skeleton */}
          <div className="rounded-xl border bg-card p-6 h-96 lg:hidden">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>

          {/* AccountsSection Skeleton - ocupa todo el espacio restante */}
          <div className="rounded-xl border bg-card lg:flex lg:flex-col lg:flex-1">
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>

              {/* Cuenta Card */}
              <div className="rounded-xl border p-6 space-y-6 md:max-w-[60%] md:mx-auto lg:min-w-[260px]">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-16" />
                </div>

                <Skeleton className="h-7 w-32" />

                <div className="flex justify-between pt-4">
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-5 w-8" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-5 w-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom section - se empuja hacia abajo */}
            <div className="mt-auto px-6 pb-6">
              {/* Gasto actual */}
              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-16" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-20" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Ver detalles button */}
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </section>

        {/* Right Column */}
        <section className="space-y-3 md:grid md:grid-cols-2 md:gap-3 lg:col-start-2 lg:col-end-4 lg:space-y-0">
          <div className="space-y-3">
            {/* ReductionCard Skeleton */}
            <div className="rounded-xl border bg-card p-6">
              <Skeleton className="h-4 w-40 mb-3" />
              <Skeleton className="h-10 w-48 mb-4" />
              <Skeleton className="h-6 w-40 rounded-full" />
            </div>

            {/* StatsGrid Skeleton */}
            <div className="grid grid-cols-2 gap-3">
              {/* Pago de este mes */}
              <div className="rounded-xl border bg-card p-4">
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-7 w-24" />
              </div>

              {/* Movimientos activos */}
              <div className="rounded-xl border bg-card p-4">
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-7 w-12" />
              </div>

              {/* Cuentas con gastos */}
              <div className="rounded-xl border bg-card p-4">
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-7 w-8" />
              </div>

              {/* Cuentas libres */}
              <div className="rounded-xl border bg-card p-4">
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-7 w-8" />
              </div>
            </div>
          </div>

          {/* MovementsSection Skeleton */}
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-5 w-16" />
            </div>

            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="text-right space-y-1.5">
                    <Skeleton className="h-4 w-12 ml-auto" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ExpensesChart Desktop Skeleton */}
          <div className="hidden rounded-xl border bg-card p-6 h-96 col-start-1 col-end-3 lg:block">
            <Skeleton className="h-5 w-48 mb-4" />
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
