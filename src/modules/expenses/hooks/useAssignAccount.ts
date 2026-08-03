import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignAccount } from "@/src/modules/expenses/services/assignAccount";
import { AssignAccountRequest } from "@/src/modules/expenses/interfaces/expenseApiInterfaces";
import { toast } from "sonner";

export const useAssignAccount = (
  userId: string | null,
  month: number,
  year: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AssignAccountRequest) => assignAccount(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses", userId, month, year],
      });
      toast.success("Cuenta asociada correctamente");
    },
    onError: () => {
      toast.error("Error al asociar la cuenta");
    },
  });
};
