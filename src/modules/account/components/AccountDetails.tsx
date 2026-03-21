"use client";

import StatementDownload from "@/src/modules/account/components/StatementDownload";
import { useGetAccountById } from "@/src/modules/account/hooks/useGetAccountById";
import { useGetMovementsByAccountId } from "@/src/modules/account/hooks/useGetMovementsByAccountId";
import AccountHeader from "@/src/modules/account/components/AccountHeader";
import MovementsList from "@/src/modules/account/components/MovementsList";
import AccountChart from "@/src/modules/account/components/AccountChart";
import AccountStats from "@/src/modules/account/components/AccountStats";
import AccountDetailsSkeleton from "../skeletons/AccountDetailsSkeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AccountDetailsProps {
  accountId: string;
}

function AccountDetails({ accountId }: AccountDetailsProps) {
  const router = useRouter();
  const { data, isLoading, isError } = useGetAccountById(accountId);
  const { data: movements = [] } = useGetMovementsByAccountId(accountId);

  useEffect(() => {
    // Solo redirigir cuando terminó de cargar Y hay un error
    if (!isLoading && (isError || !data)) {
      router.push("/");
    }
  }, [isLoading, isError, data, router]);

  // Siempre renderizar todos los hooks antes de mostrar contenido condicional
  if (isLoading) {
    return <AccountDetailsSkeleton />;
  }

  if (isError || !data) {
    return <div>Redirigiendo...</div>;
  }

  return (
    <div className="max-w-5xl px-4 py-3 mx-auto md:max-w-7xl xl:px-0">
      <AccountHeader account={data} />
      <div className="grid grid-cols-1 gap-3 mt-5 md:grid-cols-2">
        <AccountStats movements={movements} closingDay={data.closing_date} />
        <AccountChart movements={movements} closingDay={data.closing_date} />
      </div>
      <StatementDownload account={data} movements={movements} />
      <MovementsList accountId={accountId} closingDate={data.closing_date} />
    </div>
  );
}

export default AccountDetails;
