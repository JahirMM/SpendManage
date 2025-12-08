"use client";

import AccountExpenseDisplay from "@/src/dashboard/components/accounts/AccountExpenseDisplay";
import AccountNavigation from "@/src/dashboard/components/accounts/AccountNavigation";
import AccountCard from "@/src/dashboard/components/accounts/AccountCard";

import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AddAccountDialog from "@/src/addAccount/components/AddAccountDialog";

const accounts = [
  {
    id: 1,
    type: "card",
    title: "Cuenta lider",
    closingDate: 26,
    paymentDate: 5,
    balance: 150000,
  },
  {
    id: 2,
    type: "normal",
    title: "Pagos mariela",
    closingDate: null,
    paymentDate: 10,
    balance: 30000,
  },
  {
    id: 3,
    type: "normal",
    title: "Parlante",
    closingDate: null,
    paymentDate: 15,
    balance: 70000,
  },
  {
    id: 4,
    type: "card",
    title: "Ripley",
    closingDate: 26,
    paymentDate: 10,
    balance: 94670,
  },
];

function AccountsSection() {
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

  const handlePrevious = () => {
    api?.scrollPrev();
  };

  const handleNext = () => {
    api?.scrollNext();
  };

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
        <Carousel setApi={setApi}>
          <CarouselContent>
            {accounts.map((account) => (
              <CarouselItem key={account.id}>
                <AccountCard
                  type={account.type as "card" | "normal"}
                  title={account.title}
                  closingDate={account.closingDate}
                  paymentDate={account.paymentDate}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="px-4 md:px-5">
            <div className="flex items-center justify-between mt-8">
              <AccountExpenseDisplay amount={accounts[currentIndex].balance} />
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
      </Card>
      <AddAccountDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
}

export default AccountsSection;
