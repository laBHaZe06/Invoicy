'use client';
import NavBarComponent from "@/components/Navbar/NavBarComponent";
import FooterComponent from "@/components/Footer/FooterComponent";
import Box from '@mui/material/Box';
import VerifyUser from "@/components/Security/VerifyUser";


export default function Page() {
    return (
        <>
        <NavBarComponent/>
        <Box sx={{mt: 5}}>
        <VerifyUser/>
        <FooterComponent/>
        </Box>
        </>
    );
}
