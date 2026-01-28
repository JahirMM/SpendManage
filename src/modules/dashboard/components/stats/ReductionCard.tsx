import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

function ReductionCard() {
  return (
    <Card className="border-none bg-primary">
      <CardHeader>
        <CardTitle className="text-base text-muted">
          Reducción vs mes pasado
        </CardTitle>
      </CardHeader>
      <CardContent className="text-white">
        <span className="mr-1 text-base font-semibold">$</span>
        <span className="text-2xl font-bold md:text-[28px]">300.000,00</span>
      </CardContent>
      <CardFooter className="mt-5 space-x-2 text-xs">
        <span className="inline-flex items-center gap-1 px-2 py-1 font-bold text-black rounded-lg bg-secondary">
          <Plus className="size-3" /> 50.000,00
        </span>
        <span className="text-muted">vs mes anterior</span>
      </CardFooter>
    </Card>
  );
}

export default ReductionCard;
