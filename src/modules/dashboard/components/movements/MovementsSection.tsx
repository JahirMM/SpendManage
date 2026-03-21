import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import MovementItem from "@/src/modules/dashboard/components/movements/MovementItem";
import { useGerRecentTransactions } from "@/src/modules/dashboard/hooks/useGerRecentTransactions";
import { getActiveMovements } from "@/src/shared/lib/movementUtils";

function MovementsSection({ userId }: { userId: string }) {
  const { data: movements = [], isLoading } = useGerRecentTransactions(userId);

  const now = new Date();
  const refYear = now.getFullYear();
  const refMonth = now.getMonth();

  const activeMovements = getActiveMovements(movements, 30, refYear, refMonth);

  if (isLoading) {
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
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none">
      <CardHeader className="py-0 md:py-0">
        <CardTitle className="text-base font-bold text-primary">
          Ultimos movimientos
        </CardTitle>
        {/* <CardAction>
          <a href="" className="text-sm font-bold text-action">
            Todos
          </a>
        </CardAction> */}
      </CardHeader>
      <CardContent>
        <div className="max-h-[276px] space-y-3 overflow-y-auto">
          {activeMovements.length === 0 && (
            <p className="text-center text-muted-foreground">
              No hay movimientos
            </p>
          )}
          {activeMovements.length > 0 &&
            activeMovements.map((movement) => (
              <MovementItem
                key={movement.id}
                title={movement.title}
                date={movement.transaction_date}
                quotas={movement.installment_count}
                amount={movement.total_amount}
                accountId={movement.account_id}
                movement={movement}
              />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default MovementsSection;
