import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "@/src/modules/expenses/services/createExpense";
import { CreateExpenseRequest } from "@/src/modules/expenses/interfaces/expenseApiInterfaces";
import { toast } from "sonner";

export const useCreateExpense = (userId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateExpenseRequest) => createExpense(request),
    onSuccess: (_, variables) => {
      // Invalidate the query for the month/year of the created expense
      // day format is DD-MM-YYYY
      const [, mm, yyyy] = variables.day.split("-").map(Number);
      queryClient.invalidateQueries({
        queryKey: ["expenses", userId, mm, yyyy],
      });
      queryClient.invalidateQueries({
        queryKey: ["expenses-total", userId, mm, yyyy],
      });
      toast.success("Gasto agregado");
    },
    onError: () => {
      toast.error("Error al agregar el gasto");
    },
  });
};
