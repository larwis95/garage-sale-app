import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ApolloWrapper } from "./ApolloWrapper";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sale Spotter App",
  description: "Estate, Garage, Moving, and Yard Sale Finder",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <Nav />
          <div>{children}</div>
        </ApolloWrapper>
      </body>
    </html>
  );
}
