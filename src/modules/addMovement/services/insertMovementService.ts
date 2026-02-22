"use server";

import { InsertMovementInterface } from "../interfaces/insertMovement";
import { supabaseServer } from "@/src/shared/lib/supabaseServer";

export const insertMovementService = async (
  request: InsertMovementInterface,
) => {
  const supabase = await supabaseServer();

  const { error } = await supabase.from("account_transactions").insert(request);

  if (error) {
    throw error;
  }
};
