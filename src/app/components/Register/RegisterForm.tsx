import Link from 'next/link'
import React from 'react'

export const RegisterForm = () => {
    const locale= "";
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          {/*  <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/${locale}/`} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div> */}

          {/* Register Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 animate-scale-in">
            {/* Header */}
            <div className="text-center mb-8">
              <Link
                href={`/${locale}/`}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                BootcampHub
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mt-4">
                {t("title")}
              </h1>
              <p className="text-gray-600 mt-2">{t("subtitle")}</p>
            </div>

            {/* Register Form */}
            <RegisterForm locale={locale} />

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t("hasAccount")}{" "}
                <Link
                  href={`/${locale}/login`}
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  {t("loginHere")}
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            © 2024 BootcampHub. Todos los derechos reservados.
          </div>
        </div>
      </div>
    )
}
