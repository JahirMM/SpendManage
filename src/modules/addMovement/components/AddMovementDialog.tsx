import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AddMovementForm from "@/src/modules/addMovement/components/AddMovementForm";

import { Dispatch, SetStateAction } from "react";

interface AddMovementDialogProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  accountId: string;
}

function AddMovementDialog({
  openDialog,
  setOpenDialog,
  accountId,
}: AddMovementDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Agregar movimiento
          </DialogTitle>
        </DialogHeader>
        <AddMovementForm setOpenDialog={setOpenDialog} accountId={accountId} />
      </DialogContent>
    </Dialog>
  );
}

export default AddMovementDialog;
