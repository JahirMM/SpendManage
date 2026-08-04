"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DaySubscription } from "@/src/modules/subscriptions/hooks/useSubscriptions";
import { CreditCard, Calendar, Repeat } from "lucide-react";

interface DayDetailDialogProps {
  open: boolean;
  onClose: () => void;
  dayData: DaySubscription | null;
  month: number;
  year: number;
}

const CYCLE_LABEL: Record<string, string> = {
  weekly: "Semanal",
  monthly: "Mensual",
  yearly: "Anual",
};

function DayDetailDialog({
  open,
  onClose,
  dayData,
  month,
  year,
}: DayDetailDialogProps) {
  if (!dayData) return null;

  const total = dayData.subscriptions.reduce((s, sub) => s + sub.amount, 0);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="size-4 text-action" />
            Día {dayData.day} — Cobros
          </DialogTitle>
        </DialogHeader>

        {dayData.subscriptions.length === 0 ? (
          <p className="text-sm text-muted text-center py-4">
            No hay cobros este día
          </p>
        ) : (
          <div className="space-y-3 pt-2">
            {dayData.subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center gap-3 p-3 rounded-xl border bg-card/50"
              >
                {/* Color icon */}
                <div
                  className="size-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: sub.color }}
                >
                  {sub.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {sub.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1 text-[11px] text-muted">
                      <Repeat className="size-3" />
                      {CYCLE_LABEL[sub.cycle]}
                    </span>
                    {sub.cardLabel && (
                      <span className="flex items-center gap-1 text-[11px] text-muted">
                        <CreditCard className="size-3" />
                        {sub.cardLabel}
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-sm font-bold text-primary tabular-nums shrink-0">
                  ${sub.amount.toLocaleString("es-MX")}
                </span>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-xs text-muted">Total del día</span>
              <span className="text-base font-bold text-secondary tabular-nums">
                ${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DayDetailDialog;
