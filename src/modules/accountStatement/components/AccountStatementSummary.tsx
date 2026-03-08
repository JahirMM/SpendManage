interface AccountStatementSummaryProps {
  count: number;
  totalAmount: number;
}

function AccountStatementSummary({
  count,
  totalAmount,
}: AccountStatementSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-2 mt-3 sm:grid-cols-2">
      <div className="p-3 space-y-2 rounded-lg border border-gray-200">
        <p className="text-sm">Total movimientos</p>
        <p className="font-bold">{count}</p>
      </div>
      <div className="p-3 space-y-2 rounded-lg border border-secondary bg-secondary/10">
        <p className="text-sm">Total a pagar</p>
        <p className="font-bold">
          {totalAmount.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </p>
      </div>
    </div>
  );
}

export default AccountStatementSummary;
