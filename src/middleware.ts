import { auth } from './auth';

const PUBLIC_ROUTES = ['/', '/signup', '/signin'];

export default auth(req => {
	if (!req.auth && !PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
		const newUrl = new URL('/signin', req.nextUrl.origin);

		return Response.redirect(newUrl);
	}

	if (!req.auth && req.nextUrl.pathname === '/') {
		const newUrl = new URL('/signin', req.nextUrl.origin);

		return Response.redirect(newUrl);
	}

	if (req.auth && req.nextUrl.pathname === '/') {
		const newUrl = new URL('/dashboard', req.nextUrl.origin);

		return Response.redirect(newUrl);
	}
});

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
