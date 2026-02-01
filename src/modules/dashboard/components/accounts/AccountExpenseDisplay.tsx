import { useTotalMonthlyExpenses } from "@/src/modules/dashboard/hooks/useGetTotalMonthlyExpenses";
import { useEffect } from "react";

interface AccountExpenseDisplayProps {
  accountId: string;
}

function AccountExpenseDisplay({ accountId }: AccountExpenseDisplayProps) {
  const {
    fetchExpenses,
    data: totalMonthlyExpenses,
    isLoading: isTotalMonthlyExpensesLoading,
    isError,
    error,
  } = useTotalMonthlyExpenses();

  useEffect(() => {
    if (accountId) {
      fetchExpenses(accountId, new Date());
    }
  }, [accountId]);

  if (isTotalMonthlyExpensesLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <span className="text-base">Gasto</span>
      <div>
        <span className="mr-1 text-sm font-semibold">$</span>
        <span className="text-lg font-bold md:text-2xl">
          {totalMonthlyExpenses ? totalMonthlyExpenses.toFixed(2) : "0.00"}
        </span>
      </div>
    </div>
  );
}

export default AccountExpenseDisplay;
