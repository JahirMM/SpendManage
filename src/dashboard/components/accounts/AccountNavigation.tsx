import { ChevronLeft, ChevronRight } from "lucide-react";

function AccountNavigation() {
  return (
    <div className="flex gap-3">
      <button type="button" className="cursor-pointer">
        <ChevronLeft className="text-black size-5" />
      </button>
      <button type="button" className="cursor-pointer">
        <ChevronRight className="text-black size-5" />
      </button>
    </div>
  );
}

export default AccountNavigation;
