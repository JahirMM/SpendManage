import { Button } from "@/components/ui/button";

function DashboardHeader() {
  return (
    <header className="flex flex-wrap justify-between gap-0-5 items-center pt-8 pb-6 md:pt-12 md:pb-4">
      <p className="text-xl">
        Bienvenido de nuevo, <span className="font-bold">Jahir</span>
      </p>
      <Button type="button" size="sm" variant="default">
        Cerrar sesión
      </Button>
    </header>
  );
}

export default DashboardHeader;
