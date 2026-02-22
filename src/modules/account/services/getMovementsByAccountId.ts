"use server";

import { MovementInterface } from "@/src/shared/interfaces/movement";
import { supabaseServer } from "@/src/shared/lib/supabaseServer";

export const getMovementsByAccountId = async (
  accountId: string,
): Promise<MovementInterface[]> => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("account_transactions")
    .select("*")
    .eq("account_id", accountId);

  if (error) {
    throw error;
  }

  return data;
};
