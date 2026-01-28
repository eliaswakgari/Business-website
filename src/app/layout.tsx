import type React from "react";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BusinessCMS - Professional Content Management System",
  description: "Professional Content Management System for Modern Businesses. Streamline your content workflow with powerful features.",
  generator: "Mohamed Djoudir",
  openGraph: {
    title: "BusinessCMS - Professional Content Management System",
    description: "Professional Content Management System for Modern Businesses",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "BusinessCMS",
      },
    ],
    type: "website",
    siteName: "BusinessCMS",
  },
  twitter: {
    card: "summary_large_image",
    title: "BusinessCMS - Professional Content Management System",
    description: "Professional Content Management System for Modern Businesses",
    images: ["/image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
