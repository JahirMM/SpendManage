"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMonthlyTotals } from "@/src/shared/lib/movementUtils";
import { useGetAllMovements } from "@/src/modules/dashboard/hooks/useGetAllMovements";
import { useGetAccounts } from "@/src/modules/dashboard/hooks/useGetAccounts";
import { MovementInterface } from "@/src/shared/interfaces/movement";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface ExpensesChartProps {
  className?: string;
  userId?: string;
}

function ExpensesChart({ className = "", userId }: ExpensesChartProps) {
  const { data: allMovements = [] } = useGetAllMovements(userId ?? null);
  const { data: accounts = [] } = useGetAccounts(userId ?? null);

  const now = new Date();
  const refYear = now.getFullYear();
  const refMonth = now.getMonth();

  const MONTHS = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  const monthLabels: string[] = [];
  const monthTotals: number[] = [];

  for (let i = 3; i >= 0; i--) {
    let m = refMonth - i;
    let y = refYear;
    while (m < 0) { m += 12; y -= 1; }

    // Agrupa movimientos por cuenta usando el closing_date de cada una
    let periodTotal = 0;

    const grouped = new Map<string, { closingDay: number | null; items: MovementInterface[] }>();
    for (const mv of allMovements) {
      const acct = accounts.find((a) => a.id === mv.account_id);
      const closingDay = acct?.closing_date ?? null;
      if (!grouped.has(mv.account_id)) {
        grouped.set(mv.account_id, { closingDay, items: [] });
      }
      grouped.get(mv.account_id)!.items.push(mv);
    }

    for (const { closingDay, items } of grouped.values()) {
      const totals = getMonthlyTotals(items, closingDay, y, m, 1);
      periodTotal += totals[0]?.total ?? 0;
    }

    monthLabels.push(`${MONTHS[m]} ${y}`);
    monthTotals.push(periodTotal);
  }

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: "Gasto mensual",
        data: monthTotals,
        backgroundColor: monthLabels.map((_, i) =>
          i === 3 ? "rgba(2,48,72,1)" : "rgba(2,48,72,0.5)",
        ),
        borderRadius: 6,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { raw: unknown }) =>
            `$ ${Number(ctx.raw).toLocaleString("es-CL")}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (v: unknown) => `$ ${Number(v).toLocaleString("es-CL")}`,
          font: { size: 11 },
        },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
    },
  };

  return (
    <Card className={`border-none ${className}`}>
      <CardHeader>
        <CardTitle className="text-base font-bold text-primary">
          Gastos totales último meses
        </CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <Bar data={data} options={options as Parameters<typeof Bar>[0]["options"]} />
      </CardContent>
    </Card>
  );
}

export default ExpensesChart;
