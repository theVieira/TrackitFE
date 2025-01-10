import { type MiddlewareConfig, NextRequest, NextResponse } from 'next/server'
import {
	SUPPORTED_LOCALES,
	DEFAULT_LOCALE,
	LOCALE_COOKIE_NAME,
} from '../../i18n/locales'

const PUBLIC_ROUTES = [{ path: '/sign-in', whenAuthenticated: 'redirect' }]
const REDIRECT_WHEN_NOT_AUTHENTICATED = '/sign-in'

export function middleware(request: NextRequest) {
	const { nextUrl } = request
	const pathname = nextUrl.pathname

	// Verifica se a URL já tem um prefixo de localidade válido
	const pathnameHasLocale = SUPPORTED_LOCALES.some((locale) =>
		pathname.startsWith(`/${locale}/`)
	)

	// Obtém a localidade do cookie ou usa a padrão
	const locale =
		request.cookies.get(LOCALE_COOKIE_NAME)?.value || DEFAULT_LOCALE

	// Redireciona para adicionar o prefixo de localidade se não estiver presente
	if (!pathnameHasLocale) {
		const redirectUrl = nextUrl.clone()
		redirectUrl.pathname = `/${locale}${pathname}`
		return NextResponse.redirect(redirectUrl)
	}

	// Ajusta o path removendo o locale para comparar com as PUBLIC_ROUTES
	const pathWithoutLocale = pathname.replace(/^\/(en|pt)/, '')

	const publicRoute = PUBLIC_ROUTES.find(
		(route) => route.path === pathWithoutLocale
	)
	const authToken = request.cookies.get('token')

	// Permite acesso a rotas públicas sem autenticação
	if (!authToken && publicRoute) return NextResponse.next()

	// Se não estiver autenticado e tentar acessar uma rota protegida, redireciona para login
	if (!authToken && !publicRoute) {
		const redirectUrl = nextUrl.clone()
		redirectUrl.pathname = `/${locale}${REDIRECT_WHEN_NOT_AUTHENTICATED}`
		return NextResponse.redirect(redirectUrl)
	}

	// Se estiver autenticado e acessar uma rota pública, redireciona para a home
	if (
		authToken &&
		publicRoute &&
		publicRoute.whenAuthenticated === 'redirect'
	) {
		const redirectUrl = nextUrl.clone()
		redirectUrl.pathname = `/${locale}/`
		return NextResponse.redirect(redirectUrl)
	}

	// Caso contrário, segue normalmente
	return NextResponse.next()
}

export const config: MiddlewareConfig = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
	],
}
