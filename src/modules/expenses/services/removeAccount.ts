"use server";

import {
  ApiResponse,
  ExpenseApiItem,
  RemoveAccountRequest,
} from "@/src/modules/expenses/interfaces/expenseApiInterfaces";

export const removeAccount = async (
  request: RemoveAccountRequest,
): Promise<ExpenseApiItem> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/remove-account`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    },
  );

  if (!res.ok) {
    throw new Error(`Error al quitar cuenta: ${res.status}`);
  }

  const json: ApiResponse<ExpenseApiItem> = await res.json();

  if (json.status === 0) {
    throw new Error(json.mensaje_error ?? "Error desconocido");
  }

  return json.data!;
};
