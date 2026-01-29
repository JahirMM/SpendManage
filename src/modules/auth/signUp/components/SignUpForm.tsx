"use client";

import {
  SignUpFormData,
  signUpSchema,
} from "@/src/modules/auth/signUp/schemas/signUpSchema";

import { useSignUp } from "@/src/modules/auth/signUp/hooks/useSignUp";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { Eye, EyeOff, Lock, Mail, User, AlertCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<{
    message: string;
    type: "emailAlreadyExists" | "other";
  } | null>(null);

  const { mutateAsync, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      // Limpiar errores previos
      setServerError(null);

      const result = await mutateAsync(data);

      // Si hay error, mostrarlo en el componente
      if (!result.success && result.error) {
        setServerError({
          message: result.error,
          type: result.errorType || "other",
        });
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <section className="flex items-center justify-center flex-1 p-8">
      <div className="w-full max-w-md">
        {/* Logo móvil */}
        <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
          <span className="text-2xl font-bold text-primary">SpendManage</span>
        </div>

        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-primary">Crear cuenta</h2>
          <p className="text-gray-500">
            Completa el formulario para registrarte
          </p>
        </div>

        {serverError && (
          <Alert variant="destructive" className="mb-16">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {serverError.message}
              {serverError.type === "emailAlreadyExists" && (
                <Link
                  href="/login"
                  className="block mt-2 font-semibold text-action hover:font-bold"
                >
                  Ir a iniciar sesión
                </Link>
              )}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo Nombre */}
          <div className="space-y-2 mt-2">
            <Label htmlFor="name" className="font-medium text-primary">
              Nombre completo
            </Label>
            <div className="relative">
              <User className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                {...register("name")}
                className={`py-6 pl-10 border-gray-200 focus:border-action focus:ring-action ${
                  errors.name ? "border-red-500 focus:border-red-500" : ""
                }`}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </div>
            {errors.name && (
              <p id="name-error" className="text-sm text-red-500" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Campo Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-primary">
              Correo electrónico
            </Label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                {...register("email")}
                className={`py-6 pl-10 border-gray-200 focus:border-action focus:ring-action ${
                  errors.email || serverError?.type === "emailAlreadyExists"
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }`}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                onChange={() => setServerError(null)} // Limpiar error al escribir
              />
            </div>
            {errors.email && (
              <p id="email-error" className="text-sm text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo Contraseña */}
          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium text-primary">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                {...register("password")}
                className={`py-6 pl-10 pr-10 border-gray-200 focus:border-action focus:ring-action ${
                  errors.password ? "border-red-500 focus:border-red-500" : ""
                }`}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                id="password-error"
                className="text-sm text-red-500"
                role="alert"
              >
                {errors.password.message}
              </p>
            )}
            <div className="text-xs text-gray-500 space-y-1 mt-2">
              <p>La contraseña debe contener:</p>
              <ul className="list-disc list-inside space-y-0.5 ml-2">
                <li>Al menos 8 caracteres</li>
                <li>Una letra mayúscula</li>
                <li>Una letra minúscula</li>
                <li>Un número</li>
              </ul>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-6 text-lg font-medium text-white bg-action hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>

        <p className="mt-8 text-center text-gray-500">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-action hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUpForm;
