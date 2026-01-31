import { InsertAccountInterface } from "@/src/modules/addAccount/interfaces/insertAccountInterface";
import { insertAccountService } from "@/src/modules/addAccount/services/insertAccountService";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useInsertAccounts = () => {
  return useMutation({
    mutationFn: (request: InsertAccountInterface) =>
      insertAccountService(request),
    onSuccess: () => {
      toast.success("Cuenta creada exitosamente");
    },
    onError: () => {
      toast.error("Error al crear la cuenta");
    },
  });
};
