"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { useColorMode } from "@/context/ColorModeContext";
import ToggleColorMode from "@/components/Toggle/ToggleColorMode";

type TopBarProps = {
    isAuthenticated: boolean;
    username?: string;
    sidebarOpen: boolean;
    drawerWidth?: number;
};

    export default function TopBarComponent({
    isAuthenticated,
    username,
    sidebarOpen,
    drawerWidth = 240,
    }: TopBarProps) {
    const { mode, toggleColorMode } = useColorMode();

    return (
        <AppBar
        position="fixed"
        sx={{
            width: `calc(100% - ${sidebarOpen ? drawerWidth : 70}px)`,
            ml: `${sidebarOpen ? drawerWidth : 70}px`,
            transition: "width 0.3s",
            backgroundColor: "primary.main",
        }}
        >
        <Toolbar sx={{bg: 'primary.main'}}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {isAuthenticated ? `Connecté : ${username}` : "Tableau de bord"}
            </Typography>
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        </Toolbar>
        </AppBar>
    );
}
