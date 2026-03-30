import type { Metadata } from "next";
import "./globals.css";

import Header from "./header";
import Footer from "./footer";
import { withBasePath } from "@/lib/base-path";

import localFont from "next/font/local";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const jamsil = localFont({
  src: "../fonts/TheJamsil5Bold.woff2",
  display: "swap",
  variable: "--font-thejamsil",
});

export const metadata: Metadata = {
  title: "SSU ASC",
  description: "숭실대학교 정보보안 소모임 ASC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="shortcut icon" href={withBasePath("/wht.png")} type="image/x-icon" />
      </head>
      <body className={`${pretendard.variable} ${jamsil.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
