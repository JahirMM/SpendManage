import AccountExpenseDisplay from "@/src/dashboard/components/accounts/AccountExpenseDisplay";
import AccountNavigation from "@/src/dashboard/components/accounts/AccountNavigation";
import AccountCard from "@/src/dashboard/components/accounts/AccountCard";

import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function AccountsSection() {
  return (
    <Card className="border-none lg:h-full lg:flex lg:flex-col lg:justify-between">
      <CardHeader>
        <CardTitle className="text-base font-bold text-primary">
          Cuentas
        </CardTitle>
        <CardAction>
          <a
            href=""
            className="flex items-center font-bold text-sm text-action"
          >
            <Plus className="size-4" /> Agregar
          </a>
        </CardAction>
      </CardHeader>
      <div className="px-4 md:px-5">
        <AccountCard />
      </div>
      <div className="px-4 md:px-5">
        <div className="flex items-center justify-between mt-8">
          <AccountExpenseDisplay amount={92000} />
          <AccountNavigation />
        </div>

        <Button className="w-full mt-6" variant="default">
          Ver detalles
        </Button>
      </div>
    </Card>
  );
}

export default AccountsSection;
