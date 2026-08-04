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
import { cn } from "@/lib/utils";
import {
  Subscription,
  SubscriptionCategory,
  SubscriptionCycle,
  WeekDay,
} from "@/src/modules/subscriptions/interfaces/subscriptionInterfaces";
import { CATEGORY_LABELS, WEEK_DAY_LABELS } from "@/src/modules/subscriptions/data/mockSubscriptions";
import {
  Tv,
  Music,
  Gamepad2,
  Briefcase,
  Cloud,
  Dumbbell,
  GraduationCap,
  MoreHorizontal,
  Star,
} from "lucide-react";

interface EditSubscriptionDialogProps {
  open: boolean;
  subscription: Subscription | null;
  onClose: () => void;
  onSave: (updated: Subscription) => void;
}

const CATEGORY_ICONS: Record<SubscriptionCategory, React.ReactNode> = {
  streaming: <Tv className="size-4" />,
  music: <Music className="size-4" />,
  gaming: <Gamepad2 className="size-4" />,
  productivity: <Briefcase className="size-4" />,
  cloud: <Cloud className="size-4" />,
  fitness: <Dumbbell className="size-4" />,
  education: <GraduationCap className="size-4" />,
  other: <MoreHorizontal className="size-4" />,
};

const PRESET_COLORS = [
  "#E50914", "#1DB954", "#113CCF", "#107C10",
  "#007AFF", "#FF6B00", "#B535F6", "#0EA5E9",
];

function EditSubscriptionDialog({
  open,
  subscription,
  onClose,
  onSave,
}: EditSubscriptionDialogProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [payDay, setPayDay] = useState("1");
  const [weekDay, setWeekDay] = useState<WeekDay>(1);
  const [category, setCategory] = useState<SubscriptionCategory>("streaming");
  const [cycle, setCycle] = useState<SubscriptionCycle>("monthly");
  const [cardLabel, setCardLabel] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // Populate form when subscription changes
  useEffect(() => {
    if (subscription) {
      setName(subscription.name);
      setAmount(String(subscription.amount));
      setPayDay(String(subscription.payDay || 1));
      setWeekDay(subscription.weekDay ?? 1);
      setCategory(subscription.category);
      setCycle(subscription.cycle);
      setCardLabel(subscription.cardLabel ?? "");
      setFavorite(subscription.favorite);
      setColor(subscription.color);
      setErrors({});
    }
  }, [subscription]);

  const handleSubmit = () => {
    if (!subscription) return;

    const newErrors: Record<string, boolean> = {};
    if (!name.trim()) newErrors.name = true;
    if (!amount || Number(amount) <= 0) newErrors.amount = true;
    if (cycle !== "weekly" && (!payDay || Number(payDay) < 1 || Number(payDay) > 31)) {
      newErrors.payDay = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...subscription,
      name: name.trim(),
      category,
      amount: Number(amount),
      cycle,
      payDay: cycle === "weekly" ? 0 : Number(payDay),
      weekDay: cycle === "weekly" ? weekDay : undefined,
      cardLabel: cardLabel.trim() || null,
      favorite,
      color,
    });

    onClose();
  };

  if (!subscription) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar suscripción</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-name">Nombre</Label>
            <Input
              id="edit-name"
              placeholder="Netflix, Spotify, Pasaje..."
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: false })); }}
              className={cn(errors.name && "border-destructive")}
            />
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-amount">Monto</Label>
            <Input
              id="edit-amount"
              type="number"
              min={0}
              step={0.01}
              placeholder="$0.00"
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setErrors((p) => ({ ...p, amount: false })); }}
              className={cn(errors.amount && "border-destructive")}
            />
          </div>

          {/* Cycle */}
          <div className="space-y-1.5">
            <Label>Frecuencia</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCycle("weekly")}
                className={cn(
                  "flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                  cycle === "weekly"
                    ? "bg-action text-white border-action"
                    : "bg-card text-muted hover:border-action/50",
                )}
              >
                Semanal
              </button>
              <button
                type="button"
                onClick={() => setCycle("monthly")}
                className={cn(
                  "flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                  cycle === "monthly"
                    ? "bg-action text-white border-action"
                    : "bg-card text-muted hover:border-action/50",
                )}
              >
                Mensual
              </button>
              <button
                type="button"
                onClick={() => setCycle("yearly")}
                className={cn(
                  "flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                  cycle === "yearly"
                    ? "bg-action text-white border-action"
                    : "bg-card text-muted hover:border-action/50",
                )}
              >
                Anual
              </button>
            </div>
          </div>

          {/* Day of week or month */}
          {cycle === "weekly" ? (
            <div className="space-y-1.5">
              <Label>Día de la semana</Label>
              <div className="grid grid-cols-7 gap-1.5">
                {WEEK_DAY_LABELS.map((label, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setWeekDay(i as WeekDay)}
                    className={cn(
                      "rounded-lg border py-2 text-xs font-medium transition-all",
                      weekDay === i
                        ? "bg-action text-white border-action"
                        : "bg-card text-muted hover:border-action/50",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <Label htmlFor="edit-day">Día de cobro</Label>
              <Input
                id="edit-day"
                type="number"
                min={1}
                max={31}
                value={payDay}
                onChange={(e) => { setPayDay(e.target.value); setErrors((p) => ({ ...p, payDay: false })); }}
                className={cn("w-24", errors.payDay && "border-destructive")}
              />
            </div>
          )}

          {/* Category */}
          <div className="space-y-1.5">
            <Label>Categoría</Label>
            <div className="grid grid-cols-4 gap-2">
              {(Object.keys(CATEGORY_LABELS) as SubscriptionCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border p-2.5 transition-all text-xs",
                    category === cat
                      ? "border-action bg-action/5 text-action"
                      : "border-border text-muted hover:border-action/30",
                  )}
                >
                  {CATEGORY_ICONS[cat]}
                  <span className="text-[10px] leading-tight text-center">
                    {CATEGORY_LABELS[cat]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Card / Tarjeta */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-card">Tarjeta (opcional)</Label>
            <Input
              id="edit-card"
              placeholder="Tarjeta Santander, Tarjeta Lider..."
              value={cardLabel}
              onChange={(e) => setCardLabel(e.target.value)}
            />
          </div>

          {/* Favorite toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label>Favorita</Label>
              <p className="text-[11px] text-muted">Aparecerá en la sección de favoritas</p>
            </div>
            <button
              type="button"
              onClick={() => setFavorite(!favorite)}
              className={cn(
                "size-9 rounded-xl border flex items-center justify-center transition-all",
                favorite
                  ? "bg-secondary/10 border-secondary"
                  : "bg-card border-border hover:border-secondary/50",
              )}
              aria-label={favorite ? "Quitar de favoritas" : "Marcar como favorita"}
            >
              <Star className={cn("size-4", favorite ? "fill-secondary text-secondary" : "text-muted")} />
            </button>
          </div>

          {/* Color */}
          <div className="space-y-1.5">
            <Label>Color</Label>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "size-7 rounded-full transition-all",
                    color === c && "ring-2 ring-offset-2 ring-action scale-110",
                  )}
                  style={{ backgroundColor: c }}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button onClick={handleSubmit} className="w-full rounded-xl">
            Guardar cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditSubscriptionDialog;
