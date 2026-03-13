import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "./(components)/Header";
import Footer from "./(components)/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  verification: {
    google: "kWwJSsVuMEXzxuzVeK231DU-28aotAezZ8wn1hg6L0Y",
  },
  title: "Ahmed Codes — Junior Software Engineer",
  description:
    "Portfolio of Ahmed Sulaimon — Junior Software Engineer specialising in full-stack and backend development. Based in London, UK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen bg-white dark:bg-slate-900`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
