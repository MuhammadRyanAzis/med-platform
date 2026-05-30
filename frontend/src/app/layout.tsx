import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hospa Medical Centre",
    description: "Ujian Kenaikan Level Sistem Medis 2026",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen`}>
                <Navbar />
                <main className="container mx-auto p-6">{children}</main>
            </body>
        </html>
    );
}