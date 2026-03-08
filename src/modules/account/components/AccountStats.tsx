import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MovementInterface } from "@/src/shared/interfaces/movement";
import {
  getTotalDebt,
  getMonthlyPayment,
  getActiveMovements,
  getCompletedMovements,
  formatCLP,
} from "@/src/shared/lib/movementUtils";

interface AccountStatsProps {
  movements: MovementInterface[];
  closingDay: number | null;
}

function AccountStats({ movements, closingDay }: AccountStatsProps) {
  const now = new Date();
  const refYear = now.getFullYear();
  const refMonth = now.getMonth();

  const totalDebt = getTotalDebt(movements, closingDay, refYear, refMonth);
  const monthlyPayment = getMonthlyPayment(
    movements,
    closingDay,
    refYear,
    refMonth,
  );
  const activeCount = getActiveMovements(
    movements,
    closingDay,
    refYear,
    refMonth,
  ).length;
  const completedCount = getCompletedMovements(
    movements,
    closingDay,
    refYear,
    refMonth,
  ).length;

  return (
    <section aria-label="Estadísticas de la cuenta" className="space-y-3">
      <Card className="border-none bg-primary">
        <CardHeader>
          <CardTitle className="text-sm font-bold text-muted">
            Deuda total
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-1">
          <span className="text-base font-bold text-white">$</span>
          <span className="text-2xl font-bold text-white">
            {totalDebt.toLocaleString("es-CL")}
          </span>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold text-muted">
              Pago de este mes
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-1">
            <span className="text-sm font-bold">$</span>
            <span className="text-lg font-bold">
              {monthlyPayment.toLocaleString("es-CL")}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold text-muted">
              Movimientos activos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-bold">{activeCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold text-muted">
              Movimientos completos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-bold">
            {completedCount}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default AccountStats;
