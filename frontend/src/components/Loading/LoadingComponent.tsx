'use client';
import { Typography, Box  } from '@mui/material';
import { useColorMode } from "@/context/ColorModeContext";
import Image from 'next/image';


export default function LoadingComponent() {
    const { mode } = useColorMode();
  
    const logoSrc =
        mode === "light"
        ? "/images/Invoicy.gif"
        : "/images/Invoicy-dark.gif";

    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: (mode === 'light') ? '#b7c5fc' : '#4b3f79',
            position: 'absolute',
            width: '100%',
        }}
    >
        <Image
            src={logoSrc}
            width={180}
            height={180}
            loading="lazy"
            quality={80}
            alt="Chargement en cours..." 
        />
        <Typography
            variant="h5"
            sx={{
            marginTop: 2,
            fontWeight: 'bold',
            color: (mode === 'light') ? '#21222c' : 'white',
            letterSpacing: 1.5,
            }}
        >
            Chargement en cours...
        </Typography>
        </Box>
    );
}
