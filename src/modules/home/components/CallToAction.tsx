import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

interface CallToActionProps {
  user: User | null;
  isLoading: boolean;
}

function CallToAction({ user, isLoading }: CallToActionProps) {
  return (
    <section className="mb-10 space-y-4 text-center mt-30">
      <p className="text-3xl font-bold text-primary lg:text-5xl">
        Comienza a controlar tus gastos hoy
      </p>
      <p className="text-base">Únete y toma control de tus finanzas</p>
      {isLoading && (
        <div className="flex justify-center pt-2">
          <Skeleton className="h-11 w-40 rounded-md" />
        </div>
      )}
      {!isLoading && user && (
        <Button variant="default" size="lg" type="button">
          <Link href={"/dashboard"}>Dashboard</Link>
        </Button>
      )}
      {!isLoading && !user && (
        <Button variant="default" size="lg" type="button">
          <Link href={"/signup"}>Comienza ahora</Link>
        </Button>
      )}
    </section>
  );
}

export default CallToAction;
