import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.SERVER_ENDPOINT || 'http://localhost:4200/api/v1';

export async function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!accessToken && refreshToken) {
        try {
            const refreshRes = await fetch(`${BACKEND_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                    Cookie: request.headers.get('cookie') || `refreshToken=${refreshToken}`,
                },
                cache: 'no-store',
            });

            if (refreshRes.ok) {
                const setCookies = refreshRes.headers.getSetCookie();

                const updatedCookies = new Map<string, string>();
                request.cookies.getAll().forEach((c) => updatedCookies.set(c.name, c.value));

                setCookies.forEach((cookieStr) => {
                    const [nameValue] = cookieStr.split(';');
                    const [name, ...valParts] = nameValue.split('=');
                    if (name && valParts.length > 0) {
                        updatedCookies.set(name.trim(), valParts.join('=').trim());
                    }
                });

                const mergedCookieHeader = Array.from(updatedCookies.entries())
                    .map(([k, v]) => `${k}=${v}`)
                    .join('; ');

                const requestHeaders = new Headers(request.headers);
                requestHeaders.set('cookie', mergedCookieHeader);

                const response = NextResponse.next({
                    request: {
                        headers: requestHeaders,
                    },
                });

                setCookies.forEach((cookieStr) => {
                    response.headers.append('Set-Cookie', cookieStr);
                });

                return response;
            }
        } catch (error) {
            console.error('[Middleware] Refresh fetch failed:', error);
        }

        const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
        redirectResponse.cookies.delete('accessToken');
        redirectResponse.cookies.delete('refreshToken');
        return redirectResponse;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/chat/:path*', '/profile/:path*'],
};