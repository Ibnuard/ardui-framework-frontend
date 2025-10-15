import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  

  if (!token && !req.nextUrl.pathname.startsWith('/signin')) {
  return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (token && req.nextUrl.pathname === '/signin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};

