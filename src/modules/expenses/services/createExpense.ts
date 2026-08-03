"use server";

import {
  ApiResponse,
  CreateExpenseRequest,
  ExpenseApiItem,
} from "@/src/modules/expenses/interfaces/expenseApiInterfaces";

export const createExpense = async (
  request: CreateExpenseRequest,
): Promise<ExpenseApiItem> => {
  console.log("[createExpense] request →", JSON.stringify(request));

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("[createExpense] error →", res.status, errorBody);
    throw new Error(`Error al crear gasto: ${res.status}`);
  }

  const json: ApiResponse<ExpenseApiItem> = await res.json();

  if (json.status === 0) {
    throw new Error(json.mensaje_error ?? "Error desconocido");
  }

  return json.data!;
};
