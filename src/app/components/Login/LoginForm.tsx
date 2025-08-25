"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import { signIn } from "../../../services/supabase.service";

//Props para la internacionalización
type TextProps = {
  formTitle: string;
  formUser: string;
  formPass: string;
  formEmail: string;
  formEmailPlaceHolder: string;
  formSubmit: string;
};

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginForm = (props: TextProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setMessage("");

    try {
      const { data: authData, error } = await signIn(data.email, data.password);

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else if (authData.user) {
        setMessage("¡Login exitoso! Redirigiendo...");

        // Extraer el idioma de la URL actual
        const lang = pathname.split("/")[1]; // Obtiene 'en-US' o 'es-ES'

        // Redireccionar al dashboard con el idioma correcto
        router.push(`/${lang}/dashboard`);
      }
    } catch (error) {
      setMessage("Error inesperado durante el login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            {props.formTitle}
          </h2>

          {message && (
            <div
              className={`mb-4 p-3 rounded-md text-center ${
                message.includes("Error")
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              {message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {props.formEmail}
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "El email es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={props.formEmailPlaceHolder}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {props.formPass}
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                  autoComplete="current-password"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={props.formPass}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-6 py-2 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                    loading
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Iniciando sesión..." : props.formSubmit}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
