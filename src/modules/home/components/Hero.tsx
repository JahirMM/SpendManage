import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@supabase/supabase-js";
import { MoveRight } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  user: User | null;
  isLoading: boolean;
}

function Hero({ user, isLoading }: HeroProps) {
  return (
    <section className="flex flex-col items-center gap-10 pt-16">
      <div className="text-4xl font-bold text-center text-white sm:text-6xl xl:text-7xl">
        <p>
          Toma el control de <span className="text-secondary">tus</span>
        </p>
        <p className="text-secondary">gastos</p>
      </div>
      <p className="max-w-md text-sm text-center text-white xl:max-w-xl xl:text-base">
        Administra tus gastos, controla tus deudas y alcanza tus metas
        financieras con nuestra plataforma simple e intuitiva.
      </p>
      <div className="mt-5 space-x-4">
        {isLoading && (
          <div className="flex gap-4">
            <Skeleton className="h-11 w-32 rounded-md bg-white/20" />
            <Skeleton className="h-11 w-28 rounded-md bg-white/10" />
          </div>
        )}

        {!isLoading && !user && (
          <>
            <Button type="button" variant="default" size="lg">
              <Link href={"/login"} className="flex items-center gap-3 text-sm">
                Comenzar
                <MoveRight className="text-white size-4" />
              </Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="shadow-none bg-none text-sm"
            >
              <Link href={"/signup"} className="text-sm">
                Ingresar
              </Link>
            </Button>
          </>
        )}
        {!isLoading && user && (
          <Button type="button" variant="default" size="lg">
            <Link
              href={"/dashboard"}
              className="flex items-center gap-3 text-sm"
            >
              Dashboard
              <MoveRight className="text-white size-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="w-[90%] h-[450px] bg-blue-100 rounded-2xl xl:w-[75%]">
        dashboard image
      </div>
    </section>
  );
}

export default Hero;
