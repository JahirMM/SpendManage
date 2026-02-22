import { MovementInterface } from "@/src/shared/interfaces/movement";

interface MovementDetailsProps {
  movement: MovementInterface;
}

function MovementDetails({ movement }: MovementDetailsProps) {
  return (
    <div className="space-y-3 md:space-y-0 md:flex md:items-center md:justify-between">
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Cuota mensual</p>
        <p className="font-bold">{movement.installment_count}</p>
      </div>
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Monto original</p>
        <p className="font-bold">
          {movement.principal_amount.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </p>
      </div>
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Monto total</p>
        <p className="font-bold">
          {movement.total_amount.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </p>
      </div>
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Cuotas</p>
        <p className="font-bold">{movement.installment_count}</p>
      </div>
      <div className="flex justify-between md:block md:text-center md:space-y-1.5 text-sm">
        <p className="text-gray-500 font-bold">Restante</p>
        <p className="font-bold">
          {movement.total_amount.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </p>
      </div>
    </div>
  );
}

export default MovementDetails;
