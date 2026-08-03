import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editExpense, EditExpenseRequest } from "@/src/modules/expenses/services/editExpense";
import { toast } from "sonner";

export const useEditExpense = (
  userId: string | null,
  month: number,
  year: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: EditExpenseRequest) => editExpense(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses", userId, month, year],
      });
      toast.success("Gasto actualizado");
    },
    onError: () => {
      toast.error("Error al actualizar el gasto");
    },
  });
};
