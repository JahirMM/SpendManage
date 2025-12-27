import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AddMovementForm from "@/src/addMovement/components/AddMovementForm";

import { Dispatch, SetStateAction } from "react";

interface AddMovementDialogProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

function AddMovementDialog({
  openDialog,
  setOpenDialog,
}: AddMovementDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Agregar movimiento
          </DialogTitle>
        </DialogHeader>
        <AddMovementForm setOpenDialog={setOpenDialog} />
      </DialogContent>
    </Dialog>
  );
}

export default AddMovementDialog;
