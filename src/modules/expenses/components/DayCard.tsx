"use client";

import { DailyExpense } from "@/src/modules/expenses/interfaces/expensesInterfaces";
import { CreditCard, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayCardProps {
  expense: DailyExpense;
  isToday: boolean;
  /** Which row in the grid (0-based). Used to flip tooltip direction */
  row?: number;
  onClick: () => void;
  onAddClick: () => void;
}

function DayCard({ expense, isToday, row = 0, onClick, onAddClick }: DayCardProps) {
  const total = expense.items.reduce((sum, item) => sum + item.amount, 0);
  const hasExpenses = expense.items.length > 0;

  // Show tooltip below if the day is in the first 2 rows (not enough room above)
  const tooltipBelow = row < 2;

  return (
    <div className="relative group">
      {/* ── Main card button ── */}
      <button
        type="button"
        onClick={onClick}
        aria-label={`Día ${expense.day}${hasExpenses ? `, $${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}` : ", sin gastos"}`}
        className={cn(
          "w-full aspect-square rounded-xl border text-left transition-all duration-200 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action",
          "active:scale-95 md:active:scale-100",
          "md:hover:shadow-md md:hover:border-action/50 md:hover:-translate-y-0.5",
          isToday
            ? "border-action bg-action/10"
            : hasExpenses
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
            {expense.day}
          </span>

          {hasExpenses && (
            <div className="mt-auto">
              <span className="text-[8px] sm:text-[10px] font-bold text-secondary leading-none tabular-nums">
                ${total.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
              </span>
            </div>
          )}
        </div>
      </button>

      {/* ── Add button ── */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAddClick();
        }}
        aria-label={`Agregar gasto el día ${expense.day}`}
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

      {/* ── Desktop hover tooltip ── */}
      {hasExpenses && (
        <div
          className={cn(
            "absolute z-50 left-1/2 -translate-x-1/2 w-52",
            "bg-popover border border-border rounded-xl shadow-lg p-3",
            "pointer-events-none select-none",
            "opacity-0 invisible",
            "md:group-hover:opacity-100 md:group-hover:visible",
            "transition-all duration-200",
            "max-h-60 overflow-y-auto",
            // Position: above or below depending on row
            tooltipBelow ? "top-full mt-2" : "bottom-full mb-2",
          )}
          role="tooltip"
        >
          {/* Arrow */}
          {tooltipBelow ? (
            <>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-[5px] border-transparent border-b-border" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[-3px] border-[5px] border-transparent border-b-popover" />
            </>
          ) : (
            <>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[5px] border-transparent border-t-border" />
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[3px] border-[5px] border-transparent border-t-popover" />
            </>
          )}

          <p className="text-xs font-bold text-primary mb-2">
            Día {expense.day}
          </p>

          <div className="space-y-2">
            {expense.items.map((item) => (
              <div key={item.id} className="flex items-start gap-1.5">
                <CreditCard className="size-3 text-action mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-muted truncate">
                    {item.card ?? "Sin cuenta"}
                  </p>
                </div>
                <span className="text-xs font-bold text-primary tabular-nums shrink-0 ml-1">
                  ${item.amount.toLocaleString("es-MX", {
                    maximumFractionDigits: 0,
                  })}
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

export default DayCard;
