import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import "@uploadthing/react/styles.css";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meta Blog",
  description:
    "Meta Blog is a blog app where any user can share whats on his mind!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${workSans.className}`}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
