import EditMovementDialog from "@/src/modules/editMovement/components/EditMovementDialog";
import MovementDetails from "@/src/modules/account/components/MovementDetails";
import { ProgressBar } from "@/src/shared/components/ProgressBar";
import WarningDialog from "@/src/shared/components/WarningDialog";

import { MovementInterface } from "@/src/shared/interfaces/movement";

import { SquarePen, Trash } from "lucide-react";
import { useState } from "react";

interface MovementCardProps {
  movement: MovementInterface;
}

function MovementCard({ movement }: MovementCardProps) {
  const [openEditMovementDialog, setOpenEditMovementDialog] = useState(false);
  const [showWarningDialog, setShowEditDialogWarningDialog] = useState(false);

  const toggleWarningDialog = () =>
    setShowEditDialogWarningDialog(!showWarningDialog);

  return (
    <>
      <div className="p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <p className="font-bold">{movement.title}</p>
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
              onClick={toggleWarningDialog}
            >
              <Trash className="text-red-600 size-5" />
            </button>
          </div>
        </div>
        <p className="mt-3 mb-10 text-sm">{movement.description}</p>
        <div className="space-y-4">
          <MovementDetails movement={movement} />
          <ProgressBar progress={30} />
        </div>
      </div>
      <EditMovementDialog
        openDialog={openEditMovementDialog}
        setOpenDialog={setOpenEditMovementDialog}
      />
      <WarningDialog
        open={showWarningDialog}
        onOpenChange={toggleWarningDialog}
        title="Eliminar movimiento"
        description="¿Estás seguro de eliminar este movimiento?"
        actionLabel="Eliminar"
        onAction={() => {}}
      />
    </>
  );
}

export default MovementCard;
