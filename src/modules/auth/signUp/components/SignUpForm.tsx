"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Credentials = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.email("Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 6 caracteres"),
});

function SignUpForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const result = Credentials.safeParse(formData);

    if (!result.success) {
      const formattedErrors: {
        name?: string;
        email?: string;
        password?: string;
      } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === "name") formattedErrors.name = err.message;
        if (err.path[0] === "email") formattedErrors.email = err.message;
        if (err.path[0] === "password") formattedErrors.password = err.message;
      });
      setErrors(formattedErrors);
      setIsLoading(false);
      return;
    }

    try {
      //TODO: consumir servicio
      console.log(formData);
      setTimeout(() => {
        setIsLoading(false);
        // router.push("/dashboard");
      }, 1000);
    } catch (error) {
      setErrors({
        general: "Ocurrió un error. Intenta nuevamente.",
      });
      setIsLoading(false);
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium text-primary">
              Nombre completo
            </Label>
            <div className="relative">
              <User className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="py-6 pl-10 border-gray-200 focus:border-action focus:ring-action"
                required
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          </div>

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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="py-6 pl-10 border-gray-200 focus:border-action focus:ring-action"
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
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
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="py-6 pl-10 pr-10 border-gray-200 focus:border-action focus:ring-action"
                required
                minLength={8}
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
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <div className="p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50">
              {errors.general}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 text-lg font-medium text-white bg-action hover:bg-primary"
          >
            {isLoading ? "Creando cuenta..." : "Crear cuenta"}
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
