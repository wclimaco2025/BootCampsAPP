import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

// Idiomas a soportar
const locales = ["en-US", "es-ES"];

// Configuración de autenticación
const authConfig = {
  protectedRoutes: ["/dashboard"],
  authRoutes: ["/login", "/signup"], // Rutas donde un usuario autenticado no debería estar
  publicRoutes: ["/"], // Rutas completamente públicas
};

const getLocale = (request: NextRequest) => {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return "es-ES";
  const languages = acceptLanguage.split(",").map((lang) => lang.trim());
  for (const lang of languages) {
    if (locales.includes(lang)) {
      return lang;
    }
  }
  return "es-ES";
};

// Helper para verificar si una ruta requiere autenticación
const isProtectedRoute = (pathname: string): boolean => {
  // Remover el locale del pathname para comparar
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}-[A-Z]{2}/, "") || "/";
  return authConfig.protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );
};

// Helper para verificar si es una ruta de autenticación
const isAuthRoute = (pathname: string): boolean => {
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}-[A-Z]{2}/, "") || "/";
  return authConfig.authRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );
};

// Helper para obtener el locale actual del pathname
const getCurrentLocale = (pathname: string): string | null => {
  const localeMatch = pathname.match(/^\/([a-z]{2}-[A-Z]{2})/);
  return localeMatch ? localeMatch[1] : null;
};

// Helper para construir URL con locale
const buildLocalizedURL = (
  request: NextRequest,
  path: string,
  locale?: string
): URL => {
  const currentLocale =
    locale || getCurrentLocale(request.nextUrl.pathname) || getLocale(request);
  return new URL(`/${currentLocale}${path}`, request.url);
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Primero manejar la localización
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Si no tiene locale, redirigir con locale
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // Autenticación en Supabase (solo para rutas que no son assets)
  if (
    !pathname.includes("/_next/") &&
    !pathname.includes("/api/") &&
    !pathname.includes("/favicon.ico") &&
    !pathname.match(/\.(svg|png|jpg|jpeg|gif|webp)$/)
  ) {
    // Crear respuesta inicial
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    // Refrescar la sesión si es necesario
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    // Debug: Log para verificar cookies y sesión
    const cookies = request.cookies.getAll();
    const authCookies = cookies.filter(
      (cookie) =>
        cookie.name.includes("supabase") || cookie.name.includes("sb-")
    );

    console.log("Middleware Debug:", {
      pathname,
      hasSession: !!session,
      sessionError: sessionError?.message,
      authCookiesCount: authCookies.length,
      cookieNames: authCookies.map((c) => c.name),
    });

    // Si es ruta protegida y no hay sesión válida
    if (isProtectedRoute(pathname) && !session) {
      const currentLocale = getCurrentLocale(pathname) || "es-ES";
      console.log("Redirecting to login - No valid session");
      return NextResponse.redirect(
        new URL(`/${currentLocale}/login`, request.url)
      );
    }

    // Si hay sesión válida y trata de acceder a login/register
    if (session && isAuthRoute(pathname)) {
      const currentLocale = getCurrentLocale(pathname) || "es-ES";
      console.log("Redirecting to dashboard - Valid session found");
      return NextResponse.redirect(
        new URL(`/${currentLocale}/dashboard`, request.url)
      );
    }

    return response;
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // salta todas las rutas internas de nextjs
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
