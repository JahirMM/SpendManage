import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditAccountForm from "@/src/editAccount/components/EditAccountForm";

import { Dispatch, SetStateAction } from "react";

interface EditAccountDialogProps {
  open: boolean;
  setShowEditDialog: Dispatch<SetStateAction<boolean>>;
}

function EditAccountDialog({
  open,
  setShowEditDialog,
}: EditAccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar cuenta</DialogTitle>
        </DialogHeader>
        <EditAccountForm setShowEditDialog={setShowEditDialog} />
      </DialogContent>
    </Dialog>
  );
}

export default EditAccountDialog;
