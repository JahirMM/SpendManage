import { z } from "zod";

export const AccountSchema = z
  .object({
    title: z.string().min(2, "El título debe tener al menos 2 caracteres"),
    description: z.string().optional(),
    type: z.enum(["card", "normal"], {
      error: "Seleciona un tipo valido",
    }),
    closingDate: z
      .number()
      .int("La fecha de cierre debe ser un número entero")
      .min(1, "La fecha de cierre debe ser mayor a 0")
      .max(31, "La fecha de cierre debe ser menor o igual a 31")
      .optional(),
    paymentDate: z
      .number()
      .int("La fecha de pago debe ser un número entero")
      .min(1, "La fecha de pago debe ser mayor a 0")
      .max(31, "La fecha de pago debe ser menor o igual a 31"),
  })
  .refine(
    (data) => {
      if (data.type === "card") {
        return data.closingDate !== undefined;
      }
      return true;
    },
    {
      message: "La fecha de cierre es requerida para tarjetas",
      path: ["closingDate"],
    }
  );

export type AccountSchemaType = z.infer<typeof AccountSchema>;
