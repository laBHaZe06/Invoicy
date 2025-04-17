"use client";

import { ReactNode, useEffect } from "react";
import { useColorMode } from "../context/ColorModeContext";
import { createCustomTheme } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import clsx from "clsx";

export default function ThemedLayout({ children }: { children: ReactNode }) {
  const { mode } = useColorMode();
  const theme = createCustomTheme(mode);

  useEffect(() => {
    // Ajoute dynamiquement la classe "light" ou "dark" au <html>
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={clsx(mode)}>{children}</div>
    </ThemeProvider>
  );
}
