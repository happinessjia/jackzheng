import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Zheng Jiajia's Portfolio",
  description: "Personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <LanguageProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Zheng Jiajia&apos;s Portfolio. All rights reserved.
      </div>
    </footer>
  )
}
