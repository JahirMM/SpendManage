"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DailyExpense } from "@/src/modules/expenses/interfaces/expensesInterfaces";
import { MONTHS_ES } from "@/src/modules/expenses/data/mockExpenses";
import { CreditCard, Wallet } from "lucide-react";

interface DayExpenseModalProps {
  expense: DailyExpense | null;
  month: number;
  year: number;
  open: boolean;
  onClose: () => void;
}

function DayExpenseModal({ expense, month, year, open, onClose }: DayExpenseModalProps) {
  if (!expense) return null;

  const total = expense.items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-primary">
            {expense.day} de {MONTHS_ES[month - 1]} {year}
          </DialogTitle>
        </DialogHeader>

        {expense.items.length === 0 ? (
          <p className="text-sm text-muted py-4 text-center">Sin gastos este día</p>
        ) : (
          <div className="space-y-3 mt-1">
            {expense.items.map((item) => {
              const isCard =
                item.card?.toLowerCase().includes("crédito") ||
                item.card?.toLowerCase().includes("credito");
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex items-center justify-center size-7 rounded-full bg-action/10 shrink-0 mt-0.5">
                      {isCard ? (
                        <CreditCard className="size-3.5 text-action" />
                      ) : (
                        <Wallet className="size-3.5 text-action" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-tight">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted">{item.card ?? "Sin cuenta"}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary tabular-nums ml-2 shrink-0">
                    ${item.amount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              );
            })}

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-semibold text-foreground">Total del día</span>
              <span className="text-base font-bold text-secondary">
                ${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DayExpenseModal;
