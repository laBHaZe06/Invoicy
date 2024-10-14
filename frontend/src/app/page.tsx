import NavBarComponent from "./components/NavBarComponent";
import FooterComponent from "./components/FooterComponent";
import Box from '@mui/material/Box';
import Hero from "./components/Hero";

export default function Page() {
  return (
    <>
    <NavBarComponent/>
    <Box sx={{mt: 5}}>
      <Hero/>
    <FooterComponent/>
    </Box>
    </>
  );
}
