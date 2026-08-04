"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

import SubscriptionCard from "@/src/modules/subscriptions/components/SubscriptionCard";
import SubscriptionSummary from "@/src/modules/subscriptions/components/SubscriptionSummary";
import SubscriptionDayCell from "@/src/modules/subscriptions/components/SubscriptionDayCell";
import UpcomingPayments from "@/src/modules/subscriptions/components/UpcomingPayments";
import FavoriteSubscriptions from "@/src/modules/subscriptions/components/FavoriteSubscriptions";
import DayDetailDialog from "@/src/modules/subscriptions/components/DayDetailDialog";
import AddSubscriptionDialog from "@/src/modules/subscriptions/components/AddSubscriptionDialog";
import EditSubscriptionDialog from "@/src/modules/subscriptions/components/EditSubscriptionDialog";
import MonthSelector from "@/src/modules/subscriptions/components/MonthSelector";

import { useSubscriptions, DaySubscription } from "@/src/modules/subscriptions/hooks/useSubscriptions";
import { MONTHS_ES } from "@/src/modules/subscriptions/data/mockSubscriptions";
import { Subscription, SubscriptionCategory } from "@/src/modules/subscriptions/interfaces/subscriptionInterfaces";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const CATEGORY_FILTERS: { key: SubscriptionCategory | "all"; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "streaming", label: "Streaming" },
  { key: "music", label: "Música" },
  { key: "gaming", label: "Gaming" },
  { key: "productivity", label: "Productividad" },
  { key: "cloud", label: "Nube" },
  { key: "fitness", label: "Fitness" },
  { key: "education", label: "Educación" },
  { key: "other", label: "Otro" },
];

function Subscriptions() {
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDefaultDay, setAddDefaultDay] = useState(currentDay);
  const [editSubscriptionData, setEditSubscriptionData] = useState<Subscription | null>(null);
  const [dayDetailData, setDayDetailData] = useState<DaySubscription | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<SubscriptionCategory | "all">("all");

  const {
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
  } = useSubscriptions(selectedMonth, selectedYear);

  const isCurrentMonth = selectedMonth === currentMonth && selectedYear === currentYear;

  // ── Calendar offset (first day of month) ──────────────────────────────────
  const firstDayOffset = useMemo(() => {
    const jsDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    return (jsDay + 6) % 7; // Monday = 0
  }, [selectedMonth, selectedYear]);

  const isToday = (day: number) =>
    day === currentDay && isCurrentMonth;

  // ── Filter ───────────────────────────────────────────────────────────────
  const filteredSubscriptions = useMemo(() => {
    if (categoryFilter === "all") return activeThisMonth;
    return activeThisMonth.filter((s) => s.category === categoryFilter);
  }, [activeThisMonth, categoryFilter]);

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

  // ── Day click handlers ─────────────────────────────────────────────────────
  const handleDayClick = (dayData: DaySubscription) => {
    if (dayData.subscriptions.length > 0) {
      setDayDetailData(dayData);
    }
  };

  const handleDayAddClick = (day: number) => {
    setAddDefaultDay(day);
    setAddDialogOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-3 md:max-w-3xl xl:max-w-5xl xl:p-0">
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
            Suscripciones — {MONTHS_ES[selectedMonth - 1]}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <MonthSelector
            month={selectedMonth}
            year={selectedYear}
            onPrev={handlePrev}
            onNext={handleNext}
          />
          <Button
            type="button"
            onClick={() => setAddDialogOpen(true)}
            className="rounded-xl gap-1.5"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Agregar</span>
          </Button>
        </div>
      </div>

      {/* ── Content: single column stacked sections ── */}
      <div className="space-y-6">
        {/* 1. Summary stats */}
        <SubscriptionSummary
          activeCount={activeThisMonth.length}
          totalMonthly={totalMonthly}
        />

        {/* 2. Favorites */}
        <FavoriteSubscriptions favorites={favorites} />

        {/* 2. Calendar grid */}
        <div className="rounded-2xl border bg-card p-4 md:p-6">
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
            {/* Empty offset cells */}
            {Array.from({ length: firstDayOffset }, (_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Actual days */}
            {calendarDays.map((dayData) => {
              const row = Math.floor(
                (dayData.day - 1 + firstDayOffset) / 7,
              );
              return (
                <SubscriptionDayCell
                  key={dayData.day}
                  dayData={dayData}
                  isToday={isToday(dayData.day)}
                  row={row}
                  onClick={() => handleDayClick(dayData)}
                  onAddClick={() => handleDayAddClick(dayData.day)}
                />
              );
            })}
          </div>
        </div>

        {/* 3. Próximos a pagar */}
        <UpcomingPayments
          subscriptions={activeThisMonth}
          currentDay={currentDay}
          isCurrentMonth={isCurrentMonth}
        />

        {/* 4. Todas las suscripciones */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-base font-bold text-foreground">
              Todas las suscripciones
            </h2>
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
            <Filter className="size-4 text-muted shrink-0" />
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setCategoryFilter(f.key)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border",
                  categoryFilter === f.key
                    ? "bg-primary text-white border-primary"
                    : "bg-card text-muted border-border hover:border-action/40",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          {filteredSubscriptions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubscriptions
                .sort((a, b) => a.payDay - b.payDay)
                .map((sub) => (
                  <SubscriptionCard
                    key={sub.id}
                    subscription={sub}
                    isNextPayment={nextPayment?.id === sub.id}
                    currentDay={isCurrentMonth ? currentDay : 0}
                    onToggle={toggleSubscription}
                    onRemove={removeSubscription}
                    onEdit={setEditSubscriptionData}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
            </div>
          ) : (
            <div className="rounded-2xl border bg-card p-8 flex flex-col items-center text-center gap-3">
              <p className="text-sm font-semibold text-foreground">
                No hay suscripciones en esta categoría
              </p>
              <p className="text-xs text-muted">
                Prueba cambiando el filtro o agrega una nueva
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Dialogs ── */}
      <DayDetailDialog
        open={!!dayDetailData}
        onClose={() => setDayDetailData(null)}
        dayData={dayDetailData}
        month={selectedMonth}
        year={selectedYear}
      />

      <AddSubscriptionDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={addSubscription}
        defaultDay={addDefaultDay}
      />

      <EditSubscriptionDialog
        open={!!editSubscriptionData}
        subscription={editSubscriptionData}
        onClose={() => setEditSubscriptionData(null)}
        onSave={editSubscription}
      />
    </div>
  );
}

export default Subscriptions;
