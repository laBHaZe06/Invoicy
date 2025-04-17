// src/app/about/page.tsx
import NavBarComponent from "@/components/Navbar/NavBarComponent";
import FooterComponent from "@/components/Footer/FooterComponent";
import { Container, Typography, Grid, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      {/* ✅ SEO optimisé avec balises Head */}
        <Head>
            <title>About Us | Invoicy</title>
            <meta name="description" content="Discover Invoicy: A powerful and intuitive invoicing platform tailored for freelancers and businesses." />
            <meta name="keywords" content="Invoicing, Billing, SaaS, Freelancers, Business Tools, Invoicy" />
            <meta name="author" content="Invoicy Team" />
            <meta property="og:title" content="About Invoicy" />
            <meta property="og:description" content="Simplify your invoicing process with Invoicy – fast, reliable, and modern." />
        </Head>

        <NavBarComponent />
        {/* ✅ Chargement dynamique pour améliorer les performances */}
        <Container maxWidth="lg" sx={{ mt: 20, mb: 10 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
            About Invoicy
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
            Invoicy is a powerful invoicing software designed to simplify your billing process. With its user-friendly interface and robust features, you can create, send, and manage invoices effortlessly.
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
            Whether you&lsquo;re a freelancer, small business owner, or part of a larger organization, Invoicy has the tools you need to streamline your invoicing workflow.
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
            Our mission is to help you save time and get paid faster. With Invoicy, you can focus on what you do best while we take care of the invoicing.
            </Typography>

            <Typography variant="body1" sx={{ mb: 5 }}>
            Join thousands of satisfied users who trust Invoicy for their invoicing needs. Sign up today and experience the difference!
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Typography variant="h4" fontWeight="medium" gutterBottom>
            Features
            </Typography>

            <Grid container spacing={2}>
            {[
                "Easy invoice creation",
                "Customizable templates",
                "Automated reminders",
                "Payment tracking",
                "Multi-currency support",
                "Detailed reporting",
                "Secure cloud storage",
                "Mobile-friendly",
                "Integration with accounting tools",
                "24/7 customer support"
            ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                <List dense>
                    <ListItem>
                    <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                    </ListItem>
                </List>
                </Grid>
            ))}
            </Grid>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h4" fontWeight="medium" gutterBottom>
            Contact Us
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
            If you have any questions or feedback, please feel free to reach out to us:
            </Typography>
            <Typography variant="body2" color="text.secondary">
            📧 Email: support@invoicy.io
            </Typography>
            <Typography variant="body2" color="text.secondary">
            🕒 Available: 24/7
            </Typography>
        </Container>

        <FooterComponent />
        </>
    );
}
