"use client";

import { useEffect, useState } from "react";
import { Box, Fab, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 99,
      }}
    >
      {isVisible && (
        <Fab
          onClick={scrollToTop}
          size="small"
          aria-label="scroll to top"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            boxShadow: theme.shadows[3],
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
              opacity: 0.8,
              boxShadow: theme.shadows[6],
            },
          }}
        >
          <KeyboardArrowUpIcon sx={{ transform: "translateY(-1px)" }} />
        </Fab>
      )}
    </Box>
  );
}
