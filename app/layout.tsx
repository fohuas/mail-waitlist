import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "邮件等待列表 | 即将推出全新体验",
  description: "加入我们的等待列表，成为第一批体验我们全新产品的用户",
  keywords: "等待列表, 邮件列表, 新产品, 早期访问",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950 text-gray-900 dark:text-gray-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
