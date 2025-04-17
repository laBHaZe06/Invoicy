import NavBarComponent from "@/components/Navbar/NavBarComponent";
import FooterComponent from "@/components/Footer/FooterComponent";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Head from "next/head";

export default function FaqPage() {
  return (
    <>
      <Head>
        <title>FAQ - Invoicy | SaaS de facturation pour Freelance</title>
      </Head>

      <NavBarComponent />

      <Container sx={{ marginTop: 20, paddingBottom: 8 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ textAlign: 'center', fontWeight: 'bold', color: 'primary.main' }}
        >
          Foire Aux Questions
        </Typography>

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Accordion
            sx={{
              boxShadow: 3,
              '&:not(:last-child)': { marginBottom: 2 },
              '& .MuiAccordionSummary-root': {
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#e3e3e3',
                },
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <ListItem>
                <ListItemText
                  primary="Comment fonctionne la facturation automatique ?"
                  primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                />
              </ListItem>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Notre SaaS gère automatiquement vos factures en fonction des heures travaillées et des tarifs que vous avez définis. Vous recevrez un rappel avant chaque facturation.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              boxShadow: 3,
              '&:not(:last-child)': { marginBottom: 2 },
              '& .MuiAccordionSummary-root': {
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#e3e3e3',
                },
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <ListItem>
                <ListItemText
                  primary="Quels sont les moyens de paiement disponibles ?"
                  primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                />
              </ListItem>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Nous supportons plusieurs méthodes de paiement telles que les cartes de crédit, PayPal et les virements bancaires pour que vous puissiez choisir celle qui vous convient.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              boxShadow: 3,
              '&:not(:last-child)': { marginBottom: 2 },
              '& .MuiAccordionSummary-root': {
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#e3e3e3',
                },
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <ListItem>
                <ListItemText
                  primary="Puis-je personnaliser mes factures ?"
                  primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                />
              </ListItem>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Oui, notre plateforme vous permet de personnaliser le design de vos factures avec votre logo, vos informations et vos conditions.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              boxShadow: 3,
              '&:not(:last-child)': { marginBottom: 2 },
              '& .MuiAccordionSummary-root': {
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#e3e3e3',
                },
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
              aria-controls="panel4a-content"
              id="panel4a-header"
            >
              <ListItem>
                <ListItemText
                  primary="Comment puis-je consulter l'historique de mes factures ?"
                  primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                />
              </ListItem>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Vous pouvez accéder à l’historique de vos factures directement depuis votre tableau de bord, avec des filtres pour trier par date, montant, ou statut.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </List>
      </Container>

      <FooterComponent />
    </>
  );
}
