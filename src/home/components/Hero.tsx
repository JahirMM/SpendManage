import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

function Hero() {
  return (
    <div className="flex flex-col items-center gap-10 pt-10">
      <div className="font-bold text-center text-white text-7xl">
        <p>
          Toma el control de <span className="text-secondary">tus</span>
        </p>
        <p className="text-secondary">gastos</p>
      </div>
      <p className="max-w-xl text-base text-center text-white">
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
      
      <div className="w-[75%] h-[450px] bg-blue-100 rounded-2xl">
        dashboard image
      </div>
    </div>
  );
}

export default Hero;
