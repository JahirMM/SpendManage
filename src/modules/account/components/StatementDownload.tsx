"use client";

import AccountStatementDialog from "@/src/modules/accountStatement/components/AccountStatementDialog";

import { AccountInterface } from "@/src/modules/dashboard/interfaces/accountInterface";
import { MovementInterface } from "@/src/shared/interfaces/movement";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

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

/** Genera los últimos N meses (incluyendo el actual) para el selector */
function generatePeriodOptions(nMonths: number = 12) {
  const options: {
    label: string;
    value: string;
    year: number;
    month: number;
  }[] = [];
  const now = new Date();
  for (let i = 0; i < nMonths; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = d.getFullYear();
    const month = d.getMonth();
    options.push({
      label: `${MONTH_NAMES[month]} ${year}`,
      value: `${year}-${month}`,
      year,
      month,
    });
  }
  return options;
}

interface StatementDownloadProps {
  account: AccountInterface;
  movements: MovementInterface[];
}

function StatementDownload({ account, movements }: StatementDownloadProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const periodOptions = generatePeriodOptions(12);
  const [selectedValue, setSelectedValue] = useState(periodOptions[0].value);

  const toggleDialog = () => setOpenDialog((prev) => !prev);

  const selected =
    periodOptions.find((o) => o.value === selectedValue) ?? periodOptions[0];

  return (
    <>
      <section aria-label="Descargar estado de cuentas" className="mt-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold text-primary">
              Descargar estado de cuentas
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Select value={selectedValue} onValueChange={setSelectedValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                {periodOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              size="default"
              variant="default"
              onClick={toggleDialog}
            >
              Ver estado de cuenta
            </Button>
          </CardContent>
        </Card>
      </section>
      <AccountStatementDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        account={account}
        movements={movements}
        selectedYear={selected.year}
        selectedMonth={selected.month}
      />
    </>
  );
}

export default StatementDownload;
