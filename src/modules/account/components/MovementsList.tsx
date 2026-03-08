"use client";

import AddMovementDialog from "@/src/modules/addMovement/components/AddMovementDialog";
import MovementCard from "@/src/modules/account/components/MovementCard";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useGetMovementsByAccountId } from "../hooks/useGetMovementsByAccountId";
import {
  getActiveMovements,
  getCompletedMovements,
} from "@/src/shared/lib/movementUtils";

import { Plus } from "lucide-react";
import { useState } from "react";

interface MovementsListProps {
  accountId: string;
  closingDate: number | null;
}

type FilterType = "active" | "completed";

function MovementsList({ accountId, closingDate }: MovementsListProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [filter, setFilter] = useState<FilterType>("active");

  const {
    data: movements = [],
    isLoading,
    isError,
  } = useGetMovementsByAccountId(accountId);

  const now = new Date();
  const refYear = now.getFullYear();
  const refMonth = now.getMonth();

  const activeMovements = getActiveMovements(
    movements,
    closingDate,
    refYear,
    refMonth,
  );
  const completedMovements = getCompletedMovements(
    movements,
    closingDate,
    refYear,
    refMonth,
  );
  const displayed = filter === "active" ? activeMovements : completedMovements;

  return (
    <>
      <section aria-label="Listado de movimientos" className="mt-5">
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
          <CardContent className="space-y-3">
            {/* Filtros */}
            <div className="grid grid-cols-1 gap-2 my-4 sm:grid-cols-2">
              <Button
                type="button"
                variant={filter === "active" ? "default" : "outline"}
                size="lg"
                onClick={() => setFilter("active")}
              >
                Activos ({activeMovements.length})
              </Button>
              <Button
                type="button"
                variant={filter === "completed" ? "default" : "outline"}
                size="lg"
                onClick={() => setFilter("completed")}
              >
                Completados ({completedMovements.length})
              </Button>
            </div>

            {isLoading && <p>Cargando movimientos...</p>}
            {isError && <p>Error al cargar movimientos</p>}
            {!isLoading && !isError && displayed.length === 0 && (
              <p className="text-sm text-gray-500">
                {filter === "active"
                  ? "No hay movimientos activos"
                  : "No hay movimientos completados"}
              </p>
            )}
            {!isLoading &&
              !isError &&
              displayed.map((movement) => (
                <MovementCard
                  key={movement.id}
                  movement={movement}
                  closingDay={closingDate}
                />
              ))}
          </CardContent>
        </Card>
      </section>
      <AddMovementDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        accountId={accountId}
      />
    </>
  );
}

export default MovementsList;
