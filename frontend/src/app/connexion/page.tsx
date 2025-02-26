
import NavBarComponent from "../components/NavBarComponent";
import FooterComponent from "../components/FooterComponent";
import Box from '@mui/material/Box';
import ConnectComponent from "../components/ConnectComponent";

export default function Page() {
  return (
    <>
    <NavBarComponent/>
    <Box sx={{mt: 5}}>
    <ConnectComponent/>
    <FooterComponent/>
    </Box>
    </>
  );
}
