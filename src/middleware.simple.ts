import { NextRequest, NextResponse } from "next/server";

// Idiomas a soportar
const locales = ["en-US", "es-ES"];

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Solo manejar localización para evitar problemas en Vercel
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Si no tiene locale, redirigir con locale
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};