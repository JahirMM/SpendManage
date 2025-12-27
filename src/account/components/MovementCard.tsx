import EditMovementDialog from "@/src/editMovement/components/EditMovementDialog";
import MovementDetails from "@/src/account/components/MovementDetails";
import { ProgressBar } from "@/src/shared/components/ProgressBar";

import { SquarePen, Trash } from "lucide-react";
import { useState } from "react";

function MovementCard() {
  const [openEditMovementDialog, setOpenEditMovementDialog] = useState(false);

  return (
    <>
      <div className="p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <p className="font-bold">Picada</p>
          <div>
            <button
              type="button"
              aria-label="Editar cuenta"
              className="p-1 rounded-md transition duration-300 cursor-pointer hover:bg-gray-200/80"
              onClick={() => setOpenEditMovementDialog(true)}
            >
              <SquarePen className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Eliminar cuenta"
              className="p-1 rounded-md transition duration-300 cursor-pointer hover:bg-gray-200/80"
            >
              <Trash className="text-red-600 size-5" />
            </button>
          </div>
        </div>
        <p className="mt-3 mb-10 text-sm">Se compro pollo</p>
        <div className="space-y-4">
          <MovementDetails />
          <ProgressBar progress={30} />
        </div>
      </div>
      <EditMovementDialog
        openDialog={openEditMovementDialog}
        setOpenDialog={setOpenEditMovementDialog}
      />
    </>
  );
}

export default MovementCard;
