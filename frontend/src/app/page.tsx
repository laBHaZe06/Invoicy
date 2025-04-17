import NavBarComponent from "@/components/Navbar/NavBarComponent";
import FooterComponent from "@/components/Footer/FooterComponent";
import Box from '@mui/material/Box';
import Hero from "@/components/Hero/Hero";


export default function Page() {
  return (
    <div>
    <NavBarComponent/>
    <Box sx={{mt: 5}}>
      <Hero/>
    <FooterComponent/>
    </Box>
    </div>
  );
}
