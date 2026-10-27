import {NextRequest, NextResponse} from 'next/server';

export async function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken && refreshToken) {
        const refreshRes = await fetch(`${process.env.SERVER_ENDPOINT}/auth/refresh`, {
            method: 'POST',
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
            },
        });

        if (refreshRes.ok) {
            const setCookies = refreshRes.headers.getSetCookie();

            const requestHeaders = new Headers(request.headers);

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
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/chat/:path*', '/profile/:path*'],
};