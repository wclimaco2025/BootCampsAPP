import { NextRequest, NextResponse } from "next/server";

// Idiomas a soportar
const locales = ['en-US', 'es-ES'];

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
export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
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
    '/((?!_next).*)'
  ]
}