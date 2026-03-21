import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/getUser";

export const useGetUser = (userId: string | null) => {
  const query = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return query;
};
