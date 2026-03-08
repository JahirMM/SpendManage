import { ProgressBar } from "@/src/shared/components/ProgressBar";
import { MovementInterface } from "@/src/shared/interfaces/movement";
import { formatCLP } from "@/src/shared/lib/movementUtils";

interface MovementItemProps {
  movement: MovementInterface;
  installmentNumber: number;
  amountPerInstallment: number;
}

function MovementItem({
  movement,
  installmentNumber,
  amountPerInstallment,
}: MovementItemProps) {
  const totalInstallments = movement.installment_count || 1;
  const progress = Math.min(
    100,
    Math.round((installmentNumber / totalInstallments) * 100),
  );

  return (
    <div className="p-3 rounded-lg border border-gray-200">
      <div className="flex justify-between text-sm">
        <p className="font-bold">{movement.title}</p>
        <p className="font-bold text-secondary">
          {formatCLP(amountPerInstallment)}
        </p>
      </div>
      {movement.description && (
        <p className="mt-2 mb-4 text-sm">{movement.description}</p>
      )}
      <div className="flex flex-col gap-1 mb-5 text-sm text-gray-600 sm:flex-row sm:justify-between">
        <p>
          Cuota {installmentNumber} de {totalInstallments}
        </p>
        <p>Monto total: {formatCLP(movement.total_amount)}</p>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
}

export default MovementItem;
