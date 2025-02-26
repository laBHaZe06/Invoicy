'use client';
import { useSearchParams } from "next/navigation";
import NavBarComponent from "../../components/NavBarComponent";
import FooterComponent from "../../components/FooterComponent";
import Box from '@mui/material/Box';
import VerifyUser from "./verifyUser";


export default function Page() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    return (
        <>
        <NavBarComponent/>
        <Box sx={{mt: 5}}>
        <VerifyUser params={{token}}/>
        <FooterComponent/>
        </Box>
        </>
    );
}
