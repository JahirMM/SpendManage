import { getMovementsByAccountId } from "../services/getMovementsByAccountId";
import { useQuery } from "@tanstack/react-query";

export const useGetMovementsByAccountId = (accountId: string) => {
  return useQuery({
    queryKey: ["movements", accountId],
    queryFn: () => getMovementsByAccountId(accountId),
    staleTime: 60 * 60 * 1000,
    retry: false,
  });
};
