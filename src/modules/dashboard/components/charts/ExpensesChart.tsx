import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExpensesChartProps {
  className?: string;
}

function ExpensesChart({ className = "" }: ExpensesChartProps) {
  return (
    <Card className={`border-none ${className}`}>
      <CardHeader>
        <CardTitle className="text-base font-bold text-primary">
          Gastos totales último meses
        </CardTitle>
      </CardHeader>

      <CardContent>{/* TODO: gráfico */}</CardContent>
    </Card>
  );
}

export default ExpensesChart;
