"use client";

import { useEffect, useState } from "react";
import { useRouter,  useParams } from "next/navigation";
import { Container, Typography, CircularProgress, Button, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const VerifyUser = () => {
    const router = useRouter();
    const { token } = useParams();
    const API_URL = process.env.API_URL; 
    const [message, setMessage] = useState("Vérification en cours...");
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    console.log("Token à vérifier:", token);


    useEffect(() => {
        if (!API_URL) {
            console.error("�� API_URL n'est pas défini!");
            return;
        }
        if (!token) {
            console.error("�� Aucun token fourni!");
            setMessage("Token invalide ou manquant.");
            setLoading(false);
            return;
        }
        const verifyUser = async () => {
            try {
                const response = await fetch(`${API_URL}/verif/${token}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                    credentials: "include",
                });
                const data = await response.json();
                if (response.status === 200) {
                    setMessage(data.message);
                    setSuccess(true);
                    setLoading(false);
                    setTimeout(() => {
                        router.push("/");
                    }, 3500);
                } else {
                    setMessage(data.message);
                    setLoading(false);
                    setTimeout(() => {
                        router.push("/inscription");
                    }, 3500);
                }
            } catch (error) {
                console.error("Erreur lors de la vérification:", error);
                setMessage("Erreur lors de la vérification.");
            } finally {
                setLoading(false);
            }
        }
        verifyUser();
    }
    , [API_URL, token, router]);

    return (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
            {loading ? (
                <>
                    <CircularProgress color="primary" sx={{mt: 10}} />
                    <Typography variant="h6" sx={{ mt: 8 }}>Vérification en cours...</Typography>
                </>
            ) : (
                <Box>
                    {success ? (
                        <>
                            <CheckCircleIcon color="success" sx={{ fontSize: 60, mt: 10 }} />
                            <Typography variant="h5" color="success.main" sx={{mt: 8}}>{message}</Typography>
                        </>
                    ) : (
                        <>
                            <ErrorIcon color="error" sx={{ fontSize: 60, mt: 10 }} />
                            <Typography variant="h5" color="error.main" sx={{mt: 8}}>{message}</Typography>
                        </>
                    )}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 8 }} 
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
