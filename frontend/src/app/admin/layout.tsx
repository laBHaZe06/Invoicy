// app/admin/layout.tsx
"use client";
import { useState } from "react";
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, List,
  ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Tooltip,
} from "@mui/material";
import {
  Dashboard, Receipt, Notifications, ChevronLeft, ChevronRight,
  AccountCircle, HomeSharp
} from "@mui/icons-material";
import Link from "next/link";
import { useColorMode } from "@/context/ColorModeContext";
import ToggleColorMode from "@/components/Toggle/ToggleColorMode";

const drawerWidth = 240;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { mode, toggleColorMode } = useColorMode();

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
        {sidebarOpen && <Typography variant="h6"></Typography>}
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
            Tableau de bord
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
          
          
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
