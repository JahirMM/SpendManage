import MovementItem from "@/src/modules/accountStatement/components/MovementItem";
import { MovementInterface } from "@/src/shared/interfaces/movement";
import {
  getInstallmentAmount,
  getInstallmentNumberForPeriod,
} from "@/src/shared/lib/movementUtils";

interface AccountStatementMovementsListProps {
  movements: MovementInterface[];
  closingDay: number | null;
  selectedYear: number;
  selectedMonth: number;
}

function MovementsList({
  movements,
  closingDay,
  selectedYear,
  selectedMonth,
}: AccountStatementMovementsListProps) {
  return (
    <div className="mt-3">
      <p className="text-base font-bold">Detalle de movimientos</p>
      <div className="mt-2 space-y-3 max-h-[280px] overflow-y-auto">
        {movements.length === 0 && (
          <p className="text-sm text-gray-500">
            No hay movimientos para este período
          </p>
        )}
        {movements.map((movement) => {
          const installmentNumber = getInstallmentNumberForPeriod(
            movement,
            closingDay,
            selectedYear,
            selectedMonth,
          );
          const amountPerInstallment = getInstallmentAmount(movement);
          return (
            <MovementItem
              key={movement.id}
              movement={movement}
              installmentNumber={installmentNumber}
              amountPerInstallment={amountPerInstallment}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MovementsList;
