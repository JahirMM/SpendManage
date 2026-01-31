"use server";

import { supabaseServer } from "@/src/shared/lib/supabaseServer";

export async function getUserAction() {
  const supabase = await supabaseServer();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }

  return user;
}
