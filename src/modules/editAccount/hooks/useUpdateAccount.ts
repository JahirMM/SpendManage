import { updateAccount } from "@/src/modules/editAccount/services/updateAccount";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useUpdateAccount = (accountId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      title: string;
      description: string | null;
      type: string;
      closing_date: number | null;
      payment_date: number;
    }) => updateAccount(accountId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", accountId] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
