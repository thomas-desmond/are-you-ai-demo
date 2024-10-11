import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Are You AI?",
  description: "Cloudflare Powered AI App",
  openGraph: {
    images: [
      {
        url: "https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/61c48ec3-ca58-4db5-5ce2-484e85f9bd00/Full",
        width: 1200,
        height: 630,
        alt: "Are You AI?",
      },
    ],
  },
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
