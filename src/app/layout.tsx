import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diagnoxix",
  description: "Diagnoxix AI",
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
