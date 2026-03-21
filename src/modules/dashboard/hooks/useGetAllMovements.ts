import { getAllMovementsByUserId } from "@/src/modules/dashboard/services/getAllMovementsByUserId";
import { useQuery } from "@tanstack/react-query";

export const useGetAllMovements = (userId: string | null) => {
  return useQuery({
    queryKey: ["all-movements", userId],
    queryFn: () => getAllMovementsByUserId(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
