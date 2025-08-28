// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// এখানে তোমার লগইন চেক করার জন্য টোকেন বা কুকি নাম ব্যবহার করো
const AUTH_COOKIE_NAME = 'authToken';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value || null;

  // যেখানে লগইন/সাইনআপ পেজ আছে
  const authPages = ['/login', '/signup'];

  // যেখানে কাউন্টআউট বা প্রটেক্টেড পেজ আছে
  const protectedPages = [ '/checkout', '/success','/account'];

  // **কাউন্টআউট বা প্রটেক্টেড পেজে লগইন চেক**
  if (protectedPages.some(path => url.pathname.startsWith(path)) && !token) {
    url.pathname = '/login'; // লগইন পেজে রিডাইরেক্ট
    return NextResponse.redirect(url);
  }

  // **লগইন থাকলে লগইন/সাইনআপ পেজে প্রবেশ নিষেধ**
  if (authPages.some(path => url.pathname.startsWith(path)) && token) {
    url.pathname = '/products'; // হোম বা কাউন্টআউট পেজে রিডাইরেক্ট
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// এই পাথগুলোতে middleware প্রয়োগ হবে
export const config = {
  matcher: ['/login', '/signup', '/account', '/checkout', '/success'],
};
