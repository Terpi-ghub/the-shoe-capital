import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const poppins = Poppins({ weight: ["400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Shoe Capital",
  description: "Official English Journalism Publication of Marikina High School",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} flex flex-col min-h-screen bg-gray-50`}>
          <SiteHeader />
          {children}
          <Footer />
          <BackToTop />
        </body>
      </html>
    </ClerkProvider>
  );
}