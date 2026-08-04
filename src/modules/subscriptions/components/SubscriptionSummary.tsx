"use client";

import { Repeat, CreditCard } from "lucide-react";

interface SubscriptionSummaryProps {
  activeCount: number;
  totalMonthly: number;
}

function SubscriptionSummary({
  activeCount,
  totalMonthly,
}: SubscriptionSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Active subscriptions */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-8 rounded-xl bg-action/10 flex items-center justify-center">
            <Repeat className="size-4 text-action" />
          </div>
        </div>
        <p className="text-2xl font-bold text-primary tabular-nums">
          {activeCount}
        </p>
        <span className="text-xs text-muted">Suscripciones activas</span>
      </div>

      {/* Monthly total */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-8 rounded-xl bg-secondary/10 flex items-center justify-center">
            <CreditCard className="size-4 text-secondary" />
          </div>
        </div>
        <p className="text-2xl font-bold text-primary tabular-nums">
          ${totalMonthly.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
        </p>
        <span className="text-xs text-muted">Total este mes</span>
      </div>
    </div>
  );
}

export default SubscriptionSummary;
