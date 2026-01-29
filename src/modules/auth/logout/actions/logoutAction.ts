"use server";

import { supabaseServer } from "@/src/shared/lib/supabaseServer";
import { revalidatePath } from "next/cache";

interface LogoutResult {
  success: boolean;
  error?: string;
}

export async function logoutAction(): Promise<LogoutResult> {
  const supabase = await supabaseServer();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error al cerrar sesión:", error);
    return {
      success: false,
      error: error.message,
    };
  }

  // Revalidar todas las rutas para limpiar datos cacheados
  revalidatePath("/", "layout");

  return {
    success: true,
  };
}
