"use client";  // <-- S'assurer que cette ligne est au début du fichier

import { useState } from "react";
import BarChart from "@/components/ChartCard/BarChart";
import ChartCard from "@/components/ChartCard/ChartCard";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Invoice } from "@/components/Modal/InvoiceEditModal";

const fakeInvoices: Invoice[] = [
  { id: 1, client: "Jean Dupont", amount: 320, status: "payée" },
  { id: 2, client: "Emma Durand", amount: 120, status: "en attente" },
  { id: 3, client: "Paul Morel", amount: 380, status: "non payée" },
  { id: 4, client: "Claire Martin", amount: 300, status: "rappel envoyé" },
  { id: 5, client: "Luc Lefevre", amount: 210, status: "en attente" },
  { id: 6, client: "Sophie Leroy", amount: 150, status: "facture prête" },
];

export default function DashboardPage() {
  const [invoices] = useState(fakeInvoices);

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
        {[1, 2, 3].map((_, i) => (
          <Box
            key={i}
            sx={{
              flex: "1 1 calc(33.333% - 16px)",
              minWidth: 250,
              zIndex: 10,
            }}
          >
            <Card sx={{ borderRadius: 2, backgroundColor: "white" }}>
              <CardContent>
                <Typography variant="h6">Factures en attente</Typography>
                <Typography variant="h4">15</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Card sx={{ borderRadius: 2, height: 350, backgroundColor: "white", zIndex: 10 }}>
          <CardContent>
            {/* Passage des factures au composant BarChart */}
            <BarChart invoices={invoices} />
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Box sx={{ flex: "1 1 60%",zIndex: 10 }}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <ChartCard />
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            flex: "1 1 35%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 250,
            zIndex: 10,
          }}
        >
          <Card sx={{ borderRadius: 2, backgroundColor: "white" }}>
            <CardContent>
              <Typography variant="h6">Paiements en attente</Typography>
              <Typography variant="h4">3 200 €</Typography>
            </CardContent>
            <CardContent>
              <Typography variant="h6">Paiements en attente</Typography>
              <Typography variant="h4">3 200 €</Typography>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 2, backgroundColor: "white" }}>
            <CardContent>
              <Typography variant="h6">Paiements en attente</Typography>
              <Typography variant="h4">3 200 €</Typography>
            </CardContent>
            <CardContent>
              <Typography variant="h6">Paiements en attente</Typography>
              <Typography variant="h4">3 200 €</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}
