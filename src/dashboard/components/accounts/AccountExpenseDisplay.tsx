interface AccountExpenseDisplayProps {
  amount: number;
}

function AccountExpenseDisplay({ amount }: AccountExpenseDisplayProps) {
  return (
    <div>
      <span className="text-base">Gasto</span>
      <div>
        <span className="mr-1 text-sm font-semibold">$</span>
        <span className="text-lg font-bold md:text-2xl">{amount}</span>
      </div>
    </div>
  );
}

export default AccountExpenseDisplay;
