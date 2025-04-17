"use client";

import { useEffect, useState } from "react";
import NavBarComponent from "@/components/Navbar/NavBarComponent";
import FooterComponent from "@/components/Footer/FooterComponent";
import Box from "@mui/material/Box";
import Hero from "@/components/Hero/Hero";
import Alert from "@mui/material/Alert";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

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
        {isLoggedIn && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Bienvenue, {username} ! Vous êtes connecté.
          </Alert>
        )}
        <Hero />
        <FooterComponent />
      </Box>
    </div>
  );
}
