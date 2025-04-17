import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "About us",
  description: "Invoicy simplifies the process of creating a new invoice from the customer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
