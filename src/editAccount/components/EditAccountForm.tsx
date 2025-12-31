import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormErrors,
  initialFormData,
} from "@/src/addAccount/interfaces/formInterfaces";

import { AccountSchema } from "@/src/addAccount/schemas/accountSchema";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

interface EditAccountFormProps {
  setShowEditDialog: Dispatch<SetStateAction<boolean>>;
}

// TODO: Esto esta controlando con data inicial vacia lo que se tendria que hacer
// es que reciva la data y actualizar el useState con toda la informacion es decir
// un useEffect y desde alli manejar la actualizacion de una cuenta
function EditAccountForm({ setShowEditDialog }: EditAccountFormProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validar campos vacíos manualmente antes de Zod
    const newErrors: FormErrors = {};

    if (formData.type === "card" && formData.closingDate === "") {
      newErrors.closingDate = "La fecha de cierre es requerida";
    }

    if (formData.paymentDate === "") {
      newErrors.paymentDate = "La fecha de pago es requerida";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Convertir datos para validación
    const dataToValidate = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      ...(formData.type === "card" && formData.closingDate !== ""
        ? { closingDate: Number(formData.closingDate) }
        : {}),
      paymentDate: Number(formData.paymentDate),
    };

    const result = AccountSchema.safeParse(dataToValidate);

    if (!result.success) {
      const formattedErrors: FormErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormErrors;
        formattedErrors[field] = err.message;
      });
      setErrors(formattedErrors);
      return;
    }

    // Los datos están validados correctamente
    console.log("Datos validados:", result.data);

    try {
      //TODO: consumir servicio
      setFormData(initialFormData);
    } catch (error) {
      setErrors({
        general: "Ocurrió un error. Intenta nuevamente.",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const handleTypeChange = (type: "card" | "normal") => {
    setFormData((prev) => ({ ...prev, type }));
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-3">
        <Label htmlFor="accountTitle">Título</Label>
        <Input
          id="accountTitle"
          name="title"
          type="text"
          value={formData.title}
          placeholder="Ej. Tarjeta lider"
          className="py-5 text-sm border-gray-200 focus:border-action focus:ring-action"
          onChange={handleInputChange}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="accountDescription">Descripción</Label>
        <Textarea
          id="accountDescription"
          name="description"
          value={formData.description}
          placeholder="Descripción (opcional)"
          className="text-sm border-gray-200 focus:border-action focus:ring-action"
          onChange={handleInputChange}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="accountType">Tipo</Label>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="ghost"
            type="button"
            className={`${
              formData.type === "normal" && "bg-secondary/20 border-secondary"
            } border hover:border-secondary hover:bg-secondary/20 dark:hover:bg-secondary/20`}
            onClick={() => handleTypeChange("normal")}
          >
            Simple
          </Button>
          <Button
            variant="ghost"
            type="button"
            className={`${
              formData.type === "card" && "bg-secondary/20 border-secondary"
            } border hover:border-secondary hover:bg-secondary/20 dark:hover:bg-secondary/20`}
            onClick={() => handleTypeChange("card")}
          >
            Tarjeta
          </Button>
        </div>
        {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {formData.type === "card" && (
          <div className="grid gap-3">
            <Label htmlFor="accountClosingDate">Día de cierre</Label>
            <Input
              id="accountClosingDate"
              name="closingDate"
              type="number"
              value={formData.closingDate}
              placeholder="Día (1 - 31)"
              min="1"
              max="31"
              className="py-5 text-sm border-gray-300 focus:border-action focus:ring-action"
              onChange={handleNumberChange}
            />
          </div>
        )}

        <div className="grid gap-3">
          <Label htmlFor="accountPaymentDate">Día de pago</Label>
          <Input
            id="accountPaymentDate"
            name="paymentDate"
            type="number"
            value={formData.paymentDate}
            placeholder="Día (1 - 31)"
            min="1"
            max="31"
            className="py-5 text-sm border-gray-300 focus:border-action focus:ring-action"
            onChange={handleNumberChange}
          />
        </div>
        {errors.closingDate && (
          <p className="text-sm text-red-500">{errors.closingDate}</p>
        )}
        {errors.paymentDate && (
          <p className="text-sm text-red-500">{errors.paymentDate}</p>
        )}
      </div>

      {errors.general && (
        <p className="text-sm text-red-500">{errors.general}</p>
      )}

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
