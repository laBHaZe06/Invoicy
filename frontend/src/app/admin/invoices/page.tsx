"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InvoiceEditModal, { Invoice } from "@/components/Modal/InvoiceEditModal";
import InvoiceShowModal from "@/components/Modal/InvoiceShowModal";

// Données simulées
const fakeInvoices: Invoice[] = [
  { id: 1, client: "Jean Dupont", amount: 320, status: "payée" },
  { id: 2, client: "Emma Durand", amount: 120, status: "en attente" },
  { id: 3, client: "Paul Morel", amount: 380, status: "non payée" },
  { id: 4, client: "Claire Martin", amount: 300, status: "rappel envoyé" },
  { id: 5, client: "Luc Lefevre", amount: 210, status: "en attente" },
  { id: 6, client: "Sophie Leroy", amount: 150, status: "facture prête" },
];

const statusColors: Record<string, "success" | "warning" | "error" | "info" | "primary"> = {
  payée: "success",
  "non payée": "error",
  "en attente": "warning",
  "rappel envoyé": "info",
  "facture prête": "primary",
};

const statusTabs = [
  "Toutes",
  "payée",
  "non payée",
  "en attente",
  "rappel envoyé",
  "facture prête",
];

export default function FacturesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleEditClick = (facture: Invoice) => {
    setSelectedInvoice(facture);
    setEditModalOpen(true);
  };

  const handleSaveInvoice = (updated: Invoice) => {
    const index = fakeInvoices.findIndex((f) => f.id === updated.id);
    if (index !== -1) {
      fakeInvoices[index] = updated;
    }
  };

  const handleSendInvoice = (facture: Invoice) => {
    const index = fakeInvoices.findIndex((f) => f.id === facture.id);
    if (index !== -1) {
      fakeInvoices[index].status = "en attente";
      console.log(`Facture envoyée à ${facture.client}`);
    }
  };

  const handleViewClick = (facture: Invoice) => {
    setSelectedInvoice(facture);
    setViewModalOpen(true);
  };

  const filteredInvoices = activeTab === 0
    ? fakeInvoices
    : fakeInvoices.filter((facture) => facture.status === statusTabs[activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Box sx={{ height: '100vh' }}>
        <Typography variant="h5" sx={{ mb: 2, color: "text.secondary" }}>
          Gestion des Factures
        </Typography>

        <Card sx={{ borderRadius: 2, mb: 3 }}>
          <CardContent>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="Statuts des factures"
            >
              {statusTabs.map((label, index) => (
                <Tab
                  key={index}
                  label={label.charAt(0).toUpperCase() + label.slice(1)}
                  sx={{ color: "text.secondary" }}
                />
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 2, height: '600px' }}>
          <CardContent>
            {loading ? (
              // Affichage de Skeletons pendant le chargement
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Skeleton sx={{ bgcolor: "primary.light" }} /></TableCell>
                    <TableCell><Skeleton sx={{ bgcolor: "primary.light" }} /></TableCell>
                    <TableCell><Skeleton sx={{ bgcolor: "primary.light" }} /></TableCell>
                    <TableCell align="right"><Skeleton sx={{ bgcolor: "primary.light" }} /></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton width="80%" sx={{ bgcolor: "primary.light" }} /></TableCell>
                      <TableCell><Skeleton width="40%" sx={{ bgcolor: "primary.light" }} /></TableCell>
                      <TableCell><Skeleton width="60%" sx={{ bgcolor: "primary.light" }} /></TableCell>
                      <TableCell align="right"><Skeleton width="80%" sx={{ bgcolor: "primary.light" }} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : filteredInvoices.length === 0 ? (
              <Typography sx={{ color: "black" }}>Aucune facture trouvée.</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "text.secondary" }}>Client</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>Montant</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>Statut</TableCell>
                    <TableCell align="right" sx={{ color: "text.secondary" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredInvoices.map((facture) => (
                    <TableRow key={facture.id}>
                      <TableCell sx={{ color: "black" }}>{facture.client}</TableCell>
                      <TableCell sx={{ color: "black" }}>{facture.amount} €</TableCell>
                      <TableCell>
                        <Chip
                          label={facture.status}
                          color={statusColors[facture.status]}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Button
                            size="small"
                            variant="outlined"
                            color="primary"
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleViewClick(facture)}
                          >
                            Voir
                          </Button>
                          {(facture.status === "en attente" || facture.status === "facture prête") && (
                            <Button
                              size="small"
                              variant="contained"
                              color="secondary"
                              startIcon={<EditIcon />}
                              onClick={() => handleEditClick(facture)}
                            >
                              Modifier
                            </Button>
                          )}
                          {facture.status === "facture prête" && (
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              onClick={() => handleSendInvoice(facture)}
                            >
                              Envoyer Facture
                            </Button>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Modals */}
      <Dialog open={viewModalOpen} onClose={() => setViewModalOpen(false)}>
        <DialogTitle sx={{ color: "black" }}>Détails de la Facture</DialogTitle>
        <DialogContent sx={{ color: "black" }}>
          {selectedInvoice && (
            <>
              <Typography variant="h6">Client: {selectedInvoice.client}</Typography>
              <Typography variant="body1">Montant: {selectedInvoice.amount} €</Typography>
              <Typography variant="body1">Statut: {selectedInvoice.status}</Typography>
              <Typography variant="body1">ID de la Facture: {selectedInvoice.id}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewModalOpen(false)} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      <InvoiceShowModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        invoice={selectedInvoice}
      />
      <InvoiceEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        invoice={selectedInvoice}
        onSave={handleSaveInvoice}
      />
    </>
  );
}
