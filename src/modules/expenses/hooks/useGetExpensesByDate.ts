import { useQuery } from "@tanstack/react-query";
import { getExpensesByDate } from "@/src/modules/expenses/services/getExpensesByDate";
import { ExpenseApiItem } from "@/src/modules/expenses/interfaces/expenseApiInterfaces";

export const useGetExpensesByDate = (
  userId: string | null,
  month: number,
  year: number,
) => {
  return useQuery<ExpenseApiItem[]>({
    queryKey: ["expenses", userId, month, year],
    queryFn: () => getExpensesByDate({ user_id: userId!, month, year }),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
