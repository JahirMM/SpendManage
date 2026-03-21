import { MovementInterface } from "@/src/shared/interfaces/movement";
import { getPaidInstallments } from "@/src/shared/lib/movementUtils";
import { DollarSign } from "lucide-react";
import Link from "next/link";

interface MovementItemProps {
  title: string;
  date: string;
  quotas: number | null;
  amount: number;
  accountId: string;
  movement: MovementInterface;
}

function MovementItem({
  title,
  date,
  quotas,
  amount,
  accountId,
  movement,
}: MovementItemProps) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("es-CL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const now = new Date();
  const refYear = now.getFullYear();
  const refMonth = now.getMonth();

  const paidInstallments = getPaidInstallments(movement, 26, refYear, refMonth);

  const totalInstallments = movement.installment_count || 1;

  return (
    <Link
      href={`/accounts/${accountId}`}
      className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-gray-50"
    >
      <div className="flex items-start gap-1">
        <span className="inline-block p-1 rounded-sm bg-secondary">
          <DollarSign className="text-black size-4" />
        </span>
        <div>
          <p className="text-sm text-black">{title}</p>
          <span className="text-xs text-muted">{formatDate(date)}</span>
        </div>
      </div>
      <div className="hidden sm:block">
        <span className="text-sm">
          {paidInstallments}/{totalInstallments}
        </span>
      </div>
      <div>
        <span className="text-sm text-black">
          -${amount.toLocaleString("es-CL")}
        </span>
      </div>
    </Link>
  );
}

export default MovementItem;
