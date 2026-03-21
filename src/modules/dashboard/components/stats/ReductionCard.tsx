"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats } from "@/src/modules/dashboard/hooks/useDashboardStats";

interface ReductionCardProps {
  userId: string;
}

function ReductionCard({ userId }: ReductionCardProps) {
  const { monthlyPaymentCurrent, monthDiff, isLoading } =
    useDashboardStats(userId);

  const isIncrease = monthDiff >= 0;

  return (
    <Card className="border-none bg-primary">
      <CardHeader>
        <CardTitle className="text-base text-muted">
          Reducción vs mes pasado
        </CardTitle>
      </CardHeader>
      <CardContent className="text-white">
        {isLoading ? (
          <Skeleton className="h-8 w-40 bg-white/20" />
        ) : (
          <>
            <span className="mr-1 text-base font-semibold">$</span>
            <span className="text-2xl font-bold md:text-[28px]">
              {monthlyPaymentCurrent.toLocaleString("es-CL")}
            </span>
          </>
        )}
      </CardContent>
      <CardFooter className="mt-5 space-x-2 text-xs">
        {isLoading ? (
          <Skeleton className="h-6 w-28 bg-white/20" />
        ) : (
          <>
            <span className="inline-flex items-center gap-1 px-2 py-1 font-bold text-black rounded-lg bg-secondary">
              {isIncrease ? (
                <Plus className="size-3" />
              ) : (
                <Minus className="size-3" />
              )}
              {Math.abs(monthDiff).toLocaleString("es-CL")}
            </span>
            <span className="text-muted">vs mes anterior</span>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default ReductionCard;
