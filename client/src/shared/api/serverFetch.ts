import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const BACKEND_URL = process.env.SERVER_ENDPOINT || 'http://localhost:4200/api/v1';

async function forwardSetCookieHeaders(response: Response) {
    const cookieStore = await cookies();

    const setCookies = response.headers.getSetCookie
        ? response.headers.getSetCookie()
        : [response.headers.get('set-cookie') || ''];

    for (const cookieStr of setCookies) {
        if (!cookieStr) continue;

        const parts = cookieStr.split(';').map((p) => p.trim());
        const [nameVal, ...attrs] = parts;
        const [name, val] = nameVal.split('=');

        if (!name || val === undefined) continue;

        let maxAge: number | undefined;
        let path = '/';
        let httpOnly = false;
        let secure = false;
        let sameSite: 'strict' | 'lax' | 'none' = 'lax';

        for (const attr of attrs) {
            const lower = attr.toLowerCase();
            if (lower.startsWith('max-age=')) {
                maxAge = parseInt(attr.split('=')[1], 10);
            } else if (lower.startsWith('path=')) {
                path = attr.split('=')[1];
            } else if (lower === 'httponly') {
                httpOnly = true;
            } else if (lower === 'secure') {
                secure = true;
            } else if (lower.startsWith('samesite=')) {
                const s = lower.split('=')[1];
                if (s === 'strict' || s === 'lax' || s === 'none') sameSite = s;
            }
        }

        cookieStore.set(name, val, {
            path,
            httpOnly,
            secure,
            sameSite,
            ...(maxAge !== undefined ? { maxAge } : {}),
        });
    }
}

export async function serverFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const cookieStore = await cookies();
    const url = `${BACKEND_URL}${endpoint}`;

    let cookieHeader = cookieStore.toString();

    let response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(cookieHeader ? { Cookie: cookieHeader } : {}),
            ...options.headers,
        },
        cache: 'no-store',
    });

   if (response.status === 401) {
        const refreshResponse = await fetch(`${BACKEND_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(cookieHeader ? { Cookie: cookieHeader } : {}),
            },
            cache: 'no-store',
        });

        if (!refreshResponse.ok) {
            cookieStore.delete('accessToken');
            cookieStore.delete('refreshToken');
            redirect('/login');
        }

        await forwardSetCookieHeaders(refreshResponse);

        const updatedCookieStore = await cookies();
        cookieHeader = updatedCookieStore.toString();

        response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(cookieHeader ? { Cookie: cookieHeader } : {}),
                ...options.headers,
            },
            cache: 'no-store',
        });
    }

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result?.message || `Request failed with status ${response.status}`);
    }

    return result as T;
}