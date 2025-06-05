import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "SKILL FLOW",
  description: "- a platform for all",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <SessionProvider>
          {/* header section */}
          <header className=" bg-white border-b  sticky top-0 z-50">
            <TopBar />
            <NavBar />
          </header>
          {/* main page section */}
          <div className="flex-1  ">{children}</div>

          <footer className="w-full">
            <Footer />
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
