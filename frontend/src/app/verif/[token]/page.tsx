'use client';
import NavBarComponent from "../../components/NavBarComponent";
import FooterComponent from "../../components/FooterComponent";
import Box from '@mui/material/Box';
import VerifyUser from "../../components/VerifyUser";


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
