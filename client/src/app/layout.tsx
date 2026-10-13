import {Inter} from "next/font/google";
import "./globals.css";
import {cookies} from "next/headers";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-inter",
    display: "swap",
});

export default async function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const cookiesStore = await cookies()
    const theme = cookiesStore.get("theme")?.value || "dark"
    console.log(theme)
    return (
        <html lang="ru" data-theme={theme} className={inter.variable}>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}