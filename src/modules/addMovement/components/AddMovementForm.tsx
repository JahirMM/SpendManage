import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { InsertMovementInterface } from "../interfaces/insertMovement";

import { useInsertMovement } from "../hooks/useInsertMovement";

import { useForm, Controller } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

interface AddMovementFormValues {
  title: string;
  description: string;
  amount: number;
  finalAmount: number;
  installments: number;
  date: string;
  hasExtraCharges: string;
}

interface AddMovementFormProps {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  accountId: string;
}

function AddMovementForm({ setOpenDialog, accountId }: AddMovementFormProps) {
  /**================
   * SERVICIOS
   ================*/
  const { mutateAsync } = useInsertMovement();

  /**================
   * REACT HOOK FORM
   ================*/
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<AddMovementFormValues>({
    defaultValues: { hasExtraCharges: "no-paid" },
  });

  const hasExtraCharges = watch("hasExtraCharges");

  /**================
   * MÉTODOS
   ================*/
  const onSubmit = async (data: AddMovementFormValues) => {
    if (data.hasExtraCharges === "paid" && !data.finalAmount) {
      return;
    }

    const request: InsertMovementInterface = {
      account_id: accountId,
      title: data.title,
      description: data.description,
      principal_amount: Number(data.amount),
      total_amount:
        data.hasExtraCharges === "no-paid"
          ? Number(data.amount)
          : Number(data.finalAmount),
      transaction_date: new Date(data.date).toISOString(),
      installment_count: Number(data.installments),
      is_active: true,
    };

    try {
      await mutateAsync(request);
      setOpenDialog(false);
    } catch (error) {
      console.log(`Error al insertar movimiento: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          type="text"
          {...register("title", { required: "Cambo obligatorio" })}
          className={`border ${errors.title ? "border-red-500" : ""}`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          {...register("description")}
          className={`border ${errors.description ? "border-red-500" : ""}`}
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Monto</Label>
        <Input
          id="amount"
          type="number"
          {...register("amount", { required: "Cambo obligatorio" })}
          className={`border ${errors.amount ? "border-red-500" : ""}`}
        />
        {errors.amount && (
          <p className="text-red-500 text-xs">{errors.amount.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold">
          ¿Incluye intereses o cargos extras?
        </p>
        <Controller
          control={control}
          name="hasExtraCharges"
          render={({ field }) => (
            <RadioGroup value={field.value} onValueChange={field.onChange}>
              <div className="flex gap-3 items-center">
                <RadioGroupItem value="paid" id="paid" />
                <Label htmlFor="paid">Si</Label>
              </div>
              <div className="flex gap-3 items-center">
                <RadioGroupItem value="no-paid" id="no-paid" />
                <Label htmlFor="no-paid">No</Label>
              </div>
            </RadioGroup>
          )}
        />
        {hasExtraCharges === "paid" && (
          <div className="mt-4 space-y-2">
            <Label htmlFor="final-amount">Monto final</Label>
            <Input
              id="final-amount"
              type="number"
              {...register("finalAmount", {
                required: "Campo obligatorio",
              })}
              className={`border ${errors.finalAmount ? "border-red-500" : ""}`}
            />
            {errors.finalAmount && (
              <p className="text-red-500 text-xs">
                {errors.finalAmount.message}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="installments">Número de cuotas</Label>
        <Input
          id="installments"
          type="number"
          {...register("installments", { required: "Cambo obligatorio" })}
          className={`border ${errors.installments ? "border-red-500" : ""}`}
        />
        {errors.installments && (
          <p className="text-red-500 text-xs">{errors.installments.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Fecha movimiento</Label>
        <Input
          id="date"
          type="date"
          max={new Date().toISOString().split("T")[0]}
          {...register("date", {
            required: "Campo obligatorio",
            validate: (v) =>
              new Date(v) <= new Date() || "La fecha no puede ser mayor a hoy",
          })}
          className={`border ${errors.date ? "border-red-500" : ""}`}
        />
        {errors.date && (
          <p className="text-red-500 text-xs">{errors.date.message}</p>
        )}
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
