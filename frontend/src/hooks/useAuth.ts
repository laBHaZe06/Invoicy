// hooks/useAuth.ts
import { useState, useEffect } from "react"; 
import { User } from '@/type/User';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [userData, setUserData] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const [, payloadBase64] = token.split(".");
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      const { exp } = payload;
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = exp - now;

      if (timeLeft <= 0) {
        setTokenExpired(true);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        setUserData(payload); // Ici, tu attribues les données utilisateur (assure-toi que les données du payload sont bien typées)
        setTokenExpired(false);
      }

      setLoading(false);

    } catch (err) {
      console.error("Erreur lors du décodage JWT :", err);
      setTokenExpired(true);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, tokenExpired, userData, loading };
};

export default useAuth;
