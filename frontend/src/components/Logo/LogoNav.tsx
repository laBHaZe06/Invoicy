"use client";

import Image from "next/image";
import "../../styles/logoNav.css";
import { useColorMode } from "@/context/ColorModeContext";

export default function LogoNav() {
  const { mode } = useColorMode();

  const logoSrc =
    mode === "light"
      ? "/images/Invoicy-light.png"
      : "/images/Invoicy.png"; 

  return (
    <div className="logo">
      <Image
        src={logoSrc}
        width={180}
        height={180}
        loading="lazy"
        quality={80}
        alt="Logo Invoicy"
      />
    </div>
  );
}
