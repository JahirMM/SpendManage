import { CreditCard } from "lucide-react";

function AccountCard() {
  return (
    <article className="p-4 flex flex-col justify-between bg-linear-to-br from-[#023048] to-[#023048]/90 rounded-xl md:max-w-[60%] md:mx-auto lg:min-w-[260px] lg:h-[358px] lg:p-3">
      <div className="flex justify-between">
        <span className="text-muted">Tarjeta</span>
        <CreditCard className="text-white size-5" />
      </div>
      <p className="mt-3 mb-8 text-lg text-white font-bold md:text-xl">
        Cuenta de lider
      </p>
      <div className="flex justify-between">
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm text-muted">Cierre día</span>
          <span className="text-sm font-bold text-white">26</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm text-muted">Pago día</span>
          <span className="text-sm font-bold text-white">05</span>
        </div>
      </div>
    </article>
  );
}

export default AccountCard;
