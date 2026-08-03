import { useQuery } from "@tanstack/react-query";
import { getMonthlyTotal } from "@/src/modules/expenses/services/getMonthlyTotal";
import { MonthlyTotalApiResponse } from "@/src/modules/expenses/interfaces/expenseApiInterfaces";

export const useGetMonthlyTotal = (
  userId: string | null,
  month: number,
  year: number,
) => {
  return useQuery<MonthlyTotalApiResponse>({
    queryKey: ["expenses-total", userId, month, year],
    queryFn: () => getMonthlyTotal({ user_id: userId!, month, year }),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
