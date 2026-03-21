"use client";

import { useDashboardStats } from "@/src/modules/dashboard/hooks/useDashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TotalExpenseCardProps {
  userId: string;
}

function TotalExpenseCard({ userId }: TotalExpenseCardProps) {
  const { totalDebt, isLoading } = useDashboardStats(userId);

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="text-base font-bold text-primary">
          Gasto total
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-40" />
        ) : (
          <>
            <span className="mr-1 text-base font-semibold">$</span>
            <span className="text-2xl font-bold md:text-[28px]">
              {totalDebt.toLocaleString("es-CL")}
            </span>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default TotalExpenseCard;
