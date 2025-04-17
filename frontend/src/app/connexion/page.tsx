
import NavBarComponent from "@/components/Navbar/NavBarComponent";
import FooterComponent from "@/components/Footer/FooterComponent";
import Box from '@mui/material/Box';
import ConnectComponent from "@/components/Connect/ConnectComponent";



export default function Page() {
  return (
    <>

    <NavBarComponent/>
    <Box sx={{mt: 5, zIndex: 1, position: "relative"}}>
    <ConnectComponent/>
    <FooterComponent/>
    </Box>
    </>
  );
}
