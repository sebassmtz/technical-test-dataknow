import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/hooks/SessionProvider";
import { ModalProviders } from "@/hooks/modal-providers";
import { NavBar } from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Technical Test DataKnows",
  description: "Author by Sebastian Martinez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <NavBar />
          {children}
          <ModalProviders />
        </SessionProvider>
      </body>
    </html>
  );
}
