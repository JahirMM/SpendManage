"use client";

import AccountDetails from "@/src/modules/account/components/AccountDetails";
import { useParams } from "next/navigation";

type PageParams = {
  accountId: string;
};

function Page() {
  const { accountId } = useParams<PageParams>();

  return <AccountDetails accountId={accountId} />;
}

export default Page;
