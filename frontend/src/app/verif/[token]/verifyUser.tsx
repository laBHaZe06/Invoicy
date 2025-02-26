"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Container, Typography, CircularProgress, Button, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const VerifyUser = () => {
    const router = useRouter();
    const params = useParams();
    const token = params?.token;
    const API_URL = process.env.API_URL; 
    const [message, setMessage] = useState("Vérification en cours...");
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!API_URL) {
            console.error("❌ API_URL n'est pas défini !");
            return;
        }

        if (!token) {
            console.error("❌ Aucun token fourni !");
            setMessage("Token invalide ou manquant.");
            setLoading(false);
            return;
        }

        const verifyUser = async () => {
            const requestUrl = `${API_URL}/verif/${token}`;
            
            try {
                const response = await fetch(requestUrl);
                console.log("🔍 Statut HTTP:", response.status);

                const data = await response.json();
                console.log("📩 Réponse API:", data);

                if (response.ok && data.message.includes("Utilisateur activé")) {
                    setMessage("✅ Votre compte a été activé avec succès !");
                    setSuccess(true);
                    setTimeout(() => router.push("/connexion"), 3000);
                } else if (response.ok && data.message.includes("Utilisateur déjà activé")) {
                    setMessage("✅ Votre compte est déjà activé !");
                    setSuccess(true);
                    setTimeout(() => router.push("/connexion"), 3000);
                } else {
                    setMessage(data.message || "❌ Erreur lors de l'activation.");
                    setSuccess(false);
                    setTimeout(() => router.push("/connexion"), 3000);
                }
            } catch (error) {
                console.error("🚨 Erreur lors de la requête:", error);
                setMessage("❌ Une erreur est survenue. Veuillez réessayer.");
                setSuccess(false);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, [API_URL, token, router]);

    return (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
            {loading ? (
                <>
                    <CircularProgress color="primary" />
                    <Typography variant="h6" sx={{ mt: 2 }}>Vérification en cours...</Typography>
                </>
            ) : (
                <Box>
                    {success ? (
                        <>
                            <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
                            <Typography variant="h5" color="success.main">{message}</Typography>
                        </>
                    ) : (
                        <>
                            <ErrorIcon color="error" sx={{ fontSize: 60 }} />
                            <Typography variant="h5" color="error.main">{message}</Typography>
                        </>
                    )}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 3 }} 
                        onClick={() => router.push("/connexion")}
                    >
                        Retour à la connexion
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default VerifyUser;
