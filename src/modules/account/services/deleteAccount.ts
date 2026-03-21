"use server";

import { supabaseServer } from "@/src/shared/lib/supabaseServer";

export const deleteAccount = async (accountId: string): Promise<void> => {
  const supabase = await supabaseServer();

  const { error } = await supabase
    .from("accounts")
    .delete()
    .eq("id", accountId);

  if (error) {
    throw error;
  }
};
