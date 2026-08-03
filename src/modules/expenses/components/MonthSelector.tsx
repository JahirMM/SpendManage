"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTHS_ES } from "@/src/modules/expenses/data/mockExpenses";
import { Button } from "@/components/ui/button";

interface MonthSelectorProps {
  month: number; // 1-12
  year: number;
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

function MonthSelector({
  month,
  year,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}: MonthSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onPrev}
        disabled={disablePrev}
        className="size-8 rounded-lg"
        aria-label="Mes anterior"
      >
        <ChevronLeft className="size-4" />
      </Button>

      <h2 className="text-lg font-bold text-foreground min-w-40 text-center">
        {MONTHS_ES[month - 1]} {year}
      </h2>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={disableNext}
        className="size-8 rounded-lg"
        aria-label="Mes siguiente"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

export default MonthSelector;
