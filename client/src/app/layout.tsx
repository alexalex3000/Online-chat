import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-inter",
    display: "swap",
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru" data-theme="gray" className={inter.variable}>
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}