"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet, Check, Loader2 } from "lucide-react";
import { AccountInterface } from "@/src/modules/dashboard/interfaces/accountInterface";
import { cn } from "@/lib/utils";

export interface AddExpenseFormValues {
  title: string;
  commerce: string;
  amount: number;
  day: number;
  month: number;
  year: number;
  accountId: string | null;
}

interface AddExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  accounts: AccountInterface[];
  /** Pre-filled date when opening from a day card click */
  defaultDay: number;
  defaultMonth: number;
  defaultYear: number;
  isPending: boolean;
  onAdd: (values: AddExpenseFormValues) => void;
}

/** Pad to 2 digits */
const pad = (n: number) => String(n).padStart(2, "0");

/** yyyy-MM-dd string for <input type="date"> */
const toInputDate = (day: number, month: number, year: number) =>
  `${year}-${pad(month)}-${pad(day)}`;

/** Parse yyyy-MM-dd → { day, month, year } */
const fromInputDate = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return { day: d, month: m, year: y };
};

function AddExpenseDialog({
  open,
  onClose,
  accounts,
  defaultDay,
  defaultMonth,
  defaultYear,
  isPending,
  onAdd,
}: AddExpenseDialogProps) {
  const [title, setTitle] = useState("");
  const [commerce, setCommerce] = useState("");
  const [amount, setAmount] = useState("");
  const [dateStr, setDateStr] = useState(
    toInputDate(defaultDay, defaultMonth, defaultYear),
  );
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    accounts[0]?.id ?? null,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync date input when the default changes (e.g. clicking a different day)
  useEffect(() => {
    setDateStr(toInputDate(defaultDay, defaultMonth, defaultYear));
  }, [defaultDay, defaultMonth, defaultYear]);

  const validate = (): Record<string, string> => {
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = "La descripción es requerida";
    const amt = parseFloat(amount);
    if (!amount || isNaN(amt) || amt <= 0)
      next.amount = "Ingresa un monto válido mayor a 0";
    if (!dateStr) next.date = "La fecha es requerida";
    return next;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const { day, month, year } = fromInputDate(dateStr);
    onAdd({
      title: title.trim(),
      commerce: commerce.trim() || title.trim(),
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      day,
      month,
      year,
      accountId: selectedAccountId,
    });
  };

  const handleClose = () => {
    if (isPending) return;
    setTitle("");
    setCommerce("");
    setAmount("");
    setDateStr(toInputDate(defaultDay, defaultMonth, defaultYear));
    setSelectedAccountId(accounts[0]?.id ?? null);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-primary">
            Agregar gasto
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-1">
          {/* Description */}
          <div className="grid gap-1.5">
            <Label htmlFor="exp-title">Descripción</Label>
            <Input
              id="exp-title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((p) => ({ ...p, title: "" }));
              }}
              placeholder="Ej. Compras del super"
              className="py-5 text-sm"
              disabled={isPending}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Commerce */}
          <div className="grid gap-1.5">
            <Label htmlFor="exp-commerce">
              Comercio{" "}
              <span className="text-muted text-xs">(opcional)</span>
            </Label>
            <Input
              id="exp-commerce"
              value={commerce}
              onChange={(e) => setCommerce(e.target.value)}
              placeholder="Ej. Walmart"
              className="py-5 text-sm"
              disabled={isPending}
            />
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="exp-amount">Monto ($)</Label>
              <Input
                id="exp-amount"
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setErrors((p) => ({ ...p, amount: "" }));
                }}
                placeholder="0.00"
                className="py-5 text-sm"
                disabled={isPending}
              />
              {errors.amount && (
                <p className="text-xs text-destructive">{errors.amount}</p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="exp-date">Fecha</Label>
              <Input
                id="exp-date"
                type="date"
                value={dateStr}
                onChange={(e) => {
                  setDateStr(e.target.value);
                  setErrors((p) => ({ ...p, date: "" }));
                }}
                className="py-5 text-sm"
                disabled={isPending}
              />
              {errors.date && (
                <p className="text-xs text-destructive">{errors.date}</p>
              )}
            </div>
          </div>

          {/* Account selector — optional */}
          <div className="grid gap-1.5">
            <Label>
              Cuenta{" "}
              <span className="text-muted text-xs">(opcional)</span>
            </Label>
            {accounts.length === 0 ? (
              <p className="text-sm text-muted py-1">
                No tienes cuentas registradas
              </p>
            ) : (
              <div className="grid gap-2">
                {accounts.map((acc) => {
                  const isSelected = acc.id === selectedAccountId;
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        setSelectedAccountId(isSelected ? null : acc.id)
                      }
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-150",
                        "hover:border-action/60 hover:bg-action/5 disabled:opacity-50",
                        isSelected
                          ? "border-action bg-action/10"
                          : "border-border bg-card",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center size-8 rounded-full shrink-0",
                          isSelected
                            ? "bg-action text-white"
                            : "bg-muted/20 text-muted",
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
                          {acc.type === "card" ? "Tarjeta" : "Simple"}
                        </p>
                      </div>
                      {isSelected && (
                        <Check className="size-4 text-action shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isPending}
              className="border border-border"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={handleSubmit}
              disabled={isPending}
              className="font-bold"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-1" />
                  Guardando...
                </>
              ) : (
                "Agregar"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddExpenseDialog;
