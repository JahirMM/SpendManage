import { useUserContext } from "@/src/shared/contexts/UserContext";
import { loginAction } from "../actions/loginAction";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LoginRequest {
  email: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  const { refetch } = useUserContext();

  return useMutation({
    mutationFn: async (request: LoginRequest) =>
      loginAction(request.email, request.password),
    onSuccess: async (result) => {
      if (!result.success) {
        if (result.errorType === "invalidCredentials") {
          toast.error("Credenciales inválidas", {
            description: result.error || "Verifica tu correo y contraseña",
            duration: 5000,
          });
        } else if (result.error) {
          toast.error("Error al iniciar sesión", {
            description: result.error,
          });
        }
        return;
      }

      // Login exitoso
      toast.success("¡Bienvenido!", {
        description: "Redirigiendo al dashboard...",
      });

      await refetch();

      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1000);
    },
    onError: (error: unknown) => {
      console.error("Error en login:", error);

      let errorMessage = "";
      if (error && typeof error === "object" && "error" in error) {
        errorMessage = String(error.error);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error("Error al iniciar sesión", {
        description: errorMessage || "Error desconocido",
      });
    },
  });
};
