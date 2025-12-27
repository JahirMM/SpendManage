import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Dispatch, SetStateAction } from "react";

interface AddMovementFormProps {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

function AddMovementForm({ setOpenDialog }: AddMovementFormProps) {
  return (
    <form action="" className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input id="title" type="text" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Monto</Label>
        <Input id="amount" type="number" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold">
          ¿Incluye intereses o cargos extras?
        </p>
        <RadioGroup>
          <div className="flex gap-3 items-center">
            <RadioGroupItem value="paid" id="paid" />
            <Label htmlFor="paid">Si</Label>
          </div>
          <div className="flex gap-3 items-center">
            <RadioGroupItem value="not-paid" id="not-paid" />
            <Label htmlFor="not-paid">No</Label>
          </div>
        </RadioGroup>
        {/* CON CARGO */}
        <div className="mt-4 space-y-2">
          <Label htmlFor="final-amount">Monto final</Label>
          <Input id="final-amount" type="number" />
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
      <div className="grid grid-cols-1 gap-2 mt-10 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpenDialog(false)}
          className="order-2 sm:order-1"
        >
          Cancelar
        </Button>
        <Button type="submit" className="order-1 sm:order-2">
          Agregar movimiento
        </Button>
      </div>
    </form>
  );
}

export default AddMovementForm;
