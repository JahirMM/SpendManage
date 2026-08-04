"use client";

import { Subscription } from "@/src/modules/subscriptions/interfaces/subscriptionInterfaces";
import { WEEK_DAY_LABELS } from "@/src/modules/subscriptions/data/mockSubscriptions";
import { Star, CreditCard } from "lucide-react";

interface FavoriteSubscriptionsProps {
  favorites: Subscription[];
}

function FavoriteSubscriptions({ favorites }: FavoriteSubscriptionsProps) {
  if (favorites.length === 0) return null;

  return (
    <div className="rounded-2xl border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Star className="size-4 text-secondary fill-secondary" />
        <h3 className="text-sm font-bold text-foreground">Favoritas</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {favorites.map((sub) => (
          <div
            key={sub.id}
            className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border/60 hover:border-action/30 transition-colors"
          >
            {/* Color avatar */}
            <div
              className="size-11 rounded-xl flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: sub.color }}
            >
              {sub.name.charAt(0).toUpperCase()}
            </div>

            {/* Name */}
            <p className="text-xs font-semibold text-foreground text-center truncate w-full">
              {sub.name}
            </p>

            {/* Amount */}
            <p className="text-[11px] font-bold text-primary tabular-nums">
              ${sub.amount.toLocaleString("es-MX")}
              <span className="font-normal text-muted">
                /{sub.cycle === "weekly" ? "sem" : sub.cycle === "monthly" ? "mes" : "año"}
              </span>
            </p>

            {/* Card label */}
            {sub.cardLabel && (
              <p className="flex items-center gap-1 text-[10px] text-muted">
                <CreditCard className="size-2.5 shrink-0" />
                <span className="truncate">{sub.cardLabel}</span>
              </p>
            )}

            {/* Cycle detail */}
            <p className="text-[10px] text-muted">
              {sub.cycle === "weekly"
                ? `Cada ${WEEK_DAY_LABELS[sub.weekDay ?? 1]}`
                : `Día ${sub.payDay}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteSubscriptions;
