import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getTotalMonthlyExpenses } from "../services/getTotalMonthlyExpenses";

export const useTotalMonthlyExpenses = () => {
  const queryClient = useQueryClient();

  // query inicial deshabilitada
  const query = useQuery<number>({
    queryKey: ["total-monthly-expenses"],
    queryFn: async () => {
      throw new Error("Use fetchExpenses with params");
    },
    enabled: false,
  });

  // método manual para disparar la query
  const fetchExpenses = async (
    accountId: string,
    currentDate: Date = new Date(),
  ) => {
    return queryClient.fetchQuery({
      queryKey: ["total-monthly-expenses", accountId],
      queryFn: () => getTotalMonthlyExpenses(accountId, currentDate),
    });
  };

  return {
    fetchExpenses,
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
