"use server";

import { supabaseServer } from "@/src/shared/lib/supabaseServer";

export const getTotalMonthlyExpenses = async (
  accountId: string,
  currentDate: Date = new Date(),
): Promise<number> => {
  const supabase = await supabaseServer();

  // Obtener información de la cuenta
  const { data: account, error: accountError } = await supabase
    .from("accounts")
    .select("type, closing_date, payment_date")
    .eq("id", accountId)
    .single();

  if (accountError) {
    throw accountError;
  }

  // Obtener transacciones activas
  const { data: transactions, error: transactionsError } = await supabase
    .from("account_transactions")
    .select("*")
    .eq("account_id", accountId)
    .eq("is_active", true);

  if (transactionsError) {
    throw transactionsError;
  }

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  let totalMonthlyExpenses = 0;

  for (const transaction of transactions) {
    const transactionDate = new Date(transaction.transaction_date);
    const installmentAmount =
      transaction.total_amount / transaction.installment_count;

    // Calcular cuántos meses han pasado desde la transacción
    let monthsSinceTransaction =
      (currentYear - transactionDate.getFullYear()) * 12 +
      (currentMonth - transactionDate.getMonth());

    // Si es cuenta de tipo "card", ajustar según closing_date
    if (account.type === "card" && account.closing_date) {
      const transactionDay = transactionDate.getDate();

      // Si la transacción fue después del día de cierre, se pasa al mes siguiente
      if (transactionDay > account.closing_date) {
        monthsSinceTransaction -= 1;
      }
    }

    // Calcular en qué cuota estamos (empezando desde 0)
    const currentInstallment = monthsSinceTransaction;

    // Verificar si:
    // 1. La transacción ya comenzó (currentInstallment >= 0)
    // 2. Aún no termina de pagarse (currentInstallment < installment_count)
    if (
      currentInstallment >= 0 &&
      currentInstallment < transaction.installment_count
    ) {
      totalMonthlyExpenses += installmentAmount;
    }
  }

  return totalMonthlyExpenses;
};
