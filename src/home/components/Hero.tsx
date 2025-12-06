import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

function Hero() {
  return (
    <div className="flex flex-col items-center gap-10 pt-10">
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
        <Button type="button" variant="default" size="lg">
          <a href="" className="flex items-center gap-3 text-sm">
            Comenzar
            <MoveRight className="text-white size-4" />
          </a>
        </Button>

        <Button type="button" variant="outline" size="lg" className="shadow-none bg-none">
          <a href="" className="text-sm">
            Ingresar
          </a>
        </Button>
      </div>
      
      <div className="w-[90%] h-[450px] bg-blue-100 rounded-2xl xl:w-[75%]">
        dashboard image
      </div>
    </div>
  );
}

export default Hero;
