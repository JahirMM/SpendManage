"use client";

import EditAccountDialog from "@/src/modules/editAccount/components/EditAccountDialog";
import WarningDialog from "@/src/shared/components/WarningDialog";
import { MoveLeft, SquarePen, Trash } from "lucide-react";
import { useState } from "react";

function AccountHeader() {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showWarningDialog, setShowEditDialogWarningDialog] = useState(false);

  const toggleEditDialog = () => setShowEditDialog(!showEditDialog);
  const toggleWarningDialog = () =>
    setShowEditDialogWarningDialog(!showWarningDialog);

  return (
    <>
      <header>
        <button
          type="button"
          className="flex gap-2 mb-5 text-base font-black text-action"
        >
          <MoveLeft className="size-5" /> Volver
        </button>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-0">
          <div className="space-y-4">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold lg:text-3xl">Tarjeta Lider</h1>
              <div className="flex gap-3 md:hidden">
                <button
                  type="button"
                  aria-label="Editar cuenta"
                  className="p-1 rounded-md transition duration-300 cursor-pointer hover:bg-gray-200/80"
                  onClick={toggleEditDialog}
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
            <p className="text-sm">
              Tarjeta de uso solo para compras de alimentos para casa
            </p>
            <div className="flex gap-3 text-sm">
              <span className="px-4 py-0.5 bg-secondary rounded-2xl">
                Tarjeta
              </span>
              <span className="text-gray-600">Pago día 5</span>
              <span className="text-gray-600">Cierre día 26</span>
            </div>
          </div>
          <div className="hidden gap-3 md:flex md:items-center">
            <button
              type="button"
              aria-label="Editar cuenta"
              className="p-1 rounded-md transition duration-300 cursor-pointer hover:bg-gray-200/80"
              onClick={toggleEditDialog}
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
      </header>
      <EditAccountDialog
        open={showEditDialog}
        setShowEditDialog={setShowEditDialog}
      />
      <WarningDialog
        open={showWarningDialog}
        onOpenChange={toggleWarningDialog}
        title="Eliminar cuenta"
        description="¿Estás seguro de eliminar esta cuenta?"
        actionLabel="Eliminar"
        onAction={() => console.log("Eliminar")}
      />
    </>
  );
}

export default AccountHeader;
