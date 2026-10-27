import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JAMB Naija — UTME Practice & CBT",
    template: "%s | JAMB Naija",
  },
  description:
    "Prepare for JAMB UTME with timed CBT practice, subject drills, and clear answer reviews. Practice Use of English, Mathematics, Physics, Chemistry, and Biology.",
  openGraph: {
    title: "JAMB Naija — UTME Practice & CBT",
    description:
      "Timed computer-based practice for JAMB UTME with subject selection and detailed review.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
