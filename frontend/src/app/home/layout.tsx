import type { Metadata } from "next";

import "../globals.css";


export const metadata: Metadata = {
  title: "Welcome to invoicy",
  description: "Simplify your invoices with ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container">
      {children}
    </div>
  );
}
