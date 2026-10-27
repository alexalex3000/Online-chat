import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const BACKEND_URL = process.env.SERVER_ENDPOINT || 'http://localhost:4200/api/v1';

export async function serverFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const cookieStore = await cookies();
    const url = `${BACKEND_URL}${endpoint}`;

    const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(cookieHeader ? { Cookie: cookieHeader } : {}),
            ...options.headers,
        },
        cache: 'no-store',
    });

    const setCookieHeaders = response.headers.getSetCookie?.() || [response.headers.get('set-cookie') || ''];

    for (const cookieStr of setCookieHeaders) {
        if (!cookieStr) continue;

        const [nameValue, ...directives] = cookieStr.split(';');
        const [name, ...valParts] = nameValue.split('=');
        const value = valParts.join('=');

        if (!name || value === undefined) continue;

        const isHttpOnly = directives.some((d) => d.trim().toLowerCase() === 'httponly');
        const isSecure = directives.some((d) => d.trim().toLowerCase() === 'secure');

        const pathDirective = directives.find((d) => d.trim().toLowerCase().startsWith('path='));
        const path = pathDirective ? pathDirective.split('=')[1].trim() : '/';

        const maxAgeDirective = directives.find((d) => d.trim().toLowerCase().startsWith('max-age='));
        const maxAge = maxAgeDirective ? parseInt(maxAgeDirective.split('=')[1].trim(), 10) : undefined;

        try {
            cookieStore.set(name.trim(), value.trim(), {
                httpOnly: isHttpOnly,
                secure: process.env.NODE_ENV === 'production' ? isSecure : false,
                sameSite: 'lax',
                path: path,
                maxAge: maxAge,
            });
        } catch(e) {
            console.error(e)
        }
    }

    if (response.status === 401) {
        redirect('/login');
    }

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result?.message || `Request failed with status ${response.status}`);
    }

    return result as T;
}