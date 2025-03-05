"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ErrorPage({ error }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error("Erreur détectée :", error);
  }, [error]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
        <Typography variant="h5" color="error">
          Oups ! Une erreur est survenue.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Il semble que votre lien de vérification soit invalide ou ait expiré.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
          sx={{ mt: 2 }}
        >
          Retour à l&lsquo;accueil
        </Button>
      </Box>
    </Container>
  );
}
