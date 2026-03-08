import { MovementInterface } from "@/src/shared/interfaces/movement";

/**
 * Determina el período de cobro (año, mes) de un movimiento según la fecha de cierre.
 *
 * Regla:
 *   - Si el día del movimiento es MENOR al día de cierre  → período = ese mismo mes/año
 *   - Si el día del movimiento es MAYOR O IGUAL al día de cierre → período = mes siguiente
 *
 * @param transactionDate  Fecha de la transacción (string ISO o Date)
 * @param closingDay       Día numérico de cierre de la cuenta (1-31). Si es null, se usa el mismo mes.
 * @returns { year, month } donde month va de 0 a 11 (como Date)
 */
export function getBillingPeriod(
  transactionDate: string | Date,
  closingDay: number | null,
): { year: number; month: number } {
  const date = new Date(transactionDate);
  const day = date.getUTCDate();
  const month = date.getUTCMonth(); // 0-indexed
  const year = date.getUTCFullYear();

  if (closingDay !== null && day >= closingDay) {
    // Mes siguiente
    const nextMonth = month + 1;
    if (nextMonth > 11) {
      return { year: year + 1, month: 0 };
    }
    return { year, month: nextMonth };
  }

  return { year, month };
}

/**
 * Retorna el monto de la cuota mensual del movimiento.
 * Si installment_count es 0 o 1, retorna total_amount.
 */
export function getInstallmentAmount(movement: MovementInterface): number {
  const count = movement.installment_count;
  if (!count || count <= 0) return movement.total_amount;
  return movement.total_amount / count;
}

/**
 * Calcula cuántas cuotas han sido pagadas desde el período de inicio del movimiento
 * hasta un mes de referencia dado (sin incluir el siguiente).
 *
 * @param movement        El movimiento
 * @param closingDay      Día de cierre de la cuenta
 * @param referenceYear   Año de referencia para contar cuotas pagadas
 * @param referenceMonth  Mes de referencia (0-indexed)
 */
export function getPaidInstallments(
  movement: MovementInterface,
  closingDay: number | null,
  referenceYear: number,
  referenceMonth: number,
): number {
  const billing = getBillingPeriod(movement.transaction_date, closingDay);

  // Meses totales desde el inicio del cobro hasta el período de referencia (inclusive)
  const totalMonthsDiff =
    (referenceYear - billing.year) * 12 + (referenceMonth - billing.month) + 1;

  if (totalMonthsDiff <= 0) return 0;

  const maxInstallments = movement.installment_count || 1;
  return Math.min(totalMonthsDiff, maxInstallments);
}

/**
 * Calcula el monto pendiente del movimiento a la fecha de referencia dada.
 */
export function getRemainingAmount(
  movement: MovementInterface,
  closingDay: number | null,
  referenceYear: number,
  referenceMonth: number,
): number {
  const paid = getPaidInstallments(
    movement,
    closingDay,
    referenceYear,
    referenceMonth,
  );
  const perInstallment = getInstallmentAmount(movement);
  const remaining = movement.total_amount - paid * perInstallment;
  return Math.max(0, remaining);
}

/**
 * Filtra los movimientos que tienen cobro activo en un período (year, month) determinado.
 * Un movimiento está activo en ese período si:
 *   1. Su período de inicio (getBillingPeriod) es ≤ al período dado.
 *   2. El número de cuotas pagadas en ese período no supera el total de cuotas.
 */
export function filterMovementsByPeriod(
  movements: MovementInterface[],
  closingDay: number | null,
  year: number,
  month: number,
): MovementInterface[] {
  return movements.filter((movement) => {
    const billing = getBillingPeriod(movement.transaction_date, closingDay);

    // El movimiento aún no empieza a cobrarse en este período
    const billingStart = billing.year * 12 + billing.month;
    const periodRef = year * 12 + month;
    if (billingStart > periodRef) return false;

    // El movimiento ya terminó (todas las cuotas pagadas antes de este período)
    const paid = getPaidInstallments(movement, closingDay, year, month);
    const maxInstallments = movement.installment_count || 1;
    // El movimiento tiene cuota en este período si las cuotas pagadas hasta ANTES de este período < total
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const paidBefore = getPaidInstallments(
      movement,
      closingDay,
      prevYear,
      prevMonth,
    );
    if (paidBefore >= maxInstallments) return false;

    // Si el paid actual > 0, tiene cuota en este período
    return paid > 0 && paid <= maxInstallments;
  });
}

/**
 * Calcula el resumen del período: total de movimientos activos y monto total a pagar.
 */
export function calculatePeriodSummary(
  movements: MovementInterface[],
  closingDay: number | null,
  year: number,
  month: number,
): { count: number; totalAmount: number } {
  const active = filterMovementsByPeriod(movements, closingDay, year, month);
  const perInstallment = getInstallmentAmount;

  const totalAmount = active.reduce((sum, m) => {
    return sum + perInstallment(m);
  }, 0);

  return { count: active.length, totalAmount };
}

/**
 * Retorna la cuota número que corresponde a un movimiento en el período dado.
 * (ej: "Cuota 2 de 6")
 */
export function getInstallmentNumberForPeriod(
  movement: MovementInterface,
  closingDay: number | null,
  year: number,
  month: number,
): number {
  return getPaidInstallments(movement, closingDay, year, month);
}

/**
 * Formatea un monto a pesos chilenos (CLP).
 */
export function formatCLP(amount: number): string {
  return amount.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
}

/**
 * Retorna el porcentaje de progreso de un movimiento (cuotas pagadas / total).
 */
export function getProgressPercent(
  movement: MovementInterface,
  closingDay: number | null,
  referenceYear: number,
  referenceMonth: number,
): number {
  const paid = getPaidInstallments(
    movement,
    closingDay,
    referenceYear,
    referenceMonth,
  );
  const total = movement.installment_count || 1;
  return Math.min(100, Math.round((paid / total) * 100));
}

/**
 * Determina si un movimiento está ACTIVO:
 * Tiene cuotas pendientes (incluyendo la cuota de este mes).
 */
export function isMovementActive(
  movement: MovementInterface,
  closingDay: number | null,
  refYear: number,
  refMonth: number,
): boolean {
  const billing = getBillingPeriod(movement.transaction_date, closingDay);
  const billingStart = billing.year * 12 + billing.month;
  const periodRef = refYear * 12 + refMonth;
  if (billingStart > periodRef) return false; // Aún no empieza
  const paid = getPaidInstallments(movement, closingDay, refYear, refMonth);
  const total = movement.installment_count || 1;
  return paid < total; // Tiene cuotas pendientes
}

/**
 * Determina si un movimiento está COMPLETADO:
 * Todas sus cuotas ya fueron pagadas hasta el período de referencia.
 */
export function isMovementCompleted(
  movement: MovementInterface,
  closingDay: number | null,
  refYear: number,
  refMonth: number,
): boolean {
  const billing = getBillingPeriod(movement.transaction_date, closingDay);
  const billingStart = billing.year * 12 + billing.month;
  const periodRef = refYear * 12 + refMonth;
  if (billingStart > periodRef) return false; // Ni siquiera empezó
  const paid = getPaidInstallments(movement, closingDay, refYear, refMonth);
  const total = movement.installment_count || 1;
  return paid >= total;
}

/** Retorna solo los movimientos activos */
export function getActiveMovements(
  movements: MovementInterface[],
  closingDay: number | null,
  refYear: number,
  refMonth: number,
): MovementInterface[] {
  return movements.filter((m) =>
    isMovementActive(m, closingDay, refYear, refMonth),
  );
}

/** Retorna solo los movimientos completados */
export function getCompletedMovements(
  movements: MovementInterface[],
  closingDay: number | null,
  refYear: number,
  refMonth: number,
): MovementInterface[] {
  return movements.filter((m) =>
    isMovementCompleted(m, closingDay, refYear, refMonth),
  );
}

/**
 * Calcula la deuda total restante de todos los movimientos activos.
 */
export function getTotalDebt(
  movements: MovementInterface[],
  closingDay: number | null,
  refYear: number,
  refMonth: number,
): number {
  return movements.reduce((sum, m) => {
    if (!isMovementActive(m, closingDay, refYear, refMonth)) return sum;
    return sum + getRemainingAmount(m, closingDay, refYear, refMonth);
  }, 0);
}

/**
 * Calcula el total a pagar este mes (suma de cuotas de movimientos activos en el período).
 */
export function getMonthlyPayment(
  movements: MovementInterface[],
  closingDay: number | null,
  refYear: number,
  refMonth: number,
): number {
  const { totalAmount } = calculatePeriodSummary(
    movements,
    closingDay,
    refYear,
    refMonth,
  );
  return totalAmount;
}

/**
 * Retorna los totales de los últimos N meses (incluyendo el actual).
 * Útil para gráfico de barras.
 */
export function getMonthlyTotals(
  movements: MovementInterface[],
  closingDay: number | null,
  refYear: number,
  refMonth: number,
  nMonths: number = 4,
): { label: string; total: number }[] {
  const MONTHS = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const result: { label: string; total: number }[] = [];
  for (let i = nMonths - 1; i >= 0; i--) {
    let m = refMonth - i;
    let y = refYear;
    while (m < 0) {
      m += 12;
      y -= 1;
    }
    const { totalAmount } = calculatePeriodSummary(movements, closingDay, y, m);
    result.push({ label: `${MONTHS[m]} ${y}`, total: totalAmount });
  }
  return result;
}
