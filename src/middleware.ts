import {createServerClient} from '@supabase/ssr';
import { NextRequest, NextResponse } from "next/server";

// Idiomas a soportar
const locales = ['en-US', 'es-ES'];

// Configuración de autenticación
const authConfig = {
  protectedRoutes: ['/dashboard'],
  authRoutes: ['/login', '/signup'], // Rutas donde un usuario autenticado no debería estar
  publicRoutes: ['/'], // Rutas completamente públicas
};

const getLocale=(request:NextRequest)=>{
    const acceptLanguage =request.headers.get('accept-language');
    console.log(acceptLanguage);
    if(!acceptLanguage) return 'es-ES';
    const languages = acceptLanguage.split(',').map(lang=>
         lang.trim()
    );
    for (const lang of languages){
        if(locales.includes(lang)){
            return lang;
        }
    }
    return 'es-ES';

 }

 // Helper para verificar si una ruta requiere autenticación
const isProtectedRoute = (pathname: string): boolean => {
  // Remover el locale del pathname para comparar
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}-[A-Z]{2}/, '') || '/';
  return authConfig.protectedRoutes.some(route => 
      pathWithoutLocale.startsWith(route)
  );
}

// Helper para verificar si es una ruta de autenticación
const isAuthRoute = (pathname: string): boolean => {
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}-[A-Z]{2}/, '') || '/';
  return authConfig.authRoutes.some(route => 
      pathWithoutLocale.startsWith(route)
  );
}

// Helper para obtener el locale actual del pathname
const getCurrentLocale = (pathname: string): string | null => {
  const localeMatch = pathname.match(/^\/([a-z]{2}-[A-Z]{2})/);
  return localeMatch ? localeMatch[1] : null;
}

// Helper para construir URL con locale
const buildLocalizedURL = (request: NextRequest, path: string, locale?: string): URL => {
  const currentLocale = locale || getCurrentLocale(request.nextUrl.pathname) || getLocale(request);
  return new URL(`/${currentLocale}${path}`, request.url);
}

export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    // Autenticacion en Supabase
    if (
      !pathname.includes('/_next/') &&
      !pathname.includes('/api/') &&
      !pathname.includes('/favicon.ico') &&
      !pathname.match(/\.(svg|png|jpg|jpeg|gif|webp)$/)
  ) {
      let supabaseResponse = NextResponse.next({
          request: {
              headers: request.headers,
          },
      });

      const supabase = createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
          {
              cookies: {
                  get(name: string) {
                      return request.cookies.get(name)?.value;
                  },
                  set(name: string, value: string, options: any) {
                      request.cookies.set({
                          name,
                          value,
                          ...options,
                      });
                      supabaseResponse = NextResponse.next({
                          request: {
                              headers: request.headers,
                          },
                      });
                      supabaseResponse.cookies.set({
                          name,
                          value,
                          ...options,
                      });
                  },
                  remove(name: string, options: any) {
                      request.cookies.set({
                          name,
                          value: '',
                          ...options,
                      });
                      supabaseResponse = NextResponse.next({
                          request: {
                              headers: request.headers,
                          },
                      });
                      supabaseResponse.cookies.set({
                          name,
                          value: '',
                          ...options,
                      });
                  },
              },
          }
      );

      // Obtener usuario autenticado
      const { data: { user } } = await supabase.auth.getUser();

      // Si es ruta protegida y no hay usuario
      if (isProtectedRoute(pathname) && !user) {
          return NextResponse.redirect(buildLocalizedURL(request, '/login'));
      }

      // Si hay usuario autenticado y trata de acceder a login/register
      if (user && isAuthRoute(pathname)) {
          return NextResponse.redirect(buildLocalizedURL(request, '/dashboard'));
      }
  }
    //////////////////////////////
    const pathnameHasLocale = locales.some(
        (locale)=> pathname.startsWith(`/${locale}`) || pathname === `${locale}`
    )
    if(pathnameHasLocale) return ;
    const locale =   getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);

    
}
 
 // See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // salta todas las rutas internas de nextjs
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ]
}