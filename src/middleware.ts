import { NextRequest, NextResponse } from 'next/server';

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'prosite.kr';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Skip internal paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  const isLocalhost =
    hostname.includes('localhost') || hostname.includes('127.0.0.1');

  let subdomain: string | null = null;

  if (isLocalhost) {
    // Local dev: use ?tenant=slug query param
    subdomain = url.searchParams.get('tenant');
  } else {
    // Production: extract subdomain from hostname
    const hostWithoutPort = hostname.split(':')[0];
    if (hostWithoutPort !== ROOT_DOMAIN && hostWithoutPort !== `www.${ROOT_DOMAIN}`) {
      const parts = hostWithoutPort.replace(`.${ROOT_DOMAIN}`, '');
      if (parts && parts !== hostWithoutPort) {
        subdomain = parts;
      }
    }
  }

  // app.prosite.kr → admin dashboard routes
  if (subdomain === 'app') {
    if (!pathname.startsWith('/admin') && !pathname.startsWith('/dashboard')) {
      url.pathname = `/admin${pathname === '/' ? '' : pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // {slug}.prosite.kr → tenant site
  if (subdomain && subdomain !== 'www') {
    url.pathname = `/sites/${subdomain}${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  // www or root → landing page
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
