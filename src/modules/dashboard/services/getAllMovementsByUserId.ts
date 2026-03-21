"use server";

import { supabaseServer } from "@/src/shared/lib/supabaseServer";
import { MovementInterface } from "@/src/shared/interfaces/movement";

/**
 * Obtiene todos los movimientos de todas las cuentas del usuario.
 * Retorna un array de MovementInterface incluyendo el campo closing_date
 * de la cuenta a la que pertenece (para aplicar la regla del período).
 */
export const getAllMovementsByUserId = async (
  userId: string,
): Promise<(MovementInterface & { closing_date: number | null })[]> => {
  const supabase = await supabaseServer();

  // Join entre account_transactions y accounts filtrado por user_id
  const { data, error } = await supabase
    .from("account_transactions")
    .select(
      `
      *,
      accounts!inner(closing_date)
    `,
    )
    .eq("accounts.user_id", userId);

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    account_id: row.account_id,
    title: row.title,
    description: row.description,
    principal_amount: row.principal_amount,
    total_amount: row.total_amount,
    transaction_date: row.transaction_date,
    installment_count: row.installment_count,
    is_active: row.is_active,
    closing_date: (row.accounts as { closing_date: number | null })?.closing_date ?? null,
  }));
};
