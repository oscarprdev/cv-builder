import Auth from '~/features/auth/shared/presentation/layout/AuthLayout';

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Auth>{children}</Auth>;
}
