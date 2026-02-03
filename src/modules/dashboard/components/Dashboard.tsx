"use client";

import MovementsSection from "@/src/modules/dashboard/components/movements/MovementsSection";

import AccountsSection from "@/src/modules/dashboard/components/accounts/AccountsSection";

import TotalExpenseCard from "@/src/modules/dashboard/components/stats/TotalExpenseCard";
import ReductionCard from "@/src/modules/dashboard/components/stats/ReductionCard";
import StatsGrid from "@/src/modules/dashboard/components/stats/StatsGrid";

import ExpensesChart from "@/src/modules/dashboard/components/charts/ExpensesChart";

import DashboardSkeleton from "@/src/modules/dashboard/skeletons/DashboardSkeleton";
import DashboardHeader from "@/src/modules/dashboard/components/DashboardHeader";
import { useUserContext } from "@/src/shared/contexts/UserContext";

function Dashboard() {
  const { user, isLoading: isUserLoading } = useUserContext();

  if (isUserLoading || !user) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="max-w-5xl px-4 py-3 mx-auto md:max-w-7xl xl:p-0">
      <DashboardHeader />
      <div className="grid grid-cols-1 gap-3 mt-5 lg:grid-cols-3">
        <section className="flex flex-col gap-3">
          <TotalExpenseCard />

          <ExpensesChart className="h-96 lg:hidden" />

          <AccountsSection userId={user.id} />
        </section>

        <section className="space-y-3 md:grid md:grid-cols-2 md:gap-3 lg:col-start-2 lg:col-end-4 lg:space-y-0">
          <div className="space-y-3">
            <ReductionCard />
            <StatsGrid />
          </div>

          <MovementsSection />

          <ExpensesChart className="hidden h-96 col-start-1 col-end-3 lg:block" />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
