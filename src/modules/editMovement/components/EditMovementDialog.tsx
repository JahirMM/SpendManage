import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EditMovementForm from "@/src/modules/editMovement/components/EditMovementForm";
import React from "react";

interface EditMovementDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditMovementDialog({
  openDialog,
  setOpenDialog,
}: EditMovementDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            Editar movimiento
          </DialogTitle>
        </DialogHeader>
        <EditMovementForm setShowEditDialog={setOpenDialog} />
      </DialogContent>
    </Dialog>
  );
}

export default EditMovementDialog;
