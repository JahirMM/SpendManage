"use client";

import AddMovementDialog from "@/src/addMovement/components/AddMovementDialog";
import MovementCard from "@/src/account/components/MovementCard";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { useState } from "react";

function MovementsList() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <section aria-label="Listado de cuentas" className="mt-5">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-base font-bold text-primary">
              Movimientos
            </CardTitle>
            <CardAction>
              <Button
                type="button"
                size="default"
                variant="default"
                className="hidden sm:block"
                onClick={() => setOpenDialog(true)}
              >
                Agregar movimiento
              </Button>
              <Button
                type="button"
                size="default"
                variant="default"
                className="sm:hidden"
                onClick={() => setOpenDialog(true)}
              >
                <Plus className="size-4" />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 my-4 sm:grid-cols-2">
              <Button type="button" variant="default" size="lg">
                Activos (11)
              </Button>
              <Button type="button" variant="outline" size="lg">
                Completados (5)
              </Button>
            </div>
            <div>
              <MovementCard />
            </div>
          </CardContent>
        </Card>
      </section>
      <AddMovementDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}

export default MovementsList;
