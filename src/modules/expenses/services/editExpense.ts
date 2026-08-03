"use server";

import {
  ApiResponse,
  ExpenseApiItem,
} from "@/src/modules/expenses/interfaces/expenseApiInterfaces";

export interface EditExpenseRequest {
  user_id: string;
  expense_id: string;
  name?: string;
  count?: number;
}

export const editExpense = async (
  request: EditExpenseRequest,
): Promise<ExpenseApiItem> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/edit`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    },
  );

  if (!res.ok) {
    throw new Error(`Error al editar gasto: ${res.status}`);
  }

  const json: ApiResponse<ExpenseApiItem> = await res.json();

  if (json.status === 0) {
    throw new Error(json.mensaje_error ?? "Error desconocido");
  }

  return json.data!;
};
