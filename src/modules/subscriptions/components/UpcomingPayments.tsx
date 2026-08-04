"use client";

import { Subscription } from "@/src/modules/subscriptions/interfaces/subscriptionInterfaces";
import { WEEK_DAY_LABELS } from "@/src/modules/subscriptions/data/mockSubscriptions";
import { CreditCard, Clock, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpcomingPaymentsProps {
  subscriptions: Subscription[];
  currentDay: number;
  isCurrentMonth: boolean;
}

const CYCLE_LABEL: Record<string, string> = {
  weekly: "Semanal",
  monthly: "Mensual",
  yearly: "Anual",
};

function UpcomingPayments({
  subscriptions,
  currentDay,
  isCurrentMonth,
}: UpcomingPaymentsProps) {
  // Get upcoming subs (today or future in this month) sorted by next pay day
  const upcoming = subscriptions
    .filter((s) => {
      if (!isCurrentMonth) return true; // show all if not current month
      if (s.cycle === "weekly") return true; // weekly always has upcoming
      return s.payDay >= currentDay;
    })
    .sort((a, b) => {
      if (a.cycle === "weekly" && b.cycle !== "weekly") return -1;
      if (b.cycle === "weekly" && a.cycle !== "weekly") return 1;
      return a.payDay - b.payDay;
    })
    .slice(0, 6);

  if (upcoming.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="size-4 text-action" />
          <h3 className="text-sm font-bold text-foreground">Próximos a pagar</h3>
        </div>
        <p className="text-xs text-muted text-center py-3">
          No hay cobros pendientes este mes
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="size-4 text-action" />
        <h3 className="text-sm font-bold text-foreground">Próximos a pagar</h3>
      </div>

      <div className="space-y-2">
        {upcoming.map((sub) => {
          const daysUntil = isCurrentMonth && sub.cycle !== "weekly"
            ? sub.payDay - currentDay
            : null;

          return (
            <div
              key={sub.id}
              className="flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:border-action/30 transition-colors"
            >
              {/* Color avatar */}
              <div
                className="size-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ backgroundColor: sub.color }}
              >
                {sub.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {sub.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1 text-[11px] text-muted">
                    <Repeat className="size-3" />
                    {CYCLE_LABEL[sub.cycle]}
                  </span>
                  {sub.cycle === "weekly" && (
                    <span className="text-[11px] text-muted">
                      · Cada {WEEK_DAY_LABELS[sub.weekDay ?? 1]}
                    </span>
                  )}
                </div>
                {sub.cardLabel && (
                  <p className="flex items-center gap-1 text-[11px] text-muted mt-0.5">
                    <CreditCard className="size-3 shrink-0" />
                    <span className="truncate">{sub.cardLabel}</span>
                  </p>
                )}
              </div>

              {/* Amount + days remaining */}
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-primary tabular-nums">
                  ${sub.amount.toLocaleString("es-MX")}
                </p>
                {daysUntil !== null && (
                  <span
                    className={cn(
                      "text-[11px] font-medium",
                      daysUntil === 0
                        ? "text-action"
                        : daysUntil <= 3
                          ? "text-secondary"
                          : "text-muted",
                    )}
                  >
                    {daysUntil === 0 ? "Hoy" : `En ${daysUntil} días`}
                  </span>
                )}
                {sub.cycle === "weekly" && (
                  <span className="text-[11px] text-muted">/sem</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpcomingPayments;
