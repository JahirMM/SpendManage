"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CreditCard, Wallet, Check, Loader2 } from "lucide-react";
import { AccountInterface } from "@/src/modules/dashboard/interfaces/accountInterface";
import { DailyExpenseItem } from "@/src/modules/expenses/interfaces/expensesInterfaces";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AssignAccountSheetProps {
  expense: DailyExpenseItem | null;
  accounts: AccountInterface[];
  open: boolean;
  isPending: boolean;
  onClose: () => void;
  onAssign: (expenseId: string, accountId: string) => void;
}

function AssignAccountSheet({
  expense,
  accounts,
  open,
  isPending,
  onClose,
  onAssign,
}: AssignAccountSheetProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    expense?.accountId ?? null,
  );

  const currentSelection = expense?.accountId ?? selectedId;

  const handleOpen = (isOpen: boolean) => {
    if (!isOpen && !isPending) {
      setSelectedId(null);
      onClose();
    }
  };

  const handleConfirm = () => {
    if (!expense || !selectedId) return;
    onAssign(expense.id, selectedId);
  };

  if (!expense) return null;

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[85dvh] flex flex-col">
        <SheetHeader className="pb-2">
          <SheetTitle className="text-base font-bold text-primary text-left">
            Asociar cuenta
          </SheetTitle>
          {/* Expense summary */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-accent/40 px-4 py-3 mt-1">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {expense.title}
              </p>
              <p className="text-xs text-muted mt-0.5">
                {expense.card ?? "Sin cuenta asignada"}
              </p>
            </div>
            <span className="text-sm font-bold text-primary tabular-nums ml-3 shrink-0">
              ${expense.amount.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </SheetHeader>

        {/* Account list */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2 min-h-0">
          <p className="text-xs text-muted px-0.5 mb-3">
            Selecciona la cuenta a la que quieres asociar este gasto
          </p>

          {accounts.length === 0 ? (
            <p className="text-sm text-muted text-center py-8">
              No tienes cuentas registradas
            </p>
          ) : (
            accounts.map((acc) => {
              const isSelected = (selectedId ?? currentSelection) === acc.id;
              return (
                <button
                  key={acc.id}
                  type="button"
                  disabled={isPending}
                  onClick={() => setSelectedId(acc.id)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-150",
                    "hover:border-action/60 hover:bg-action/5 disabled:opacity-50",
                    isSelected
                      ? "border-action bg-action/10"
                      : "border-border bg-card"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center size-9 rounded-full shrink-0 transition-colors",
                      isSelected
                        ? "bg-action text-white"
                        : "bg-muted/20 text-muted"
                    )}
                  >
                    {acc.type === "card" ? (
                      <CreditCard className="size-4" />
                    ) : (
                      <Wallet className="size-4" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {acc.title}
                    </p>
                    <p className="text-xs text-muted">
                      {acc.type === "card"
                        ? `Tarjeta · Pago día ${acc.payment_date}`
                        : "Cuenta simple"}
                    </p>
                  </div>

                  {isSelected && (
                    <Check className="size-4 text-action shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Actions */}
        <div className="pt-3 pb-6 grid grid-cols-2 gap-3 border-t border-border">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isPending}
            className="border border-border"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={handleConfirm}
            disabled={!selectedId || isPending}
            className="font-bold"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-1" />
                Asociando...
              </>
            ) : (
              "Asociar"
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AssignAccountSheet;
