import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moviesmis | Design for Movies and Series Binger",
  description: "Design for Movies and Series Binger",
  keywords: ["movies", "series", "entertainment", "design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="dark:bg-primary bg-white overflow-hidden">
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
