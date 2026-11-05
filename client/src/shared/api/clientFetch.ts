const BACKEND_URL = process.env.SERVER_ENDPOINT || 'http://localhost:4200/api/v1';

export async function clientFetch<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${BACKEND_URL}${url}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if(!response.ok){
        const json = await response.json();
        throw new Error(json.message);
    }

    const result  = await response.json();

    return result
}