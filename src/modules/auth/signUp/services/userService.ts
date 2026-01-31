"use server";

import { supabaseServer } from "@/src/shared/lib/supabaseServer";

interface InserUserRequest {
  id: string;
  name: string;
}

export const userService = async (request: InserUserRequest) => {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("users").insert(request);

  if (error) {
    throw error;
  }

  return data;
};
