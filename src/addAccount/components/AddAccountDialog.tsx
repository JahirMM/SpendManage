import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

import AddAccountForm from "@/src/addAccount/components/AddAccountForm";

interface AddAccountDialogProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

function AddAccountDialog({
  openDialog,
  setOpenDialog,
}: AddAccountDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            Nueva cuenta
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulario para agregar una nueva cuenta{" "}
          </DialogDescription>
        </DialogHeader>
        <AddAccountForm  setOpenDialog={setOpenDialog}/>
      </DialogContent>
    </Dialog>
  );
}

export default AddAccountDialog;
