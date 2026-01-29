import { signUpAction } from "../actions/signUpAction";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RequestInterfa {
  name: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (request: RequestInterfa) =>
      signUpAction(request.email, request.password, request.name),
    onSuccess: (result) => {
      // Solo manejar éxito aquí, errores los maneja el componente
      if (result.success) {
        toast.success("¡Cuenta creada exitosamente!", {
          description: "Redirigiendo al dashboard...",
        });

        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      }
      // No mostrar toast de error aquí, el componente lo maneja
    },
    onError: (error: unknown) => {
      console.error("Error en registro:", error);

      // Solo errores inesperados
      toast.error("Error inesperado", {
        description: "Por favor intenta nuevamente",
      });
    },
  });
};
