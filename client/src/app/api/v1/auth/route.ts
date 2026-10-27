import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const cookieStore = await cookies();
    cookieStore.delete("refreshToken");
    cookieStore.delete("accessToken");

    const url = new URL(req.url);
    const redirectUrl = url.searchParams.get("redirect") || "/login";

    return NextResponse.redirect(new URL(redirectUrl, req.url));
}