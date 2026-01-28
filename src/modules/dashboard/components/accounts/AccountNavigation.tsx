import { ChevronLeft, ChevronRight } from "lucide-react";

interface AccountNavigationProps {
  previous: () => void;
  next: () => void;
  accountsLength: number;
  selectedAccountIndex: number;
}

function AccountNavigation({
  previous,
  next,
  accountsLength,
  selectedAccountIndex,
}: AccountNavigationProps) {
  const isFirst = selectedAccountIndex === 0;
  const isLast = selectedAccountIndex === accountsLength - 1;

  return (
    <div className="flex gap-3">
      <button
        type="button"
        className="transition-opacity cursor-pointer hover:opacity-70"
        onClick={previous}
        disabled={isFirst}
        aria-label="Cuenta anterior"
      >
        <ChevronLeft
          className={`${isFirst ? "text-gray-400" : "text-black"} size-5`}
        />
      </button>
      <button
        type="button"
        className="transition-opacity cursor-pointer hover:opacity-70"
        onClick={next}
        disabled={isLast}
        aria-label="Siguiente cuenta"
      >
        <ChevronRight
          className={`${isLast ? "text-gray-400" : "text-black"} size-5`}
        />
      </button>
    </div>
  );
}

export default AccountNavigation;
