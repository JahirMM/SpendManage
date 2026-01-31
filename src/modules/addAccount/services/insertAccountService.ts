"use server";

import { InsertAccountInterface } from "@/src/modules/addAccount/interfaces/insertAccountInterface";
import { supabaseServer } from "@/src/shared/lib/supabaseServer";

export const insertAccountService = async (request: InsertAccountInterface) => {
  const supabase = await supabaseServer();

  const { error } = await supabase.from("accounts").insert(request);

  if (error) {
    throw error;
  }
};
