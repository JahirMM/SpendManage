import { useState, useMemo } from "react";
import {
  MOCK_SUBSCRIPTIONS,
} from "@/src/modules/subscriptions/data/mockSubscriptions";
import { Subscription } from "@/src/modules/subscriptions/interfaces/subscriptionInterfaces";

export interface DaySubscription {
  day: number;
  subscriptions: Subscription[];
}

/**
 * Calculates which days in a given month have subscription payments.
 * - monthly: hits on payDay each month
 * - yearly: hits only on payDay of its startMonth
 * - weekly: hits on every occurrence of its weekDay in the month
 */
function getSubscriptionDaysForMonth(
  subscriptions: Subscription[],
  month: number,
  year: number,
): DaySubscription[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  const dayMap = new Map<number, Subscription[]>();

  for (const sub of subscriptions) {
    if (!sub.active) continue;

    if (sub.cycle === "monthly") {
      // Monthly: same day every month
      const day = Math.min(sub.payDay, daysInMonth);
      if (!dayMap.has(day)) dayMap.set(day, []);
      dayMap.get(day)!.push(sub);
    } else if (sub.cycle === "yearly") {
      // Yearly: only on its start month
      if (sub.startMonth === month) {
        const day = Math.min(sub.payDay, daysInMonth);
        if (!dayMap.has(day)) dayMap.set(day, []);
        dayMap.get(day)!.push(sub);
      }
    } else if (sub.cycle === "weekly") {
      // Weekly: every occurrence of weekDay in this month
      const targetWeekDay = sub.weekDay ?? 1;
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month - 1, d);
        if (date.getDay() === targetWeekDay) {
          if (!dayMap.has(d)) dayMap.set(d, []);
          dayMap.get(d)!.push(sub);
        }
      }
    }
  }

  // Build full month array
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return { day, subscriptions: dayMap.get(day) ?? [] };
  });
}

/**
 * Temporary hook using hardcoded data.
 * Will be replaced by a React Query hook consuming an API.
 */
export function useSubscriptions(month: number, year: number) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(MOCK_SUBSCRIPTIONS);

  /** All active subscriptions (regardless of month) */
  const activeSubscriptions = useMemo(
    () => subscriptions.filter((s) => s.active),
    [subscriptions],
  );

  /** Days in this month with their subscriptions mapped */
  const calendarDays = useMemo(
    () => getSubscriptionDaysForMonth(subscriptions, month, year),
    [subscriptions, month, year],
  );

  /** Flat list of subscriptions active this month (for cards) */
  const activeThisMonth = useMemo(() => {
    return subscriptions.filter((sub) => {
      if (!sub.active) return false;
      if (sub.cycle === "monthly" || sub.cycle === "weekly") return true;
      return sub.startMonth === month;
    });
  }, [subscriptions, month]);

  const totalMonthly = useMemo(() => {
    return calendarDays.reduce(
      (sum, day) => sum + day.subscriptions.reduce((s, sub) => s + sub.amount, 0),
      0,
    );
  }, [calendarDays]);

  /** Next upcoming payment from today */
  const nextPayment = useMemo(() => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    if (month !== currentMonth || year !== currentYear) return null;

    const upcoming = calendarDays
      .filter((d) => d.day >= currentDay && d.subscriptions.length > 0)
      .sort((a, b) => a.day - b.day);

    return upcoming[0]?.subscriptions[0] ?? null;
  }, [calendarDays, month, year]);

  const addSubscription = (sub: Omit<Subscription, "id">) => {
    const newSub: Subscription = {
      ...sub,
      id: `sub-${Date.now()}`,
    };
    setSubscriptions((prev) => [...prev, newSub]);
  };

  const removeSubscription = (id: string) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleSubscription = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)),
    );
  };

  const editSubscription = (updated: Subscription) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s)),
    );
  };

  const toggleFavorite = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s)),
    );
  };

  /** Active subscriptions marked as favorite */
  const favorites = useMemo(
    () => subscriptions.filter((s) => s.active && s.favorite),
    [subscriptions],
  );

  return {
    subscriptions,
    activeSubscriptions,
    activeThisMonth,
    favorites,
    calendarDays,
    totalMonthly,
    nextPayment,
    addSubscription,
    removeSubscription,
    toggleSubscription,
    editSubscription,
    toggleFavorite,
    isLoading: false,
    isError: false,
  };
}
