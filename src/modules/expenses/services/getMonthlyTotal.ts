"use server";

import {
  ApiResponse,
  GetMonthlyTotalRequest,
  MonthlyTotalApiResponse,
} from "@/src/modules/expenses/interfaces/expenseApiInterfaces";

export const getMonthlyTotal = async (
  request: GetMonthlyTotalRequest,
): Promise<MonthlyTotalApiResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/monthly-total`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    throw new Error(`Error al obtener total mensual: ${res.status}`);
  }

  const json: ApiResponse<MonthlyTotalApiResponse> = await res.json();

  if (json.status === 0) {
    throw new Error(json.mensaje_error ?? "Error desconocido");
  }

  return json.data!;
};
