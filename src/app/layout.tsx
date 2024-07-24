import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ApolloWrapper from "@/app/providers/Apollo";
import NotificationProvider from "@/app/providers/Notification";
import NotificationBox from "./components/Notifications";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sale Spotter App",
  description: "Estate, Garage, Moving, and Yard Sale Finder",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
          <NotificationProvider>
            <div>{children}</div>
            <NotificationBox />
          </NotificationProvider>
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}
