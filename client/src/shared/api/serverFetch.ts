import 'server-only';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.SERVER_ENDPOINT || 'http://127.0.0.1:4200/api/v1';

export async function serverFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const cookieStore = await cookies();
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${BACKEND_URL}${cleanEndpoint}`;

    const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

    const headers = new Headers(options.headers);

    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    if (cookieHeader) {
        headers.set('Cookie', cookieHeader);
    }

    let response: Response;

    try {
        response = await fetch(url, {
            ...options,
            headers,
            cache: options.cache || 'no-store',
        });

    } catch (error) {
        console.error(`[serverFetch] Network error on ${url}:`, error);
        throw new Error('Server in not available');
    }

    const setCookieHeaders = response.headers.getSetCookie?.() ?? [];

    for (const cookieStr of setCookieHeaders) {
        if (!cookieStr) continue;

        const [nameValue, ...directives] = cookieStr.split(';');
        const [name, ...valParts] = nameValue.split('=');
        const value = valParts.join('=');

        if (!name || value === undefined) continue;

        const lowerDirectives = directives.map((d) => d.trim().toLowerCase());
        const isHttpOnly = lowerDirectives.includes('httponly');
        const isSecure = lowerDirectives.includes('secure');

        const pathDir = directives.find((d) => d.trim().toLowerCase().startsWith('path='));
        const path = pathDir ? pathDir.split('=')[1].trim() : '/';

        const maxAgeDir = directives.find((d) => d.trim().toLowerCase().startsWith('max-age='));
        const maxAge = maxAgeDir ? parseInt(maxAgeDir.split('=')[1].trim(), 10) : undefined;

        try {
            cookieStore.set(name.trim(), value.trim(), {
                httpOnly: isHttpOnly,
                secure: process.env.NODE_ENV === 'production' ? isSecure : false,
                sameSite: 'lax',
                path,
                ...(maxAge !== undefined && !Number.isNaN(maxAge) ? { maxAge } : {}),
            });
        } catch {}
    }

    if (response.status === 401) {
        try {
            cookieStore.delete('accessToken');
            cookieStore.delete('refreshToken');
        } catch {}

        throw new Error('Unauthorized');
    }

    const text = await response.text();
    const result = text ? JSON.parse(text) : null;

    if (!response.ok) {
        throw new Error(result?.message || `Request failed with status ${response.status}`);
    }

    return result as T;
}