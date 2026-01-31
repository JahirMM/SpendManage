"use server";

import { supabaseServer } from "@/src/shared/lib/supabaseServer";
import { AccountInterface } from "../interfaces/accountInterface";

export const getAccounts = async (
  userId: string,
): Promise<AccountInterface[]> => {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data ?? [];
};
