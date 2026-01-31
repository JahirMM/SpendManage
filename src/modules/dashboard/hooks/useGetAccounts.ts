import { getAccounts } from "@/src/modules/dashboard/services/getAccounts";
import { useQuery } from "@tanstack/react-query";

export const useGetAccounts = (userId: string | null) => {
  return useQuery({
    queryKey: ["accounts", userId ?? "no-user"],
    queryFn: async () => {
      if (!userId) {
        return [];
      }
      return getAccounts(userId);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
    retry: false,
  });
};
