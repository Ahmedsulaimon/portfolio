import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./(components)/Header";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Ahmed Codes",
  description: "developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> 
       
      <body
        className={inter.className}
      >
         <Header/> 
        {children}
      </body>
    </html>
  );
}
