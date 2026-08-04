"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTHS_ES } from "@/src/modules/subscriptions/data/mockSubscriptions";
import { Button } from "@/components/ui/button";

interface MonthSelectorProps {
  month: number;
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
    <div className="flex items-center gap-2">
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

      <span className="text-sm font-semibold text-foreground min-w-[100px] text-center hidden sm:inline">
        {MONTHS_ES[month - 1]} {year}
      </span>

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
