import MovementDetails from "@/src/account/components/MovementDetails";
import { ProgressBar } from "@/src/account/components/ProgressBar";
import { SquarePen, Trash } from "lucide-react";

function MovementCard() {
  return (
    <div className="border border-gray-200 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <p className="font-bold">Picada</p>
        <div>
          <button
            type="button"
            aria-label="Editar cuenta"
            className="p-1 transition duration-300 rounded-md cursor-pointer hover:bg-gray-200/80"
          >
            <SquarePen className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Eliminar cuenta"
            className="p-1 transition duration-300 rounded-md cursor-pointer hover:bg-gray-200/80"
          >
            <Trash className="text-red-600 size-5" />
          </button>
        </div>
      </div>
      <p className="mt-3 mb-10 text-sm">Se compro pollo</p>
      <div className="space-y-4">
        <MovementDetails />
        <ProgressBar progress={50} />
      </div>
    </div>
  );
}

export default MovementCard;
