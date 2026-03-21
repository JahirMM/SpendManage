"use client";

import { useGetAllMovements } from "@/src/modules/dashboard/hooks/useGetAllMovements";
import { useGetAccounts } from "@/src/modules/dashboard/hooks/useGetAccounts";
import {
  getActiveMovements,
  getTotalDebt,
  getMonthlyPayment,
} from "@/src/shared/lib/movementUtils";
import { MovementInterface } from "@/src/shared/interfaces/movement";

/** Movimiento extendido que incluye el closing_date de su cuenta */
type MovementWithClosing = MovementInterface & { closing_date: number | null };

/**
 * Agrupa los movimientos por cuenta y para cada grupo llama a la
 * función utilitaria con el closingDay correcto de esa cuenta.
 */
function aggregateAcrossAccounts<T extends number | MovementInterface[]>(
  movements: MovementWithClosing[],
  refYear: number,
  refMonth: number,
  fn: (
    group: MovementInterface[],
    closingDay: number | null,
    y: number,
    m: number,
  ) => T,
  combine: (results: T[]) => T,
): T {
  // Agrupar por account_id → closingDay
  const groups = new Map<
    string,
    { closingDay: number | null; items: MovementInterface[] }
  >();
  for (const m of movements) {
    const key = m.account_id;
    if (!groups.has(key)) {
      groups.set(key, { closingDay: m.closing_date, items: [] });
    }
    groups.get(key)!.items.push(m);
  }
  const results: T[] = [];
  for (const { closingDay, items } of groups.values()) {
    results.push(fn(items, closingDay, refYear, refMonth));
  }
  return combine(results);
}

export function useDashboardStats(userId: string | null) {
  const { data: allMovements = [], isLoading: movLoading } =
    useGetAllMovements(userId);
  const { data: accounts = [], isLoading: accLoading } = useGetAccounts(userId);

  const isLoading = movLoading || accLoading;

  const now = new Date();
  const refYear = now.getFullYear();
  const refMonth = now.getMonth();
  const prevMonth = refMonth === 0 ? 11 : refMonth - 1;
  const prevYear = refMonth === 0 ? refYear - 1 : refYear;

  const movements = allMovements as MovementWithClosing[];

  // ── Total deuda (suma de remaining de todos los activos de todas las cuentas)
  const totalDebt = aggregateAcrossAccounts(
    movements,
    refYear,
    refMonth,
    (g, c, y, m) => getTotalDebt(g, c, y, m),
    (results) => (results as number[]).reduce((a, b) => a + b, 0),
  ) as number;

  // ── Pago total este mes (suma de cuotas del período actual de todas las cuentas)
  const monthlyPaymentCurrent = aggregateAcrossAccounts(
    movements,
    refYear,
    refMonth,
    (g, c, y, m) => getMonthlyPayment(g, c, y, m),
    (results) => (results as number[]).reduce((a, b) => a + b, 0),
  ) as number;

  // ── Pago total mes anterior (para ReductionCard)
  const monthlyPaymentPrev = aggregateAcrossAccounts(
    movements,
    prevYear,
    prevMonth,
    (g, c, y, m) => getMonthlyPayment(g, c, y, m),
    (results) => (results as number[]).reduce((a, b) => a + b, 0),
  ) as number;

  // ── Movimientos activos totales (únicos, suma de todos grupos)
  const totalActiveMovements = aggregateAcrossAccounts(
    movements,
    refYear,
    refMonth,
    (g, c, y, m) => getActiveMovements(g, c, y, m),
    (results) => (results as MovementInterface[][]).flat(),
  ) as MovementInterface[];

  // ── Cuentas con al menos 1 movimiento activo
  const accountsWithActive = accounts.filter((account) => {
    const accountMovements = movements.filter(
      (m) => m.account_id === account.id,
    );
    if (accountMovements.length === 0) return false;
    const closingDay = accountMovements[0].closing_date;
    return (
      getActiveMovements(accountMovements, closingDay, refYear, refMonth)
        .length > 0
    );
  });

  // ── Cuentas sin movimientos activos (libres)
  const freeAccounts = accounts.filter((account) => {
    const accountMovements = movements.filter(
      (m) => m.account_id === account.id,
    );
    if (accountMovements.length === 0) return true;
    const closingDay = accountMovements[0].closing_date;
    return (
      getActiveMovements(accountMovements, closingDay, refYear, refMonth)
        .length === 0
    );
  });

  // ── Diferencia mes actual vs anterior
  const monthDiff = monthlyPaymentCurrent - monthlyPaymentPrev;

  return {
    isLoading,
    totalDebt,
    monthlyPaymentCurrent,
    monthlyPaymentPrev,
    monthDiff,
    activeMovementsCount: totalActiveMovements.length,
    accountsWithActiveCount: accountsWithActive.length,
    freeAccountsCount: freeAccounts.length,
  };
}
