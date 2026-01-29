"use server";

import { supabaseServer } from "@/src/shared/lib/supabaseServer";
import { revalidatePath } from "next/cache";

interface LoginResult {
  success: boolean;
  error?: string;
  errorType?: "invalidCredentials" | "other";
}

export async function loginAction(
  email: string,
  password: string,
): Promise<LoginResult> {
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Detectar credenciales inválidas
    if (error.message.includes("Invalid login credentials")) {
      return {
        success: false,
        error: "Correo o contraseña incorrectos",
        errorType: "invalidCredentials",
      };
    }

    return {
      success: false,
      error: error.message,
      errorType: "other",
    };
  }

  if (!data.session) {
    return {
      success: false,
      error: "No se pudo crear la sesión",
      errorType: "other",
    };
  }

  // Revalidar caché
  revalidatePath("/", "layout");

  return {
    success: true,
  };
}
