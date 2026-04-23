import { NextResponse } from 'next/server';

export function proxy(request) {
  const token = request.cookies.get('admin_token')?.value;
  const isValid = token === process.env.ADMIN_PASSWORD;

  if (!isValid) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin'],
};
