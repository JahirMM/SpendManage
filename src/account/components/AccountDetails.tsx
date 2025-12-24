import AccountChart from "@/src/account/components/AccountChart";
import AccountHeader from "@/src/account/components/AccountHeader";
import AccountStats from "@/src/account/components/AccountStats";
import MovementsList from "@/src/account/components/MovementsList";
import StatementDownload from "@/src/account/components/StatementDownload";

function AccountDetails() {
  return (
    <div className="max-w-5xl px-4 py-3 mx-auto md:max-w-7xl xl:px-0">
      <AccountHeader />
      <div className="grid grid-cols-1 gap-3 mt-5 md:grid-cols-2">
        <AccountStats />
        <AccountChart />
      </div>
      <StatementDownload />
      <MovementsList />
    </div>
  );
}

export default AccountDetails;
