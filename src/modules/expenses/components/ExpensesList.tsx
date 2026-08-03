"use client";

import {
  DailyExpense,
  DailyExpenseItem,
} from "@/src/modules/expenses/interfaces/expensesInterfaces";
import { MONTHS_ES } from "@/src/modules/expenses/data/mockExpenses";
import {
  CreditCard,
  Wallet,
  Plus,
  LinkIcon,
  AlertCircle,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExpensesListProps {
  days: DailyExpense[];
  month: number;
  year: number;
  onAddExpense: () => void;
  /** Open assign-account sheet */
  onExpenseClick: (item: DailyExpenseItem) => void;
  /** Open edit-name sheet */
  onEditExpense: (item: DailyExpenseItem) => void;
}

function ExpensesList({
  days,
  month,
  year,
  onAddExpense,
  onExpenseClick,
  onEditExpense,
}: ExpensesListProps) {
  const allExpenses = days
    .filter((d) => d.items.length > 0)
    .flatMap((d) => d.items.map((item) => ({ ...item, day: d.day })))
    .sort((a, b) => a.day - b.day);

  const unassigned = allExpenses.filter((e) => !e.accountId).length;

  return (
    <div className="rounded-xl border bg-card">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-4 md:px-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-primary">Gastos</h2>
            {unassigned > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary/15 border border-secondary/30 px-2 py-0.5 text-[10px] font-bold text-secondary">
                <AlertCircle className="size-3" />
                {unassigned} sin cuenta
              </span>
            )}
          </div>
          <p className="text-xs text-muted mt-0.5">
            {MONTHS_ES[month - 1]} {year}
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="default"
          onClick={onAddExpense}
          className="gap-1.5 font-bold"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">Agregar gasto</span>
          <span className="sm:hidden">Agregar</span>
        </Button>
      </div>

      {/* ── Empty state ── */}
      {allExpenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="size-12 rounded-full bg-muted/20 flex items-center justify-center mb-3">
            <Wallet className="size-6 text-muted" />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">
            Sin gastos este mes
          </p>
          <p className="text-xs text-muted mb-4">
            Agrega tu primer gasto para empezar a registrar
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onAddExpense}
            className="gap-1.5"
          >
            <Plus className="size-4" />
            Agregar gasto
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {allExpenses.map((item, index) => {
            const isUnassigned = !item.accountId;
            const isCard =
              item.card?.toLowerCase().includes("crédito") ||
              item.card?.toLowerCase().includes("credito");

            const prevItem = allExpenses[index - 1];
            const showDayGroup =
              index === 0 || prevItem?.day !== item.day;

            return (
              <div key={item.id}>
                {/* Day group label */}
                {showDayGroup && (
                  <div className="px-4 md:px-6 py-2 bg-background-page/60">
                    <span className="text-[11px] font-bold text-muted uppercase tracking-wide">
                      {item.day} de {MONTHS_ES[month - 1]}
                    </span>
                  </div>
                )}

                {/* Expense row */}
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 md:px-6 py-3 transition-colors",
                    isUnassigned ? "hover:bg-secondary/5" : "hover:bg-accent/40",
                  )}
                >
                  {/* Icon — click opens assign sheet */}
                  <button
                    type="button"
                    onClick={() => onExpenseClick(item)}
                    aria-label="Asociar cuenta"
                    className={cn(
                      "flex items-center justify-center size-9 rounded-full shrink-0 transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action",
                      isUnassigned
                        ? "bg-secondary/15 border border-secondary/30 hover:bg-secondary/25"
                        : "bg-action/10 hover:bg-action/20",
                    )}
                  >
                    {isUnassigned ? (
                      <LinkIcon className="size-4 text-secondary" />
                    ) : isCard ? (
                      <CreditCard className="size-4 text-action" />
                    ) : (
                      <Wallet className="size-4 text-action" />
                    )}
                  </button>

                  {/* Info — click opens assign sheet */}
                  <button
                    type="button"
                    onClick={() => onExpenseClick(item)}
                    className="flex-1 min-w-0 text-left focus-visible:outline-none"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate leading-tight">
                        {item.title}
                      </p>
                      {isUnassigned && (
                        <span className="shrink-0 inline-flex items-center rounded-full bg-secondary/15 border border-secondary/30 px-1.5 py-0.5 text-[9px] font-bold text-secondary uppercase tracking-wide">
                          Sin cuenta
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted truncate">
                      {item.card ?? "Toca para asociar a una cuenta"}
                    </p>
                  </button>

                  {/* Amount */}
                  <span
                    className={cn(
                      "text-sm font-bold tabular-nums shrink-0",
                      isUnassigned ? "text-secondary" : "text-primary",
                    )}
                  >
                    ${item.amount.toLocaleString("es-MX", {
                      minimumFractionDigits: 2,
                    })}
                  </span>

                  {/* Edit button */}
                  <button
                    type="button"
                    onClick={() => onEditExpense(item)}
                    aria-label="Editar gasto"
                    className={cn(
                      "flex items-center justify-center size-7 rounded-lg shrink-0 transition-colors",
                      "text-muted hover:text-foreground hover:bg-accent",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action",
                    )}
                  >
                    <Pencil className="size-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ExpensesList;
