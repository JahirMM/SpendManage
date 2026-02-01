import { logoutAction } from "@/src/modules/auth/logout/actions/logoutAction";
import { useUserContext } from "@/src/shared/contexts/UserContext";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  const { refetch } = useUserContext();

  return useMutation({
    mutationFn: async () => logoutAction(),
    onSuccess: async (result) => {
      if (!result.success) {
        toast.error("Error al cerrar sesión", {
          description: result.error,
        });
        return;
      }

      toast.success("Sesión cerrada", {
        description: "Hasta pronto",
      });

      await refetch();

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 500);
    },
    onError: (error: unknown) => {
      console.error("Error en logout:", error);
      toast.error("Error al cerrar sesión");
    },
  });
};
