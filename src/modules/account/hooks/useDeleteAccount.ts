import { deleteAccount } from "@/src/modules/account/services/deleteAccount";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountId: string) => deleteAccount(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
