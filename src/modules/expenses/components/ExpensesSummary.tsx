import { DailyExpense } from "@/src/modules/expenses/interfaces/expensesInterfaces";
import { TrendingDown, Calendar } from "lucide-react";

interface ExpensesSummaryProps {
  days: DailyExpense[];
}

function ExpensesSummary({ days }: ExpensesSummaryProps) {
  const total = days.reduce(
    (sum, day) => sum + day.items.reduce((s, i) => s + i.amount, 0),
    0
  );

  const activeDays = days.filter((d) => d.items.length > 0).length;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Calendar className="size-4 text-action" />
          <span className="text-xs text-muted">Días con gastos</span>
        </div>
        <p className="text-2xl font-bold text-primary tabular-nums">
          {activeDays}
          <span className="text-sm font-normal text-muted ml-1">
            / {days.length}
          </span>
        </p>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <TrendingDown className="size-4 text-action" />
          <span className="text-xs text-muted">Total del mes</span>
        </div>
        <p className="text-2xl font-bold text-primary tabular-nums">
          ${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}

export default ExpensesSummary;
