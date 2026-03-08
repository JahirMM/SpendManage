interface AccountStatementHeaderProps {
  title: string;
  type: string;
  closingDate: number | null;
  paymentDate: number;
  selectedYear: number;
  selectedMonth: number; // 0-indexed
}

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function AccountStatementHeader({
  title,
  type,
  closingDate,
  paymentDate,
  selectedYear,
  selectedMonth,
}: AccountStatementHeaderProps) {
  const periodLabel = `${MONTH_NAMES[selectedMonth]} ${selectedYear}`;

  return (
    <div className="text-white space-y-4 p-3 w-full bg-linear-to-br from-[#023048] to-[#023048]/90 rounded-xl">
      <p className="text-sm text-muted">
        {type === "credit" ? "Tarjeta de crédito" : "Cuenta simple"}
      </p>
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="flex justify-between text-xs sm:text-sm">
        <div>
          <p className="text-muted">Periodo</p>
          <p>{periodLabel}</p>
        </div>
        {closingDate && (
          <div>
            <p className="text-muted">Fecha de cierre</p>
            <p>Día {closingDate}</p>
          </div>
        )}
        <div>
          <p className="text-muted">Fecha de pago</p>
          <p>Día {paymentDate}</p>
        </div>
      </div>
    </div>
  );
}

export default AccountStatementHeader;
