import { InsertAccountInterface } from "@/src/modules/addAccount/interfaces/insertAccountInterface";
import { insertAccountService } from "@/src/modules/addAccount/services/insertAccountService";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useInsertAccounts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: InsertAccountInterface) =>
      insertAccountService(request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["accounts", variables.user_id],
      });
      toast.success("Cuenta creada exitosamente");
    },
    onError: () => {
      toast.error("Error al crear la cuenta");
    },
  });
};
