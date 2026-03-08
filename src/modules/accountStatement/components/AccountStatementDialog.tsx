"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AccountStatementSummary from "@/src/modules/accountStatement/components/AccountStatementSummary";
import AccountStatementHeader from "@/src/modules/accountStatement/components/AccountStatementHeader";
import AccountStatementMovementsList from "@/src/modules/accountStatement/components/MovementsList";

import { AccountInterface } from "@/src/modules/dashboard/interfaces/accountInterface";
import { MovementInterface } from "@/src/shared/interfaces/movement";
import {
  calculatePeriodSummary,
  filterMovementsByPeriod,
} from "@/src/shared/lib/movementUtils";

import { Dispatch, SetStateAction } from "react";

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

interface AccountStatementProps {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  account: AccountInterface;
  movements: MovementInterface[];
  selectedYear: number;
  selectedMonth: number; // 0-indexed
}

function AccountStatementDialog({
  openDialog,
  setOpenDialog,
  account,
  movements,
  selectedYear,
  selectedMonth,
}: AccountStatementProps) {
  const closingDay = account.closing_date;

  const periodMovements = filterMovementsByPeriod(
    movements,
    closingDay,
    selectedYear,
    selectedMonth,
  );

  const { count, totalAmount } = calculatePeriodSummary(
    movements,
    closingDay,
    selectedYear,
    selectedMonth,
  );

  const periodLabel = `${MONTH_NAMES[selectedMonth]} ${selectedYear}`;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Estado de cuenta
          </DialogTitle>
          <DialogDescription>{periodLabel}</DialogDescription>
        </DialogHeader>
        <div>
          {/* CUENTA */}
          <AccountStatementHeader
            title={account.title}
            type={account.type}
            closingDate={account.closing_date}
            paymentDate={account.payment_date}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
          {/* DATOS */}
          <AccountStatementSummary count={count} totalAmount={totalAmount} />
          {/* MOVIMIENTOS */}
          <AccountStatementMovementsList
            movements={periodMovements}
            closingDay={closingDay}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
          <div className="flex justify-between p-3 mt-5 text-base font-bold rounded-lg bg-secondary">
            <span>Total a pagar</span>
            <span>
              {totalAmount.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AccountStatementDialog;
