export * from 'next-auth/middleware';

export const config = {
	matcher: ['/dashboard', '/builder/:id', '/preview/:id'],
};
