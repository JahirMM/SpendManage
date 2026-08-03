"use server";

import {
  ApiResponse,
  AssignAccountRequest,
  ExpenseApiItem,
} from "@/src/modules/expenses/interfaces/expenseApiInterfaces";

export const assignAccount = async (
  request: AssignAccountRequest,
): Promise<ExpenseApiItem> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/assign-account`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    },
  );

  if (!res.ok) {
    throw new Error(`Error al asociar cuenta: ${res.status}`);
  }

  const json: ApiResponse<ExpenseApiItem> = await res.json();

  if (json.status === 0) {
    throw new Error(json.mensaje_error ?? "Error desconocido");
  }

  return json.data!;
};
