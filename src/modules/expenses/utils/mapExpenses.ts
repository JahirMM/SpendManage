import { ExpenseApiItem } from "@/src/modules/expenses/interfaces/expenseApiInterfaces";
import { DailyExpense, DailyExpenseItem } from "@/src/modules/expenses/interfaces/expensesInterfaces";

/**
 * Converts a flat list of ExpenseApiItem (from the API) into DailyExpense[]
 * grouped by day, ready to be consumed by the calendar and list components.
 *
 * API fields → UI fields:
 *   id          → id
 *   name        → title       (description of the expense)
 *   commerce    → subtitle    (stored as second line — we keep it in title when name is empty)
 *   count       → amount
 *   account_id  → accountId   (null = unassigned)
 *   created_at  → day         (extracted from ISO timestamp)
 *
 * Note: `card` (account title) cannot be resolved here because we only have
 * account_id. The parent component resolves it by matching against the accounts list.
 */
export function mapApiItemToExpenseItem(
  item: ExpenseApiItem,
  accountTitle: string | null,
): DailyExpenseItem {
  return {
    id: item.id,
    title: item.name || item.commerce,
    card: accountTitle,
    accountId: item.account_id,
    amount: item.count,
  };
}

export function groupExpensesByDay(
  items: ExpenseApiItem[],
  resolveAccountTitle: (accountId: string | null) => string | null,
): DailyExpense[] {
  const dayMap = new Map<number, DailyExpenseItem[]>();

  for (const item of items) {
    const date = new Date(item.created_at);
    const day = date.getDate();

    const expenseItem = mapApiItemToExpenseItem(
      item,
      resolveAccountTitle(item.account_id),
    );

    if (!dayMap.has(day)) {
      dayMap.set(day, []);
    }
    dayMap.get(day)!.push(expenseItem);
  }

  return Array.from(dayMap.entries())
    .map(([day, items]) => ({ day, items }))
    .sort((a, b) => a.day - b.day);
}

/**
 * Formats a day number into the DD-MM-YYYY string the API expects for POST /create.
 */
export function formatDayForApi(day: number, month: number, year: number): string {
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  return `${dd}-${mm}-${year}`;
}
