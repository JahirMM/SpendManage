"use client";

import StatementDownload from "@/src/modules/account/components/StatementDownload";
import { useGetAccountById } from "@/src/modules/account/hooks/useGetAccountById";
import AccountHeader from "@/src/modules/account/components/AccountHeader";
import MovementsList from "@/src/modules/account/components/MovementsList";
import AccountChart from "@/src/modules/account/components/AccountChart";
import AccountStats from "@/src/modules/account/components/AccountStats";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AccountDetailsProps {
  accountId: string;
}

function AccountDetails({ accountId }: AccountDetailsProps) {
  const router = useRouter();
  const { data, isLoading, isError } = useGetAccountById(accountId);

  useEffect(() => {
    // Solo redirigir cuando terminó de cargar Y hay un error
    if (!isLoading && (isError || !data)) {
      router.push("/");
    }
  }, [isLoading, isError, data, router]);

  // Siempre renderizar todos los hooks antes de mostrar contenido condicional
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Redirigiendo...</div>;
  }

  return (
    <div className="max-w-5xl px-4 py-3 mx-auto md:max-w-7xl xl:px-0">
      <AccountHeader
        title={data.title}
        description={data.description}
        closingDate={data.closing_date}
        paymentDate={data.payment_date}
      />
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
