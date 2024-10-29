import type { Metadata } from "next";
import { Inter, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const bodoniModa = Bodoni_Moda({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grand Rising Studio",
  description:
    "Grand Rising Studio is a barber, tattoo, and design studio based out of Whangarei New Zealand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  ${bodoniModa.variable} bg-black`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
