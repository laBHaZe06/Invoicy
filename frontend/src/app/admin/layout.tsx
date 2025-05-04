"use client";

import { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography,
  Modal,
  Button
} from "@mui/material";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import SideBarComponent from "@/components/SideBar/SideBarComponents";
import TopBarComponent from "@/components/TopBar/TopBarComponent"
const drawerWidth = 240;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, tokenExpired, userData, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${process.env.API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        router.push("/connexion");
      } else {
        console.error("Erreur lors du logout :", await res.text());
      }
    } catch (error) {
      console.error("Erreur réseau pendant le logout :", error);
    }
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/connexion");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (tokenExpired) {
      router.push("/connexion");
    }
  }, [tokenExpired, router]);

  const handleRedirect = () => {
    router.push("/connexion");
  };

  return (
    <>
      <Box sx={{ display: "flex", height: '100vh' }}>
        <CssBaseline />

        {/* AppBar */}
        <TopBarComponent
            isAuthenticated={isAuthenticated}
            username={userData?.username}
            sidebarOpen={sidebarOpen}
          />

        {/* Sidebar */}
        <Drawer variant="permanent" open>
          <SideBarComponent
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            handleLogout={handleLogout}
          />
        </Drawer>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            width: `calc(100% - ${sidebarOpen ? drawerWidth : 70}px)`,
            ml: { sm: `${sidebarOpen ? drawerWidth : 70}px` },
            transition: "width 0.3s",
            zIndex: 5,
            position: "relative",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>

      {/* Modal d’expiration */}
      <Modal
        open={tokenExpired}
        onClose={() => {}}
        aria-labelledby="token-expired-title"
        aria-describedby="token-expired-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography id="token-expired-title" variant="h6" sx={{ mb: 2 }}>
            Votre session a expiré
          </Typography>
          <Typography id="token-expired-description" sx={{ mb: 3 }}>
            Veuillez vous reconnecter pour continuer.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleRedirect}>
            Revenir à la connexion
          </Button>
        </Box>
      </Modal>
    </>
  );
}
