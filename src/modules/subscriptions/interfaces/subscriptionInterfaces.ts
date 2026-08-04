export type SubscriptionCategory =
  | "streaming"
  | "music"
  | "gaming"
  | "productivity"
  | "cloud"
  | "fitness"
  | "education"
  | "other";

export type SubscriptionCycle = "weekly" | "monthly" | "yearly";

/**
 * 0 = Sunday, 1 = Monday, ..., 6 = Saturday
 * Used only when cycle === "weekly"
 */
export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Subscription {
  id: string;
  name: string;
  category: SubscriptionCategory;
  amount: number;
  cycle: SubscriptionCycle;
  /** Day of the month it renews (1-31). Used for monthly/yearly cycles. */
  payDay: number;
  /** Day of the week (0-6). Used only for weekly cycles. */
  weekDay?: WeekDay;
  /** Month it was originally started (1-12) */
  startMonth: number;
  /** Year it was originally started */
  startYear: number;
  /** Card label (e.g. "Tarjeta Santander"). Independent of dashboard accounts. */
  cardLabel: string | null;
  /** Color accent for the card (hex) */
  color: string;
  /** Whether it's currently active */
  active: boolean;
  /** Whether it's marked as favorite */
  favorite: boolean;
}

export interface MonthlySubscriptionView {
  month: number;
  year: number;
  subscriptions: Subscription[];
}
