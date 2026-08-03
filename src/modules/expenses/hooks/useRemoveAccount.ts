import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAccount } from "@/src/modules/expenses/services/removeAccount";
import { RemoveAccountRequest } from "@/src/modules/expenses/interfaces/expenseApiInterfaces";
import { toast } from "sonner";

export const useRemoveAccount = (
  userId: string | null,
  month: number,
  year: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: RemoveAccountRequest) => removeAccount(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses", userId, month, year],
      });
      toast.success("Cuenta desvinculada");
    },
    onError: () => {
      toast.error("Error al quitar la cuenta");
    },
  });
};
