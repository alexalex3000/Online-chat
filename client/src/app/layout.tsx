import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "@/app/globals.css";
import AlertWindow from "@/features/AlertWindow/AlertWindow";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Echo Chat",
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const theme = cookieStore.get("theme")?.value ?? "dark";

    return (
        <html lang="ru" data-theme={theme} className={inter.variable} suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
            {children}
            <AlertWindow/>
        </body>
        </html>
    );
}