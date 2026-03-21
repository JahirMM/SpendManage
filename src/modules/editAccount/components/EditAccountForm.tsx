"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

import { AccountFormData } from "@/src/modules/addAccount/interfaces/formInterfaces";
import { AccountInterface } from "@/src/modules/dashboard/interfaces/accountInterface";
import { useUpdateAccount } from "@/src/modules/editAccount/hooks/useUpdateAccount";

import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface EditAccountFormProps {
  account: AccountInterface;
  setShowEditDialog: Dispatch<SetStateAction<boolean>>;
}

function EditAccountForm({ account, setShowEditDialog }: EditAccountFormProps) {
  const { mutateAsync: updateAccount, isPending } = useUpdateAccount(
    account.id,
  );

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AccountFormData>({
    defaultValues: {
      title: account.title,
      description: account.description,
      type: account.type as "card" | "normal" | "",
      closingDate: account.closing_date,
      paymentDate: account.payment_date,
    },
  });

  const accountType = watch("type");

  const onSubmit = async (data: AccountFormData) => {
    try {
      await updateAccount({
        title: data.title,
        description: data.description,
        type: data.type,
        closing_date: data.type === "card" ? Number(data.closingDate) : null,
        payment_date: Number(data.paymentDate),
      });
      setShowEditDialog(false);
    } catch (error) {
      console.error("Error al actualizar la cuenta:", error);
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
      </div>

      <div className="grid gap-3">
        <Label>Tipo</Label>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="ghost"
            type="button"
            className={`${
              accountType === "normal" && "bg-secondary/20 border-secondary"
            } border hover:border-secondary hover:bg-secondary/20 dark:hover:bg-secondary/20`}
            onClick={() => {
              setValue("type", "normal");
              setValue("closingDate", null);
            }}
          >
            Simple
          </Button>
          <Button
            variant="ghost"
            type="button"
            className={`${
              accountType === "card" && "bg-secondary/20 border-secondary"
            } border hover:border-secondary hover:bg-secondary/20 dark:hover:bg-secondary/20`}
            onClick={() => setValue("type", "card")}
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
            {errors.closingDate && (
              <p className="text-sm text-red-500">
                {errors.closingDate.message}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-3">
          <Label htmlFor="accountPaymentDate">Día de pago</Label>
          <Input
            id="accountPaymentDate"
            {...register("paymentDate", {
              required: "El día de pago es obligatorio",
            })}
            type="number"
            placeholder="Día (1 - 31)"
            min="1"
            max="31"
            className="py-5 text-sm border-gray-300 focus:border-action focus:ring-action"
          />
          {errors.paymentDate && (
            <p className="text-sm text-red-500">{errors.paymentDate.message}</p>
          )}
        </div>
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
          {isPending ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
}

export default EditAccountForm;
