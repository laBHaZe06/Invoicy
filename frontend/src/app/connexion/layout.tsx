import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Connexion in Invoicy",
  description: "Simplify your invoices",
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
