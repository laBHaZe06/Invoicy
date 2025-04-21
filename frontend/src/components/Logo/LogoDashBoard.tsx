"use client";

import Image from "next/image";
import "@/styles/logoNav.css";
import { useColorMode } from "@/context/ColorModeContext";

export default function LogoDashBoard() {
  const { mode } = useColorMode();

  const logoSrc =
    mode === "light"
      ? "/images/Invoicy-dash.png"
      : "/images/Invoicy-dash-dark.png"; 

  return (
    <div className="logo">
      <Image
        src={logoSrc}
        width={90}
        height={80}
        loading="lazy"
        quality={100}
        alt="Logo Invoicy"
        style={{marginTop: 10}}
      />
    </div>
  );
}
