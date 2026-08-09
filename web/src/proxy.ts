import { ACCESS_TOKEN_COOKIE_NAME, getApiBaseUrls } from './lib/auth/session'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTE_PREFIXES = [
  '/dashboard',
  '/acessos',
  '/moradores',
  '/visitantes',
  '/prestadores-servicos',
  '/eventos',
  '/ocorrencias',
  '/autorizacoes',
  '/relatorios',
] as const

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

async function isAccessTokenValid(accessToken: string): Promise<boolean> {
  const apiBaseUrls = getApiBaseUrls()

  for (const apiBaseUrl of apiBaseUrls) {
    try {
      const response = await fetch(`${apiBaseUrl}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
        cache: 'no-store',
      })

      if (response.ok) {
        return true
      }

      if (response.status === 401 || response.status === 403) {
        return false
      }
    } catch {
      const isLastAttempt = apiBaseUrl === apiBaseUrls[apiBaseUrls.length - 1]

      if (isLastAttempt) {
        return false
      }
    }
  }

  return false
}

function redirectToLoginAndClearCookie(request: NextRequest): NextResponse {
  const response = NextResponse.redirect(new URL('/', request.url))
  response.cookies.delete(ACCESS_TOKEN_COOKIE_NAME)

  return response
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value

  if (!accessToken) {
    if (isProtectedPath(pathname)) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  }

  const tokenIsValid = await isAccessTokenValid(accessToken)

  if (!tokenIsValid) {
    if (pathname === '/' || isProtectedPath(pathname)) {
      return redirectToLoginAndClearCookie(request)
    }

    return NextResponse.next()
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/acessos/:path*',
    '/moradores/:path*',
    '/visitantes/:path*',
    '/prestadores-servicos/:path*',
    '/eventos/:path*',
    '/ocorrencias/:path*',
    '/autorizacoes/:path*',
    '/relatorios/:path*',
  ],
}
