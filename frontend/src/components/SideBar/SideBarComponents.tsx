"use client";

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import {
  Dashboard, Receipt, Notifications, ChevronLeft, ChevronRight,
  AccountCircle, HomeSharp, ExitToApp
} from "@mui/icons-material";
import Link from "next/link";
import LogoDashBoard from "@/components/Logo/LogoDashBoard";

const drawerWidth = 240;

type SidebarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    handleLogout: () => void;
};

export default function SidebarComponent({ sidebarOpen, setSidebarOpen, handleLogout }: SidebarProps) {
    return (
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
            {sidebarOpen && <Typography variant="h6"><LogoDashBoard /></Typography>}
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
            { text: "Déconnexion", icon: <ExitToApp />, action: handleLogout },
            ].map(({ text, icon, link, action }) => {
            const content = (
                <Tooltip title={text} placement="right" disableHoverListener={sidebarOpen}>
                <ListItem
                    sx={{
                    transition: "background 0.3s",
                    "&:hover": {
                        bgcolor: text === "Déconnexion"
                        ? "rgba(255, 72, 66, 0.4)"
                        : "rgba(38, 202, 223, 0.42)",
                    },
                    }}
                >
                    <ListItemIcon sx={{ color: "inherit", minWidth: sidebarOpen ? 40 : 50 }}>
                    {icon}
                    </ListItemIcon>
                    {sidebarOpen && <ListItemText primary={text} />}
                </ListItem>
                </Tooltip>
            );

            if (link) {
                return (
                <Link key={text} href={link} style={{ textDecoration: "none", color: "inherit" }}>
                    {content}
                </Link>
                );
            }

            return (
                <Box key={text} onClick={action} sx={{ cursor: "pointer" }}>
                {content}
                </Box>
            );
            })}
        </List>
        </Box>
    );
}
