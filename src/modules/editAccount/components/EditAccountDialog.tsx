import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditAccountForm from "@/src/modules/editAccount/components/EditAccountForm";
import { AccountInterface } from "@/src/modules/dashboard/interfaces/accountInterface";

import { Dispatch, SetStateAction } from "react";

interface EditAccountDialogProps {
  open: boolean;
  setShowEditDialog: Dispatch<SetStateAction<boolean>>;
  account: AccountInterface;
}

function EditAccountDialog({
  open,
  setShowEditDialog,
  account,
}: EditAccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar cuenta</DialogTitle>
        </DialogHeader>
        <EditAccountForm account={account} setShowEditDialog={setShowEditDialog} />
      </DialogContent>
    </Dialog>
  );
}

export default EditAccountDialog;
