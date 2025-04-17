import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ColorModeProvider } from "../context/ColorModeContext";
import ThemedLayout from "../theme/ThemedLayout"; 

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Invoicy",
  description: "Invoicy simplifies invoice creation for customers",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ColorModeProvider>
          <ThemedLayout>
          <Lines />
            {children}
          </ThemedLayout>
          <ScrollToTop />
        </ColorModeProvider>
      </body>
    </html>
  );
}
