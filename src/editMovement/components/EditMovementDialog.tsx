import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { TriangleAlert } from "lucide-react";

import React from "react";

interface EditMovementDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditMovementDialog({
  openDialog,
  setOpenDialog,
}: EditMovementDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            Editar movimiento
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="originalAmount">Monto original</Label>
              <Input id="originalAmount" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="finalAmount">Monto final</Label>
              <Input id="finalAmount" type="number" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="installments">Número de cuotas</Label>
            <Input id="installments" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="">Fecha movimiento</Label>
            <Input id="" type="date" />
          </div>
          <div className="flex justify-between px-2 py-3 text-sm text-white rounded-lg bg-primary">
            <span>Cuota mensual:</span>
            <span>$23,345.00</span>
          </div>
          <div className="relative px-3 py-5 rounded-lg border border-red-400 bg-red-300/20">
            <p className="flex flex-col gap-2 justify-center items-center text-sm text-center text-gray-700 sm:flex-row">
              <TriangleAlert className="text-red-600 size-5" />
              Modificar un movimiento recalculará los estados anteriores
            </p>
            <span className="block absolute top-0 left-0 w-1.5 h-full bg-red-600 rounded-tl-md rounded-bl-md border border-red-600"></span>
          </div>
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenDialog(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditMovementDialog;
