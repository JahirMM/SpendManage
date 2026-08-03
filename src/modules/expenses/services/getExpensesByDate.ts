"use server";

import {
  ApiResponse,
  ExpenseApiItem,
  GetExpensesByDateRequest,
} from "@/src/modules/expenses/interfaces/expenseApiInterfaces";

export const getExpensesByDate = async (
  request: GetExpensesByDateRequest,
): Promise<ExpenseApiItem[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/by-date`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    throw new Error(`Error al obtener gastos: ${res.status}`);
  }

  const json: ApiResponse<ExpenseApiItem[]> = await res.json();

  if (json.status === 0) {
    throw new Error(json.mensaje_error ?? "Error desconocido");
  }

  return json.data ?? [];
};
