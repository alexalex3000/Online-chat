import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Echo Chat",
};

const themeScript = `
  (function() {
    try {
      var match = document.cookie.match(new RegExp('(^| )theme=([^;]+)'));
      var theme = match ? match[2] : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
`;

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru" data-theme="dark" className={inter.variable} suppressHydrationWarning>
        <head>
            <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
        <body className={inter.className} suppressHydrationWarning>
        {children}
        </body>
        </html>
    );
}