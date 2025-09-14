// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'authToken';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value || null;

  const authPages = ['/login', '/signup', '/verify', '/reset-password'];
  const protectedPages = ['/checkout', '/success', '/account', '/order'];

  if (protectedPages.some(path => url.pathname.startsWith(path)) && !token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }


  if (authPages.some(path => url.pathname.startsWith(path)) && token) {
    url.pathname = '/products';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/account/:path*',
    '/checkout',
    '/success',
    '/verify',
    '/reset-password',
    '/order/:path*',   
  ],
};
