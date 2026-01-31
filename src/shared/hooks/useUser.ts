"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserAction } from "@/src/shared/actions/getUserAction";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => getUserAction(),
    staleTime: 1000 * 60 * 5,
    // No reintentar si falla
    retry: false,
    // Refrescar cuando se vuelve a la pestaña
    refetchOnWindowFocus: true,
  });
};
