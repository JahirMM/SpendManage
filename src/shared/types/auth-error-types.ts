// ============================================
// TIPOS PARA ERRORES DE NEXT.JS
// ============================================

/**
 * Tipo para el error NEXT_REDIRECT que lanza Next.js
 * cuando se ejecuta redirect() en una Server Action
 */
export interface NextRedirectError extends Error {
  digest?: string;
  message: "NEXT_REDIRECT";
}

/**
 * Type guard para verificar si es un error de redirección
 */
export function isRedirectError(error: unknown): error is NextRedirectError {
  if (!error || typeof error !== "object") return false;

  const err = error as Partial<NextRedirectError>;

  return (
    err.message === "NEXT_REDIRECT" ||
    (typeof err.digest === "string" && err.digest.startsWith("NEXT_REDIRECT"))
  );
}

/**
 * Tipo para errores de Server Actions
 */
export interface ServerActionError {
  success: false;
  error: string;
}

/**
 * Type guard para verificar si es un error de Server Action
 */
export function isServerActionError(
  result: unknown,
): result is ServerActionError {
  return (
    typeof result === "object" &&
    result !== null &&
    "success" in result &&
    result.success === false &&
    "error" in result
  );
}
