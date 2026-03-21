"use client";

import { useDashboardStats } from "@/src/modules/dashboard/hooks/useDashboardStats";
import StatCard from "@/src/modules/dashboard/components/stats/StatCard";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsGridProps {
  userId: string;
}

function StatsGrid({ userId }: StatsGridProps) {
  const {
    isLoading,
    monthlyPaymentCurrent,
    activeMovementsCount,
    accountsWithActiveCount,
    freeAccountsCount,
  } = useDashboardStats(userId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <StatCard
        title="Pago de este mes"
        value={monthlyPaymentCurrent.toLocaleString("es-CL")}
        isMoney={true}
      />
      <StatCard
        title="Movimientos activos"
        value={activeMovementsCount.toString()}
        isMoney={false}
      />
      <StatCard
        title="Cuentas con gastos"
        value={accountsWithActiveCount.toString()}
        isMoney={false}
      />
      <StatCard
        title="Cuentas libres"
        value={freeAccountsCount.toString()}
        isMoney={false}
      />
    </div>
  );
}

export default StatsGrid;
