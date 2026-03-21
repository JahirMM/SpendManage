"use client";

import { AccountFormData } from "@/src/modules/addAccount/interfaces/formInterfaces";

import { useInsertAccounts } from "@/src/modules/addAccount/hooks/useInsertAccounts";
import { InsertAccountInterface } from "@/src/modules/addAccount/interfaces/insertAccountInterface";
import { useUserContext } from "@/src/shared/contexts/UserContext";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface AddAccountFormProps {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

function AddAccountForm({ setOpenDialog }: AddAccountFormProps) {
  const { user, isLoading } = useUserContext();

  /**================
   * SERVICIOS
   ================*/
  const { mutateAsync: insertAccount, isPending } = useInsertAccounts();

  /**================
   * REACT HOOK FORM
   ================*/
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AccountFormData>();
  const accountType = watch("type");

  /**================
   * MÉTODOS
   ================*/
  const onSubmit = async (data: AccountFormData) => {
    if (!user) return;

    try {
      const request: InsertAccountInterface = {
        title: data.title,
        description: data.description,
        type: data.type,
        closing_date: data.closingDate,
        payment_date: data.paymentDate,
        user_id: user.id,
      };
      await insertAccount(request);
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-3">
        <Label htmlFor="accountTitle">Título</Label>
        <Input
          id="accountTitle"
          {...register("title", { required: "El título es obligatorio" })}
          type="text"
          placeholder="Ej. Tarjeta lider"
          className="py-5 text-sm border-gray-200 focus:border-action focus:ring-action"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="accountDescription">Descripción</Label>
        <Textarea
          id="accountDescription"
          {...register("description")}
          placeholder="Descripción (opcional)"
          className="text-sm border-gray-200 focus:border-action focus:ring-action"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="accountType">Tipo</Label>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="ghost"
            type="button"
            className={`${
              accountType === "normal" && "bg-secondary/20 border-secondary"
            } border hover:border-secondary hover:bg-secondary/20 dark:hover:bg-secondary/20`}
            onClick={() => setValue("type", "normal")}
          >
            Simple
          </Button>
          <Button
            variant="ghost"
            type="button"
            className={`${
              accountType === "card" && "bg-secondary/20 border-secondary"
            } border hover:border-secondary hover:bg-secondary/20 dark:hover:bg-secondary/20`}
            onClick={() => {
              setValue("type", "card");
              setValue("closingDate", null);
            }}
          >
            Tarjeta
          </Button>
        </div>
        {errors.type && (
          <p className="text-sm text-red-500">{errors.type.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {accountType === "card" && (
          <div className="grid gap-3">
            <Label htmlFor="accountClosingDate">Día de cierre</Label>
            <Input
              id="accountClosingDate"
              {...register("closingDate", {
                required: "El día de cierre es obligatorio",
              })}
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
            {...register("paymentDate")}
            type="number"
            placeholder="Día (1 - 31)"
            min="1"
            max="31"
            className="py-5 text-sm border-gray-300 focus:border-action focus:ring-action"
          />
        </div>
        {errors.closingDate && (
          <p className="text-sm text-red-500">{errors.closingDate.message}</p>
        )}
        {errors.paymentDate && (
          <p className="text-sm text-red-500">{errors.paymentDate.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-14">
        <Button
          variant="ghost"
          type="button"
          className="border border-gray-300 hover:border-action hover:bg-action/20 dark:hover:bg-action/20"
          onClick={() => setOpenDialog(false)}
          disabled={isPending}
        >
          Cancelar
        </Button>
        <Button
          variant="default"
          type="submit"
          className="font-bold"
          disabled={isPending}
        >
          {isPending ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </div>
    </form>
  );
}

export default AddAccountForm;
