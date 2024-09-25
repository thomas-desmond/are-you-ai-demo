import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Are You AI?",
  description: "Cloudflare Powered AI App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-gray-100 to-gray-200 ">
        <div></div>
        <div className="">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
