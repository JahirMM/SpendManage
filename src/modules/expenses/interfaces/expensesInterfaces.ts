export interface DailyExpenseItem {
  id: string;
  title: string;
  card: string | null;       // account title — null when not yet assigned
  accountId: string | null;  // null when the expense arrived without an account (e.g. from phone)
  amount: number;
}

export interface DailyExpense {
  day: number;
  items: DailyExpenseItem[];
}

export interface MonthlyExpenses {
  month: number; // 1-12
  year: number;
  days: DailyExpense[];
}
