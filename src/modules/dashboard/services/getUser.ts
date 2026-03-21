"use server";

import { supabaseServer } from "@/src/shared/lib/supabaseServer";

export const getUser = async (userId: string) => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
