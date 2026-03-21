import { useGetMovementsByAccountId } from "@/src/modules/account/hooks/useGetMovementsByAccountId";
import { getMonthlyPayment } from "@/src/shared/lib/movementUtils";

interface AccountExpenseDisplayProps {
  accountId: string;
  closingDay: number | null;
}

function AccountExpenseDisplay({
  accountId,
  closingDay,
}: AccountExpenseDisplayProps) {
  const { data: movements = [] } = useGetMovementsByAccountId(accountId);

  const now = new Date();
  const refYear = now.getFullYear();
  const refMonth = now.getMonth();

  const monthlyPayment = getMonthlyPayment(
    movements,
    closingDay,
    refYear,
    refMonth,
  );

  return (
    <div>
      <span className="text-base">Gasto</span>
      <div>
        <span className="mr-1 text-sm font-semibold">$</span>
        <span className="text-lg font-bold md:text-2xl">
          {monthlyPayment.toLocaleString("es-CL")}
        </span>
      </div>
    </div>
  );
}

export default AccountExpenseDisplay;
