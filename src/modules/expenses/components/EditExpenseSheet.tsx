"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { DailyExpenseItem } from "@/src/modules/expenses/interfaces/expensesInterfaces";

export interface EditExpenseValues {
  name?: string;
  count?: number;
}

interface EditExpenseSheetProps {
  expense: DailyExpenseItem | null;
  open: boolean;
  isPending: boolean;
  onClose: () => void;
  onSave: (expenseId: string, values: EditExpenseValues) => void;
}

function EditExpenseSheet({
  expense,
  open,
  isPending,
  onClose,
  onSave,
}: EditExpenseSheetProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync when expense changes
  useEffect(() => {
    if (expense) {
      setName(expense.title);
      setAmount(String(expense.amount));
      setErrors({});
    }
  }, [expense]);

  const handleOpen = (isOpen: boolean) => {
    if (!isOpen && !isPending) {
      setErrors({});
      onClose();
    }
  };

  const handleSave = () => {
    if (!expense) return;

    const nextErrors: Record<string, string> = {};

    if (!name.trim() && !amount.trim()) {
      nextErrors.name = "Cambia al menos un campo";
      setErrors(nextErrors);
      return;
    }

    if (name.trim() && name.trim().length < 1) {
      nextErrors.name = "La descripción no puede estar vacía";
    }

    const parsedAmount = parseFloat(amount);
    if (amount.trim() && (isNaN(parsedAmount) || parsedAmount <= 0)) {
      nextErrors.amount = "Ingresa un monto válido mayor a 0";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // Build payload — only include changed fields
    const values: EditExpenseValues = {};

    if (name.trim() && name.trim() !== expense.title) {
      values.name = name.trim();
    }

    if (parsedAmount && parsedAmount !== expense.amount) {
      values.count = Math.round(parsedAmount);
    }

    // If nothing actually changed, just close
    if (!values.name && !values.count) {
      onClose();
      return;
    }

    onSave(expense.id, values);
  };

  if (!expense) return null;

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent side="bottom" className="rounded-t-2xl flex flex-col">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-base font-bold text-primary text-left">
            Editar gasto
          </SheetTitle>

          {/* Current info chip */}
          <div className="flex items-center gap-3 rounded-xl border border-border bg-accent/40 px-4 py-2.5 mt-1">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted">Actual</p>
              <p className="text-sm font-semibold text-foreground truncate">
                {expense.title}
              </p>
            </div>
            <span className="text-sm font-bold text-primary tabular-nums shrink-0">
              ${expense.amount.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </SheetHeader>

        <div className="space-y-4 flex-1 py-2">
          {/* Name field */}
          <div className="grid gap-1.5">
            <Label htmlFor="edit-name">Descripción</Label>
            <Input
              id="edit-name"
              value={name}
              autoFocus
              onChange={(e) => {
                setName(e.target.value);
                setErrors((p) => ({ ...p, name: "" }));
              }}
              placeholder="Ej. Compras del super"
              className="py-5 text-sm"
              disabled={isPending}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Amount field */}
          <div className="grid gap-1.5">
            <Label htmlFor="edit-amount">Monto ($)</Label>
            <Input
              id="edit-amount"
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setErrors((p) => ({ ...p, amount: "" }));
              }}
              placeholder="0"
              className="py-5 text-sm"
              disabled={isPending}
            />
            {errors.amount && (
              <p className="text-xs text-destructive">{errors.amount}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 pb-6 grid grid-cols-2 gap-3 border-t border-border mt-2">
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
            onClick={handleSave}
            disabled={isPending}
            className="font-bold"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-1" />
                Guardando...
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default EditExpenseSheet;
