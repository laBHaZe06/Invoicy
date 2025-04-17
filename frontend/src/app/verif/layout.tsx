import type { Metadata } from "next";

import "@/styles/globals.css";


export const metadata: Metadata = {
  title: "Activation account in Invoicy",
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
