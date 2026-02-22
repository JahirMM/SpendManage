import { insertMovementService } from "../services/insertMovementService";
import { InsertMovementInterface } from "../interfaces/insertMovement";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useInsertMovement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: InsertMovementInterface) =>
      insertMovementService(request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["movements", variables.account_id],
      });
      toast.success("Movimiento agregado exitosamente");
    },
    onError: () => {
      toast.error("Error al agregar el movimiento");
    },
  });
};
