import { getAccounts } from "@/src/modules/dashboard/services/getAccounts";
import { AccountInterface } from "../interfaces/accountInterface";
import { useQuery } from "@tanstack/react-query";

export const useGetAccounts = (userId: string | null) => {
  const query = useQuery<AccountInterface[]>({
    queryKey: ["accounts", userId],
    queryFn: () => getAccounts(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return query;
};
