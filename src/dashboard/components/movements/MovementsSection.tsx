import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MovementItem from "@/src/dashboard/components/movements/MovementItem";

function MovementsSection() {
  return (
    <Card className="border-none">
      <CardHeader className="py-0 md:py-0">
        <CardTitle className="text-base font-bold text-primary">
          Ultimos movimientos
        </CardTitle>
        <CardAction>
          <a href="" className="text-sm font-bold text-action">
            Todos
          </a>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="max-h-[276px] space-y-3 overflow-y-auto">
          <MovementItem
            title={"Supermercado"}
            date={"20 Nov 2024, 08:00"}
            quotas={4}
            amount={5000}
          />

          <MovementItem
            title={"Supermercado"}
            date={"20 Nov 2024, 08:00"}
            quotas={4}
            amount={5000}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default MovementsSection;
