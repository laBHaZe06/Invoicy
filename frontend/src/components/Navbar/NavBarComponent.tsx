"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  Paper,
  Popover,
  Button,
  AppBar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { keyframes } from "@mui/system";
import LogoNav from "../Logo/LogoNav";
import ToggleColorMode from "../Toggle/ToggleColorMode";
import { useColorMode } from "../../context/ColorModeContext";
// humber menu props typescript interface
interface THamburgerMenuProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const bubbleEffect = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
`;

const NavbarComponent = () => {
  // modal state
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMegaMenu = Boolean(anchorEl);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { mode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Si on défile de plus de 50px
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // drawer open function
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  // drawer close function
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // handle menu for Facturation mega dropdown
  const handleMegaMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMegaMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = (
    <>
   
      {/* Mega Menu for Facturation */}
      <Button
        aria-controls={openMegaMenu ? "facturation-mega-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMegaMenu ? "true" : undefined}
        onClick={handleMegaMenuClick}
        color="inherit"
        sx={{
          fontWeight: '600',
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            color: "#03fca5",
            transition: "ease-in-out 0.4s",
          },
          "&:before": {
            content: '""',
            position: "absolute",
            inset: "calc(100% - 3px) 0 0 0",
            background: "#03fca5",
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.3s",
          },
          "&:hover:before": {
            transform: "scaleX(1)",
          },
        }}
      >
        Facturation
      </Button>
      <Popover
        id="facturation-mega-menu"
        anchorEl={anchorEl}
        open={openMegaMenu}
        onClose={handleMegaMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            width: "600px",
            padding: 2,
          },
        }}
      >
        <Grid container spacing={2}>
          {/* Section 1 */}
          <Grid size={6}>
            <Typography fontWeight={600} variant="h6" gutterBottom>
              Services
            </Typography>
            <Stack spacing={1}>
              <Link href="/facturation/invoices">
                <Typography>Manage Invoices</Typography>
              </Link>
              <Link href="/facturation/quotes">
                <Typography>Quotes</Typography>
              </Link>
              <Link href="/facturation/payments">
                <Typography>Payments</Typography>
              </Link>
            </Stack>
          </Grid>

          {/* Section 2 */}
          <Grid size={6}>
            <Typography fontWeight={600} variant="h6" gutterBottom>
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link href="/facturation/help">
                <Typography>Help Center</Typography>
              </Link>
              <Link href="/facturation/documentation">
                <Typography>Documentation</Typography>
              </Link>
              <Link href="/facturation/contact-support">
                <Typography>Contact Support</Typography>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Popover>

      <Typography
        component={Link}
        href="/about"
        fontWeight={600}
        color="inherit"
        sx={{
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            color: "#03fca5",
            transition: "ease-in-out 0.4s",
          },
          "&:before": {
            content: '""',
            position: "absolute",
            inset: "calc(100% - 3px) 0 0 0",
            background: "#03fca5",
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.3s",
          },
          "&:hover:before": {
            transform: "scaleX(1)",
          },
        }}
      >
        A propos
      </Typography>

      <Typography
        component={Link}
        href="/faq"
        fontWeight={600}
        color="inherit"
        sx={{
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            color: "#03fca5",
            transition: "ease-in-out 0.4s",
          },
          "&:before": {
            content: '""',
            position: "absolute",
            inset: "calc(100% - 3px) 0 0 0",
            background: "#03fca5",
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.3s",
          },
          "&:hover:before": {
            transform: "scaleX(1)",
          },
        }}
      >
        FAQ
      </Typography>

      <Typography
        component={Link}
        href="/connexion"
        fontWeight={600}
        color="inherit"
        sx={{
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            color: "#03fca5",
            transition: "ease-in-out 0.4s",
          },
          "&:before": {
            content: '""',
            position: "absolute",
            inset: "calc(100% - 3px) 0 0 0",
            background: "#03fca5",
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.3s",
          },
          "&:hover:before": {
            transform: "scaleX(1)",
          },
        }}
      >
        Connexion
      </Typography>
      <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
    </>
  );

  return (
    <>
      <Stack>
        {/* navbar start */}
        <AppBar sx={{background: 'transparent', width: '100%',boxShadow: 'none'}}>
        <Box
          sx={{
            display: "flex",
            position: "sticky",
            overflow: 'hidden',
            top: 0,
            zIndex: 5,
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 0px",
            "& a": {
              textDecoration: "none",
            },
          }}
        >
          <Container>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                padding: "10px 10px",
                border: 'thick double white',
                width: '100%',
                overflow: 'hidden',
                background: 'transparent',
                backdropFilter: isScrolled ? 'blur(8px)' : 'none',
                transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
                borderRadius: '.9rem',
              }}
              >
              {/* logo */}
              <Box component={Link} href="/" color="white">
                <Typography fontWeight={600} variant="h5">
                &nbsp;&nbsp;<Box component="span"><LogoNav/></Box>
                </Typography>
              </Box>

              {/* menu items start */}
              <Stack
                direction="row"
                gap={4}
                alignItems="center"
                sx={{
                  "& a:hover": {
                    color: "#03fca5",
                    transition: "ease-in-out 0.4s",
                  },
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "none",
                    lg: "flex",
                    xl: "flex",
                  },
                }}
                >
                {/* menu items rendered here */}
                {menuItems}
              </Stack>
            
              {/* Hamburger Menu */}
              <Paper>
                <HamburgerMenu open={open} handleDrawerOpen={handleDrawerOpen} />
              </Paper>
            </Stack>
          </Container>
        </Box>
      </AppBar>
    
        {/* Drawer for Hamburger Menu */}
        <Paper>
          <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
            <List>
              <ListItem sx={{ width: 300 }}>
                <Stack
                  direction="column"
                  gap={2}
                  sx={{
                    color: 'black',
                    "& a:hover": {
                      color: "#11855c",
                      transition: "ease-in-out 0.6s",
                    },
                    animation: `${bubbleEffect} 0.5s ease-in-out`,
                  }}
                >
                  {menuItems}
                </Stack>
              </ListItem>
            </List>
          </Drawer>
        </Paper>
      </Stack>
      {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
    </>
  );
};

// Hamburger Menu component
const HamburgerMenu = ({ handleDrawerOpen }: THamburgerMenuProps) => {
  return (
    <IconButton
    sx={{
      backgroundColor: (theme) => theme.palette.primary.main,
      borderRadius: 1,
      display: { md: "block", lg: "none" },
      '&:hover': {
        backgroundColor: (theme) => theme.palette.primary.main,
      }
    }}
      onClick={handleDrawerOpen}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default NavbarComponent;
