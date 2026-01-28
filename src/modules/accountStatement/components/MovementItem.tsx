import { ProgressBar } from "@/src/shared/components/ProgressBar";

function MovementItem() {
  return (
    <div className="p-3 rounded-lg border border-gray-200">
      <div className="flex justify-between text-sm">
        <p className="font-bold">Picada</p>
        <p className="font-bold text-secondary">$ 5.344,00</p>
      </div>
      <p className="mt-2 mb-4 text-sm">Compramos pollo</p>
      <div className="flex flex-col gap-1 mb-5 text-sm text-gray-600 sm:flex-row sm:justify-between">
        <p>Cuota 1 de 3</p>
        <p>Monto total: $ 20.000,00</p>
      </div>
      <ProgressBar progress={50} />
    </div>
  );
}

export default MovementItem;
