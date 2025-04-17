"use client";

import { useState, useEffect } from "react";
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, List,
  ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Tooltip,
  Modal, Button
} from "@mui/material";
import {
  Dashboard, Receipt, Notifications, ChevronLeft, ChevronRight,
  AccountCircle, HomeSharp
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useColorMode } from "@/context/ColorModeContext";
import ToggleColorMode from "@/components/Toggle/ToggleColorMode";
import useAuth from "@/hooks/useAuth"; // Assure-toi d'importer le hook
const drawerWidth = 240;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, tokenExpired, userData, loading } = useAuth(); // Utilisation du hook useAuth
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { mode, toggleColorMode } = useColorMode();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/connexion");
      }
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (tokenExpired) {
      // Affichage d'un message modal ou d'une alerte si le token a expiré
      router.push("/connexion"); // Redirige l'utilisateur vers la page de connexion
    }
  }, [tokenExpired, router]);

  const handleRedirect = () => {
    router.push("/connexion");
  };

  const drawer = (
    <Box
      sx={{
        width: sidebarOpen ? drawerWidth : 70,
        bgcolor: "primary.main",
        color: "text.primary",
        height: "100vh",
        transition: "width 0.3s",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
        {sidebarOpen && <Typography variant="h6">Admin Panel</Typography>}
        <IconButton onClick={() => setSidebarOpen(!sidebarOpen)} sx={{ color: "white" }}>
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
      <List>
        {[
          { text: "Dashboard", icon: <Dashboard />, link: "/admin/dashboard" },
          { text: "Factures", icon: <Receipt />, link: "/admin/invoices" },
          { text: "Rappels", icon: <Notifications />, link: "/admin/rappels" },
          { text: "Profil", icon: <AccountCircle />, link: "/admin/profil" },
          { text: "Accueil", icon: <HomeSharp />, link: "/" },
        ].map(({ text, icon, link }) => (
          <Link key={text} href={link} style={{ textDecoration: "none", color: "inherit" }}>
            <Tooltip title={text} placement="right" disableHoverListener={sidebarOpen}>
              <ListItem
                component="li"
                sx={{
                  transition: "background 0.3s",
                  "&:hover": { bgcolor: "rgba(38, 202, 223, 0.42)" },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: sidebarOpen ? 40 : 50 }}>
                  {icon}
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary={text} />}
              </ListItem>
            </Tooltip>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${sidebarOpen ? drawerWidth : 70}px)`,
            ml: `${sidebarOpen ? drawerWidth : 70}px`,
            transition: "width 0.3s",
            backgroundColor: "primary.main",
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {isAuthenticated ? `Bienvenue, ${userData?.firstName}` : "Tableau de bord"}
            </Typography>
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open>
          {drawer}
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            width: `calc(100% - ${sidebarOpen ? drawerWidth : 70}px)`,
            ml: { sm: `${sidebarOpen ? drawerWidth : 70}px` },
            transition: "width 0.3s",
            zIndex: 5,
            position: 'relative',
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
