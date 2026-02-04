import { getAccountById } from "../services/getAccountById";
import { useQuery } from "@tanstack/react-query";

export const useGetAccountById = (accountId: string) => {
  const query = useQuery({
    queryKey: ["account", accountId],
    queryFn: () => getAccountById(accountId),
    enabled: !!accountId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return query;
};
