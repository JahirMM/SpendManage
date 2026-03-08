import { MovementInterface } from "@/src/shared/interfaces/movement";
import { formatCLP } from "@/src/shared/lib/movementUtils";

interface MovementDetailsProps {
  movement: MovementInterface;
  paidInstallments: number;
  amountPerInstallment: number;
  remainingAmount: number;
}

function MovementDetails({
  movement,
  paidInstallments,
  amountPerInstallment,
  remainingAmount,
}: MovementDetailsProps) {
  const totalInstallments = movement.installment_count || 1;

  return (
    <div className="space-y-3 md:space-y-0 md:flex md:items-center md:justify-between">
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Cuota mensual</p>
        <p className="font-bold">{formatCLP(amountPerInstallment)}</p>
      </div>
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Monto original</p>
        <p className="font-bold">{formatCLP(movement.principal_amount)}</p>
      </div>
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Monto total</p>
        <p className="font-bold">{formatCLP(movement.total_amount)}</p>
      </div>
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Cuotas</p>
        <p className="font-bold">
          {paidInstallments} de {totalInstallments}
        </p>
      </div>
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Restante</p>
        <p className="font-bold">{formatCLP(remainingAmount)}</p>
      </div>
    </div>
  );
}

export default MovementDetails;
