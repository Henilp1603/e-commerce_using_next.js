import type {Metadata} from "next";
import {Urbanist} from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ModalProvider from "@/providers/modal-provider";
import ToasterProvider from "@/providers/toast-provider";

const urbanist = Urbanist({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "E-sHop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <ModalProvider />
        <ToasterProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
