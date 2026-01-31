import { userService } from "@/src/modules/auth/signUp/services/userService";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUser = () => {
  return useMutation({
    mutationFn: (request: { id: string; name: string }) => userService(request),

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al crear el usuario`
          : "Error desconocido",
      );
    },
  });
};
