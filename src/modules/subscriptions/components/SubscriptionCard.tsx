"use client";

import { Subscription } from "@/src/modules/subscriptions/interfaces/subscriptionInterfaces";
import { CATEGORY_LABELS, WEEK_DAY_LABELS } from "@/src/modules/subscriptions/data/mockSubscriptions";
import { CreditCard, Calendar, MoreVertical, Pause, Trash2, Pencil, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SubscriptionCardProps {
  subscription: Subscription;
  isNextPayment?: boolean;
  currentDay?: number;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (subscription: Subscription) => void;
  onToggleFavorite: (id: string) => void;
}

function SubscriptionCard({
  subscription,
  isNextPayment = false,
  currentDay = 0,
  onToggle,
  onRemove,
  onEdit,
  onToggleFavorite,
}: SubscriptionCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const daysUntilPayment = subscription.payDay >= currentDay
    ? subscription.payDay - currentDay
    : 0;

  const isPast = subscription.payDay < currentDay;

  return (
    <div
      className={cn(
        "group relative rounded-2xl border bg-card transition-all duration-200",
        "hover:shadow-lg hover:-translate-y-1",
        isNextPayment && "ring-2 ring-action/40 shadow-md",
        !subscription.active && "opacity-60",
      )}
    >
      {/* Color accent bar */}
      <div
        className="h-1.5 w-full rounded-t-2xl"
        style={{ backgroundColor: subscription.color }}
      />

      <div className="p-4 sm:p-5">
        {/* Top row: name + menu */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            {/* Icon circle */}
            <div
              className="size-10 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-sm"
              style={{ backgroundColor: subscription.color }}
            >
              {subscription.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-foreground truncate">
                {subscription.name}
                {subscription.favorite && (
                  <Star className="inline size-3 ml-1 text-secondary fill-secondary -mt-0.5" />
                )}
              </h3>
              <span className="text-xs text-muted">
                {CATEGORY_LABELS[subscription.category] ?? "Otro"}
              </span>
              {/* Card label below name */}
              {subscription.cardLabel && (
                <p className="flex items-center gap-1 text-[11px] text-muted mt-0.5">
                  <CreditCard className="size-3 shrink-0" />
                  <span className="truncate">{subscription.cardLabel}</span>
                </p>
              )}
            </div>
          </div>

          {/* Context menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="size-7 rounded-lg flex items-center justify-center text-muted hover:bg-accent transition-colors cursor-pointer"
              aria-label="Opciones"
            >
              <MoreVertical className="size-4" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-8 z-100 w-40 rounded-xl border bg-popover shadow-lg p-1.5">
                  <button
                    type="button"
                    onClick={() => { onEdit(subscription); setMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs rounded-lg hover:bg-accent transition-colors text-left cursor-pointer"
                  >
                    <Pencil className="size-3.5" />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => { onToggleFavorite(subscription.id); setMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs rounded-lg hover:bg-accent transition-colors text-left cursor-pointer"
                  >
                    <Star className={cn("size-3.5", subscription.favorite && "fill-secondary text-secondary")} />
                    {subscription.favorite ? "Quitar favorita" : "Marcar favorita"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { onToggle(subscription.id); setMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs rounded-lg hover:bg-accent transition-colors text-left cursor-pointer"
                  >
                    <Pause className="size-3.5" />
                    {subscription.active ? "Pausar" : "Activar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { onRemove(subscription.id); setMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs rounded-lg hover:bg-destructive/10 text-destructive transition-colors text-left cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Amount */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary tabular-nums">
            ${subscription.amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-xs text-muted">
            /{subscription.cycle === "monthly" ? "mes" : subscription.cycle === "weekly" ? "sem" : "año"}
          </span>
        </div>

        {/* Footer: date info */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <Calendar className="size-3.5" />
          {subscription.cycle === "weekly" ? (
            <span>
              Cada{" "}
              <span className="font-semibold text-foreground">
                {WEEK_DAY_LABELS[subscription.weekDay ?? 1]}
              </span>
            </span>
          ) : (
            <span>
              {isPast ? "Pagado día" : daysUntilPayment === 0 ? "Hoy" : `En ${daysUntilPayment} días`}
              {" "}
              <span className="font-semibold text-foreground">{subscription.payDay}</span>
            </span>
          )}
        </div>

        {/* Next payment badge */}
        {isNextPayment && (
          <div className="mt-3 px-2.5 py-1 rounded-lg bg-action/10 text-action text-[11px] font-semibold inline-flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-action animate-pulse" />
            Próximo cobro
          </div>
        )}
      </div>
    </div>
  );
}

export default SubscriptionCard;
