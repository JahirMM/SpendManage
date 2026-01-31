"use client";

import AccountExpenseDisplay from "@/src/modules/dashboard/components/accounts/AccountExpenseDisplay";
import AccountNavigation from "@/src/modules/dashboard/components/accounts/AccountNavigation";
import AccountCard from "@/src/modules/dashboard/components/accounts/AccountCard";

import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Plus, Wallet } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AddAccountDialog from "@/src/modules/addAccount/components/AddAccountDialog";
import { useGetAccounts } from "@/src/modules/dashboard/hooks/useGetAccounts";
import { useUserContext } from "@/src/shared/contexts/UserContext";

function AccountsSection() {
  const { user, isLoading: isUserLoading } = useUserContext();
  const { data, isLoading: isAccountsLoading } = useGetAccounts(
    user?.id ?? null,
  );

  const accounts = data ?? [];
  const isLoading = isUserLoading || isAccountsLoading;

  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const toggleDialog = () => setOpenDialog((prev) => !prev);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });

    setCurrentIndex(api.selectedScrollSnap());
  }, [api]);

  const handlePrevious = () => api?.scrollPrev();
  const handleNext = () => api?.scrollNext();

  return (
    <>
      <Card className="border-none lg:h-full lg:flex lg:flex-col lg:justify-between">
        <CardHeader>
          <CardTitle className="text-base font-bold text-primary">
            Cuentas
          </CardTitle>
          <CardAction>
            <div
              onClick={toggleDialog}
              className="flex items-center text-sm font-bold cursor-pointer text-action"
            >
              <Plus className="size-4" /> Agregar
            </div>
          </CardAction>
        </CardHeader>

        {isLoading && (
          <div className="px-4 md:px-5 space-y-4">
            <Skeleton className="h-32 w-full rounded-lg md:max-w-[60%] md:mx-auto lg:min-w-[260px] lg:h-[358px]" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        )}

        {!isLoading && accounts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Wallet className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No tienes cuentas
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
              Agrega tu primera cuenta para comenzar a gestionar tus finanzas
            </p>
            <Button onClick={toggleDialog} variant="default">
              <Plus className="size-4 mr-2" />
              Agregar cuenta
            </Button>
          </div>
        )}

        {/* ACCOUNTS LIST */}
        {!isLoading && accounts.length > 0 && (
          <Carousel setApi={setApi}>
            <CarouselContent className="px-4 md:p-0">
              {accounts.map((account) => (
                <CarouselItem key={account.id}>
                  <AccountCard
                    type={account.type}
                    title={account.title}
                    closingDate={account.closing_date}
                    paymentDate={account.payment_date}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="px-4 md:px-5">
              <div className="flex items-center justify-between mt-8">
                <AccountExpenseDisplay />
                <AccountNavigation
                  previous={handlePrevious}
                  next={handleNext}
                  accountsLength={accounts.length}
                  selectedAccountIndex={currentIndex}
                />
              </div>

              <Button className="w-full mt-6" variant="default">
                Ver detalles
              </Button>
            </div>
          </Carousel>
        )}
      </Card>
      <AddAccountDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
}

export default AccountsSection;
