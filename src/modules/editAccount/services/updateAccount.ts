"use server";

import { supabaseServer } from "@/src/shared/lib/supabaseServer";

interface UpdateAccountPayload {
  title: string;
  description: string | null;
  type: string;
  closing_date: number | null;
  payment_date: number;
}

export const updateAccount = async (
  accountId: string,
  payload: UpdateAccountPayload,
): Promise<void> => {
  const supabase = await supabaseServer();

  const { error } = await supabase
    .from("accounts")
    .update(payload)
    .eq("id", accountId);

  if (error) {
    throw error;
  }
};
