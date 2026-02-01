import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AccountSchema } from "@/src/modules/addAccount/schemas/accountSchema";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

interface EditAccountFormProps {
  setShowEditDialog: Dispatch<SetStateAction<boolean>>;
}

function EditAccountForm({ setShowEditDialog }: EditAccountFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-3">
        <Label htmlFor="accountTitle">Título</Label>
        <Input
          id="accountTitle"
          name="title"
          type="text"
          placeholder="Ej. Tarjeta lider"
          className="py-5 text-sm border-gray-200 focus:border-action focus:ring-action"
        />
        {/* {errors.title && <p className="text-sm text-red-500">{errors.title}</p>} */}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="accountDescription">Descripción</Label>
        <Textarea
          id="accountDescription"
          name="description"
          placeholder="Descripción (opcional)"
          className="text-sm border-gray-200 focus:border-action focus:ring-action"
        />
        {/* {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )} */}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="accountType">Tipo</Label>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="ghost"
            type="button"
            className={`${
              "normal" === "normal" && "bg-secondary/20 border-secondary"
            } border hover:border-secondary hover:bg-secondary/20 dark:hover:bg-secondary/20`}
          >
            Simple
          </Button>
          <Button
            variant="ghost"
            type="button"
            className={`${
              "card" === "card" && "bg-secondary/20 border-secondary"
            } border hover:border-secondary hover:bg-secondary/20 dark:hover:bg-secondary/20`}
          >
            Tarjeta
          </Button>
        </div>
        {/* {errors.type && <p className="text-sm text-red-500">{errors.type}</p>} */}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {"card" === "card" && (
          <div className="grid gap-3">
            <Label htmlFor="accountClosingDate">Día de cierre</Label>
            <Input
              id="accountClosingDate"
              name="closingDate"
              type="number"
              placeholder="Día (1 - 31)"
              min="1"
              max="31"
              className="py-5 text-sm border-gray-300 focus:border-action focus:ring-action"
            />
          </div>
        )}

        <div className="grid gap-3">
          <Label htmlFor="accountPaymentDate">Día de pago</Label>
          <Input
            id="accountPaymentDate"
            name="paymentDate"
            type="number"
            placeholder="Día (1 - 31)"
            min="1"
            max="31"
            className="py-5 text-sm border-gray-300 focus:border-action focus:ring-action"
          />
        </div>
        {/* {errors.closingDate && (
          <p className="text-sm text-red-500">{errors.closingDate}</p>
        )} */}
        {/* {errors.paymentDate && (
          <p className="text-sm text-red-500">{errors.paymentDate}</p>
        )} */}
      </div>

      <div className="relative px-3 py-5 rounded-lg border border-red-400 bg-red-300/20">
        <p className="flex flex-col gap-2 justify-center items-center text-sm text-center text-gray-700 sm:flex-row">
          <TriangleAlert className="text-red-600 size-5" />
          Modificar esta cuenta recalculará los estados anteriores
        </p>
        <span className="block absolute top-0 left-0 w-1.5 h-full bg-red-600 rounded-tl-md rounded-bl-md border border-red-600"></span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-14">
        <Button
          variant="ghost"
          type="button"
          className="border border-gray-300 hover:border-action hover:bg-action/20 dark:hover:bg-action/20"
          onClick={() => setShowEditDialog(false)}
        >
          Cancelar
        </Button>
        <Button variant="default" type="submit" className="font-bold">
          Crear cuenta
        </Button>
      </div>
    </form>
  );
}

export default EditAccountForm;
