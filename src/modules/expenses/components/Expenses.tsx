"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

import MonthSelector from "@/src/modules/expenses/components/MonthSelector";
import DayCard from "@/src/modules/expenses/components/DayCard";
import DayExpenseModal from "@/src/modules/expenses/components/DayExpenseModal";
import ExpensesSummary from "@/src/modules/expenses/components/ExpensesSummary";
import ExpensesList from "@/src/modules/expenses/components/ExpensesList";
import AddExpenseDialog, {
  AddExpenseFormValues,
} from "@/src/modules/expenses/components/AddExpenseDialog";
import AssignAccountSheet from "@/src/modules/expenses/components/AssignAccountSheet";
import EditExpenseSheet from "@/src/modules/expenses/components/EditExpenseSheet";

import { useGetExpensesByDate } from "@/src/modules/expenses/hooks/useGetExpensesByDate";
import { useCreateExpense } from "@/src/modules/expenses/hooks/useCreateExpense";
import { useAssignAccount } from "@/src/modules/expenses/hooks/useAssignAccount";
import { useEditExpense } from "@/src/modules/expenses/hooks/useEditExpense";
import { useGetAccounts } from "@/src/modules/dashboard/hooks/useGetAccounts";
import { useUserContext } from "@/src/shared/contexts/UserContext";

import {
  groupExpensesByDay,
  formatDayForApi,
} from "@/src/modules/expenses/utils/mapExpenses";
import { MONTHS_ES } from "@/src/modules/expenses/data/mockExpenses";
import {
  DailyExpense,
  DailyExpenseItem,
} from "@/src/modules/expenses/interfaces/expensesInterfaces";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, AlertCircle } from "lucide-react";

const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

function buildMonthDays(
  month: number,
  year: number,
  serverDays: DailyExpense[],
): DailyExpense[] {
  const total = getDaysInMonth(month, year);
  const dayMap = new Map(serverDays.map((d) => [d.day, d]));
  return Array.from({ length: total }, (_, i) => {
    const day = i + 1;
    return dayMap.get(day) ?? { day, items: [] };
  });
}

function Expenses() {
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const { user } = useUserContext();
  const userId = user?.id ?? null;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Pre-filled day for the add dialog (set when clicking a calendar day)
  const [addDefaultDay, setAddDefaultDay] = useState(currentDay);

  const [selectedExpense, setSelectedExpense] =
    useState<DailyExpense | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [assignSheetItem, setAssignSheetItem] =
    useState<DailyExpenseItem | null>(null);
  const [editSheetItem, setEditSheetItem] =
    useState<DailyExpenseItem | null>(null);

  // ── Data fetching ──────────────────────────────────────────────────────────
  const {
    data: apiExpenses,
    isLoading: isLoadingExpenses,
    isError: isErrorExpenses,
  } = useGetExpensesByDate(userId, selectedMonth, selectedYear);

  const { data: accounts = [] } = useGetAccounts(userId);

  // ── Mutations ──────────────────────────────────────────────────────────────
  const { mutate: createExpense, isPending: isCreating } =
    useCreateExpense(userId);

  const { mutate: assignAccountMutation, isPending: isAssigning } =
    useAssignAccount(userId, selectedMonth, selectedYear);

  const { mutate: editExpenseMutation, isPending: isEditing } =
    useEditExpense(userId, selectedMonth, selectedYear);

  // ── Derived state ──────────────────────────────────────────────────────────
  const accountTitleMap = useMemo(
    () => new Map(accounts.map((a) => [a.id, a.title])),
    [accounts],
  );

  const serverDays = useMemo(
    () =>
      groupExpensesByDay(
        apiExpenses ?? [],
        (accountId) =>
          accountId ? (accountTitleMap.get(accountId) ?? null) : null,
      ),
    [apiExpenses, accountTitleMap],
  );

  const days = useMemo(
    () => buildMonthDays(selectedMonth, selectedYear, serverDays),
    [selectedMonth, selectedYear, serverDays],
  );

  const firstDayOffset = useMemo(() => {
    const jsDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    return (jsDay + 6) % 7;
  }, [selectedMonth, selectedYear]);

  // ── Navigation ─────────────────────────────────────────────────────────────
  const handlePrev = () => {
    const m = selectedMonth - 1 < 1 ? 12 : selectedMonth - 1;
    const y = selectedMonth - 1 < 1 ? selectedYear - 1 : selectedYear;
    setSelectedMonth(m);
    setSelectedYear(y);
  };

  const handleNext = () => {
    const m = selectedMonth + 1 > 12 ? 1 : selectedMonth + 1;
    const y = selectedMonth + 1 > 12 ? selectedYear + 1 : selectedYear;
    setSelectedMonth(m);
    setSelectedYear(y);
  };

  const isToday = (day: number) =>
    day === currentDay &&
    selectedMonth === currentMonth &&
    selectedYear === currentYear;

  // ── Calendar day click ─────────────────────────────────────────────────────
  // If the day has expenses → show detail modal
  // Long-press or separate "add" tap → open add dialog with that day pre-filled
  const handleDayClick = (expense: DailyExpense) => {
    setSelectedExpense(expense);
  };

  const handleDayLongPress = (day: number) => {
    setAddDefaultDay(day);
    setAddDialogOpen(true);
  };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleAddExpense = (values: AddExpenseFormValues) => {
    if (!userId) return;
    createExpense(
      {
        user_id: userId,
        name: values.title,
        commerce: values.commerce,
        count: values.amount,
        day: formatDayForApi(values.day, values.month, values.year),
        account_id: values.accountId ?? null,
      },
      {
        onSuccess: () => setAddDialogOpen(false),
      },
    );
  };

  const handleAssignAccount = (expenseId: string, accountId: string) => {
    if (!userId) return;
    assignAccountMutation(
      { user_id: userId, expense_id: expenseId, account_id: accountId },
      { onSuccess: () => setAssignSheetItem(null) },
    );
  };

  const handleEditExpense = (expenseId: string, values: { name?: string; count?: number }) => {
    if (!userId) return;
    editExpenseMutation(
      { user_id: userId, expense_id: expenseId, ...values },
      { onSuccess: () => setEditSheetItem(null) },
    );
  };

  // ── Skeleton ───────────────────────────────────────────────────────────────
  if (isLoadingExpenses) {
    return (
      <div className="max-w-5xl px-4 py-3 mx-auto md:max-w-3xl xl:p-0">
        <div className="flex items-center justify-between pb-6 pt-2 xl:pt-10">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="h-7 w-44" />
          </div>
          <Skeleton className="h-8 w-44 rounded-lg" />
        </div>
        <Skeleton className="h-72 w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-3 mt-3">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl mt-3" />
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (isErrorExpenses) {
    return (
      <div className="max-w-5xl px-4 py-3 mx-auto md:max-w-3xl xl:p-0">
        <div className="flex items-center gap-2 pb-6 pt-2 xl:pt-10">
          <Link href="/dashboard">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 rounded-lg"
            >
              <ChevronLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground">Gastos</h1>
        </div>
        <div className="rounded-xl border bg-card p-8 flex flex-col items-center text-center gap-3">
          <AlertCircle className="size-8 text-destructive" />
          <p className="text-sm font-semibold text-foreground">
            No se pudieron cargar los gastos
          </p>
          <p className="text-xs text-muted">
            Verifica tu conexión e intenta de nuevo
          </p>
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-5xl px-4 py-3 mx-auto md:max-w-3xl xl:p-0">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 pt-2 xl:pt-10">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 rounded-lg"
              aria-label="Volver al dashboard"
            >
              <ChevronLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground">
            Gastos — {MONTHS_ES[selectedMonth - 1]}
          </h1>
        </div>
        <MonthSelector
          month={selectedMonth}
          year={selectedYear}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>

      {/* ── Calendar ── */}
      <div className="rounded-xl border bg-card p-4 md:p-6">
        {/* Weekday header */}
        <div className="grid grid-cols-7 gap-1.5 mb-2 sm:gap-2">
          {WEEK_DAYS.map((d) => (
            <div
              key={d}
              className="text-center text-[10px] sm:text-xs font-semibold text-muted py-1 select-none"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`offset-${i}`} className="aspect-square" aria-hidden />
          ))}
          {days.map((expense) => {
            // Calculate which row this day falls on (0-based)
            const cellIndex = firstDayOffset + (expense.day - 1);
            const row = Math.floor(cellIndex / 7);
            return (
              <DayCard
                key={expense.day}
                expense={expense}
                isToday={isToday(expense.day)}
                row={row}
                onClick={() => handleDayClick(expense)}
                onAddClick={() => handleDayLongPress(expense.day)}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-border/60">
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded border border-action bg-action/10" />
            <span className="text-xs text-muted">Hoy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded border border-border bg-card" />
            <span className="text-xs text-muted">Con gastos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded border border-dashed border-border/60 bg-card/40" />
            <span className="text-xs text-muted">Sin gastos</span>
          </div>
          <p className="hidden text-xs text-muted md:block ml-auto">
            Hover para detalle · + para agregar
          </p>
          <p className="text-xs text-muted md:hidden ml-auto">
            Toca para detalle · + para agregar
          </p>
        </div>
      </div>

      {/* ── Summary cards ── */}
      <div className="mt-3">
        <ExpensesSummary days={days} />
      </div>

      {/* ── Expenses list ── */}
      <div className="mt-3 pb-8">
        <ExpensesList
          days={days}
          month={selectedMonth}
          year={selectedYear}
          onAddExpense={() => {
            setAddDefaultDay(currentDay);
            setAddDialogOpen(true);
          }}
          onExpenseClick={(item) => setAssignSheetItem(item)}
          onEditExpense={(item) => setEditSheetItem(item)}
        />
      </div>

      {/* ── Modals ── */}
      <DayExpenseModal
        expense={selectedExpense}
        month={selectedMonth}
        year={selectedYear}
        open={selectedExpense !== null}
        onClose={() => setSelectedExpense(null)}
      />

      <AddExpenseDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        accounts={accounts}
        defaultDay={addDefaultDay}
        defaultMonth={selectedMonth}
        defaultYear={selectedYear}
        isPending={isCreating}
        onAdd={handleAddExpense}
      />

      <AssignAccountSheet
        expense={assignSheetItem}
        accounts={accounts}
        open={assignSheetItem !== null}
        isPending={isAssigning}
        onClose={() => setAssignSheetItem(null)}
        onAssign={handleAssignAccount}
      />

      <EditExpenseSheet
        expense={editSheetItem}
        open={editSheetItem !== null}
        isPending={isEditing}
        onClose={() => setEditSheetItem(null)}
        onSave={handleEditExpense}
      />
    </div>
  );
}

export default Expenses;
