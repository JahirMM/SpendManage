"use client";

import { useLogout } from "@/src/modules/auth/logout/hooks/useLogout";
import { useGetUser } from "../hooks/useGetUser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrendingDown } from "lucide-react";

interface DashboardHeaderProps {
  userId: string;
}

function DashboardHeader({ userId }: DashboardHeaderProps) {
  const { mutateAsync } = useLogout();

  const handleLogout = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const { data: user } = useGetUser(userId);

  return (
    <header className="flex flex-wrap justify-between gap-3 items-center pb-6 pt-2 md:pb-4 xl:pt-10">
      <p className="text-xl">
        Bienvenido de nuevo, <span className="font-bold">{user?.name}</span>
      </p>
      <div className="flex items-center gap-2">
        <Link href="/expenses">
          <Button type="button" size="sm" variant="outline" className="gap-1.5 border-action text-action hover:bg-action/10 hover:text-action">
            <TrendingDown className="size-4" />
            Gastos del mes
          </Button>
        </Link>
        <Button type="button" size="sm" variant="default" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
}

export default DashboardHeader;
