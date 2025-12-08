import { DollarSign } from "lucide-react";

interface MovementItemProps {
  title: string;
  date: string;
  quotas: number;
  amount: number;
}

function MovementItem({ title, date, quotas, amount }: MovementItemProps) {
  return (
    <div className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-gray-50">
      <div className="flex items-start gap-1">
        <span className="inline-block p-1 rounded-sm bg-secondary">
          <DollarSign className="text-black size-4" />
        </span>
        <div>
          <p className="text-sm text-black">{title}</p>
          {/* TODO: FORMATO -> 20 Nov 2024, 08:00 */}
          <span className="text-xs text-muted">{date}</span>
        </div>
      </div>
      <div className="hidden sm:block">
        <span className="text-sm">1/{quotas}</span>
      </div>
      <div>
        {/* 5.000,00 */}
        <span className="text-sm text-black">-${amount}</span>
      </div>
    </div>
  );
}

export default MovementItem;
