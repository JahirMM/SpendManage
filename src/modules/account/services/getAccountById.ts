"use server";

import { AccountInterface } from "@/src/modules/dashboard/interfaces/accountInterface";
import { supabaseServer } from "@/src/shared/lib/supabaseServer";

export const getAccountById = async (
  accountId: string,
): Promise<AccountInterface> => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("id", accountId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
