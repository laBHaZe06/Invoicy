"use client";

import { useEffect, useState } from "react";
import NavBarComponent from "@/components/Navbar/NavBarComponent";
import FooterComponent from "@/components/Footer/FooterComponent";
import Box from "@mui/material/Box";
import Hero from "@/components/Hero/Hero";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const [, payloadBase64] = token.split(".");
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      const { exp, roles, username } = payload;
      const now = Math.floor(Date.now() / 1000);

      if (exp > now && roles?.includes("ROLE_USER")) {
        setIsLoggedIn(true);
        setUsername(username);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du token :", error);
    }
  }, []);

  return (
    <div>
      <NavBarComponent />
      <Box sx={{ mt: 5 }}>
        {isLoggedIn && open && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10, mb: 3 }}>
            <Alert
              severity="success"
              sx={{ width: "100%", maxWidth: "500px",zIndex: 5, position: 'relative', marginTop: 8 }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Bienvenue, {username} ! Vous êtes connecté.
            </Alert>
          </Box>
        )}
        <Hero />
        <FooterComponent />
      </Box>
    </div>
  );
}
