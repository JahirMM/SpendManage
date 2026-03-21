import { getRecentTransactions } from "@/src/modules/dashboard/services/getRecentTransactions";
import { useQuery } from "@tanstack/react-query";

export const useGerRecentTransactions = (userId: string | null) => {
  return useQuery({
    queryKey: ["recent-transactions", userId],
    queryFn: () => getRecentTransactions(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
