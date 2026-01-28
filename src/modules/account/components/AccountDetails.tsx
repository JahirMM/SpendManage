import AccountChart from "@/src/modules/account/components/AccountChart";
import AccountHeader from "@/src/modules/account/components/AccountHeader";
import AccountStats from "@/src/modules/account/components/AccountStats";
import MovementsList from "@/src/modules/account/components/MovementsList";
import StatementDownload from "@/src/modules/account/components/StatementDownload";

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
