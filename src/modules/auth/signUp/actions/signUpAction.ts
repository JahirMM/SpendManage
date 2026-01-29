"use server";

import { supabaseAdmin } from "@/src/shared/lib/supabaseAdmin";
import { supabaseServer } from "@/src/shared/lib/supabaseServer";
import { revalidatePath } from "next/cache";

interface SignUpResult {
  success: boolean;
  error?: string;
  errorType?: "emailAlreadyExists" | "other";
}

export async function signUpAction(
  email: string,
  password: string,
  name: string,
): Promise<SignUpResult> {
  try {
    // 1. Verificar si el usuario ya existe
    const { data: existingUsers, error: listError } =
      await supabaseAdmin.auth.admin.listUsers();

    if (listError) {
      console.error("Error al listar usuarios:", listError);
      return {
        success: false,
        error: "Error al verificar el usuario",
        errorType: "other",
      };
    }

    const userExists = existingUsers?.users.some((u) => u.email === email);

    if (userExists) {
      return {
        success: false,
        error:
          "Este correo electrónico ya está registrado. Por favor usa otro correo o inicia sesión.",
        errorType: "emailAlreadyExists",
      };
    }

    // 2. Crear usuario con Admin API (NO ENVÍA EMAIL, NO PKCE, NO RATE LIMIT)
    const { data: newUser, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: name,
        },
      });

    if (createError) {
      console.error("Error al crear usuario:", createError);
      return {
        success: false,
        error: createError.message,
        errorType: "other",
      };
    }

    if (!newUser.user) {
      return {
        success: false,
        error: "No se pudo crear el usuario",
        errorType: "other",
      };
    }

    // 3. Iniciar sesión automáticamente con el usuario creado
    const supabase = await supabaseServer();
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      console.error("Error al iniciar sesión:", signInError);
      return {
        success: false,
        error:
          "Usuario creado pero no se pudo iniciar sesión. Por favor inicia sesión manualmente.",
        errorType: "other",
      };
    }

    if (!signInData.session) {
      return {
        success: false,
        error: "No se pudo crear la sesión",
        errorType: "other",
      };
    }

    // 4. Revalidar y retornar éxito
    revalidatePath("/", "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error inesperado en signUpAction:", error);
    return {
      success: false,
      error: "Error inesperado al crear la cuenta",
      errorType: "other",
    };
  }
}
