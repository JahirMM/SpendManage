"use client";

import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";

const Credentials = z.object({
  email: z.email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 6 caracteres"),
});

type Credentials = z.infer<typeof Credentials>;

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(Credentials),
  });

  const onSubmit = async (data: Credentials) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error("Error en login:", error);
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
          <h2 className="mb-2 text-3xl font-bold text-primary">
            Iniciar sesión
          </h2>
          <p className="text-gray-500">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                className="py-6 pl-10 border-gray-200 focus:border-action focus:ring-action"
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium text-primary">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="py-6 pl-10 pr-10 border-gray-200 focus:border-action focus:ring-action"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-6 text-lg font-medium text-white bg-action hover:bg-action/90"
          >
            {isPending ? "Ingresando..." : "Iniciar sesión"}
          </Button>
        </form>

        <p className="mt-8 text-center text-gray-500">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/signup"
            className="font-medium text-action hover:underline"
          >
            Regístrate gratis
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginForm;
