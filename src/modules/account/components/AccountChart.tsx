"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MovementInterface } from "@/src/shared/interfaces/movement";
import { getMonthlyTotals } from "@/src/shared/lib/movementUtils";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface AccountChartProps {
  movements: MovementInterface[];
  closingDay: number | null;
}

function AccountChart({ movements, closingDay }: AccountChartProps) {
  const now = new Date();
  const refYear = now.getFullYear();
  const refMonth = now.getMonth();

  const monthlyData = getMonthlyTotals(
    movements,
    closingDay,
    refYear,
    refMonth,
    4,
  );

  const labels = monthlyData.map((d) => d.label);
  const values = monthlyData.map((d) => d.total);

  const data = {
    labels,
    datasets: [
      {
        label: "Gasto mensual",
        data: values,
        backgroundColor: [
          "rgba(2, 48, 72, 0.6)",
          "rgba(2, 48, 72, 0.6)",
          "rgba(2, 48, 72, 0.6)",
          "rgba(2, 48, 72, 1)", // mes actual más oscuro
        ],
        borderColor: [
          "rgba(2, 48, 72, 0.9)",
          "rgba(2, 48, 72, 0.9)",
          "rgba(2, 48, 72, 0.9)",
          "rgba(2, 48, 72, 1)",
        ],
        borderRadius: 6,
        borderWidth: 1,
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
          callback: (value: unknown) =>
            `$ ${Number(value).toLocaleString("es-CL")}`,
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
    <section aria-label="Gastos total del mes actual y anteriores">
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="text-base font-bold text-primary">
            Gastos totales último meses
          </CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <Bar
            data={data}
            options={options as Parameters<typeof Bar>[0]["options"]}
          />
        </CardContent>
      </Card>
    </section>
  );
}

export default AccountChart;
