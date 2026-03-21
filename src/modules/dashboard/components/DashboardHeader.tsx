"use client";

import { useLogout } from "@/src/modules/auth/logout/hooks/useLogout";
import { useGetUser } from "../hooks/useGetUser";
import { Button } from "@/components/ui/button";

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
    <header className="flex flex-wrap justify-between gap-0-5 items-center pb-6 pt-2 md:pb-4 xl:pt-10">
      <p className="text-xl">
        Bienvenido de nuevo, <span className="font-bold">{user?.name}</span>
      </p>
      <Button type="button" size="sm" variant="default" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </header>
  );
}

export default DashboardHeader;
