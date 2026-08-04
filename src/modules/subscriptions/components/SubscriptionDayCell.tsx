"use client";

import { DaySubscription } from "@/src/modules/subscriptions/hooks/useSubscriptions";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscriptionDayCellProps {
  dayData: DaySubscription;
  isToday: boolean;
  row: number;
  onClick: () => void;
  onAddClick: () => void;
}

function SubscriptionDayCell({
  dayData,
  isToday,
  row,
  onClick,
  onAddClick,
}: SubscriptionDayCellProps) {
  const hasSubs = dayData.subscriptions.length > 0;
  const total = dayData.subscriptions.reduce((sum, s) => sum + s.amount, 0);
  const tooltipBelow = row < 2;

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={onClick}
        aria-label={`Día ${dayData.day}${hasSubs ? `, ${dayData.subscriptions.length} suscripción(es)` : ", sin cobros"}`}
        className={cn(
          "w-full aspect-square rounded-xl border text-left transition-all duration-200 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action",
          "active:scale-95 md:active:scale-100",
          "md:hover:shadow-md md:hover:border-action/50 md:hover:-translate-y-0.5",
          isToday
            ? "border-action bg-action/10"
            : hasSubs
              ? "border-border bg-card"
              : "border-dashed border-border/60 bg-card/40",
        )}
      >
        <div className="flex flex-col h-full p-1.5 sm:p-2">
          <span
            className={cn(
              "text-[10px] sm:text-xs font-bold leading-none",
              isToday ? "text-action" : "text-foreground",
            )}
          >
            {dayData.day}
          </span>

          {/* Color dots showing which subscriptions are on this day */}
          {hasSubs && (
            <div className="mt-auto flex flex-wrap gap-0.5">
              {dayData.subscriptions.slice(0, 4).map((sub) => (
                <div
                  key={sub.id + dayData.day}
                  className="size-1.5 sm:size-2 rounded-full"
                  style={{ backgroundColor: sub.color }}
                  title={sub.name}
                />
              ))}
              {dayData.subscriptions.length > 4 && (
                <span className="text-[7px] sm:text-[8px] text-muted font-bold leading-none ml-0.5">
                  +{dayData.subscriptions.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </button>

      {/* Add button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAddClick();
        }}
        aria-label={`Agregar suscripción el día ${dayData.day}`}
        className={cn(
          "absolute top-0.5 right-0.5 size-4 sm:size-5 rounded-md",
          "flex items-center justify-center",
          "bg-action/80 text-white",
          "transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action",
          "opacity-0 scale-75 md:group-hover:opacity-100 md:group-hover:scale-100",
          "opacity-100 scale-100 md:opacity-0 md:scale-75",
        )}
      >
        <Plus className="size-2.5 sm:size-3" />
      </button>

      {/* Tooltip on hover (desktop) */}
      {hasSubs && (
        <div
          className={cn(
            "absolute z-50 left-1/2 -translate-x-1/2 w-48",
            "bg-popover border border-border rounded-xl shadow-lg p-3",
            "pointer-events-none select-none",
            "opacity-0 invisible",
            "md:group-hover:opacity-100 md:group-hover:visible",
            "transition-all duration-200",
            tooltipBelow ? "top-full mt-2" : "bottom-full mb-2",
          )}
          role="tooltip"
        >
          <p className="text-xs font-bold text-primary mb-2">
            Día {dayData.day}
          </p>
          <div className="space-y-1.5">
            {dayData.subscriptions.map((sub) => (
              <div key={sub.id + dayData.day} className="flex items-center gap-2">
                <div
                  className="size-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: sub.color }}
                />
                <span className="text-xs text-foreground truncate flex-1">
                  {sub.name}
                </span>
                <span className="text-[10px] font-bold text-primary tabular-nums">
                  ${sub.amount.toLocaleString("es-MX")}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-border flex justify-between items-center">
            <span className="text-[10px] text-muted">Total</span>
            <span className="text-xs font-bold text-secondary tabular-nums">
              ${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscriptionDayCell;
