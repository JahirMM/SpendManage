import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AccountStatementSummary from "@/src/accountStatement/components/AccountStatementSummary";
import AccountStatementHeader from "@/src/accountStatement/components/AccountStatementHeader";
import MovementsList from "@/src/accountStatement/components/MovementsList";

import { Dispatch, SetStateAction } from "react";

interface AccountStatementProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

function AccountStatementDialog({
  openDialog,
  setOpenDialog,
}: AccountStatementProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Estado de cuenta
          </DialogTitle>
          <DialogDescription>Diciembre 2025</DialogDescription>
        </DialogHeader>
        <div>
          {/* CUENTA */}
          <AccountStatementHeader />
          {/* DATOS */}
          <AccountStatementSummary />
          {/* MOVIMIENTOS */}
          <MovementsList />
          <div className="flex justify-between p-3 mt-5 text-base font-bold rounded-lg bg-secondary">
            <span>Total a pagar</span>
            <span>$ 123.345,00</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AccountStatementDialog;
