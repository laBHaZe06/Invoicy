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
import InvoiceEditModal from "@/components/Modal/InvoiceEditModal";
import InvoiceShowModal from "@/components/Modal/InvoiceShowModal";
import { Invoices } from '@/type/Invoices';
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
  const [selectedInvoice, setSelectedInvoice] = useState<Invoices | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoices[]>([]);

  const handleEditClick = (invoice: Invoices) => {
    setSelectedInvoice(invoice);
    setEditModalOpen(true);
  };

  const handleSaveInvoice = (updated: Invoices) => {
    const updatedInvoices = invoices.map((invoices : Invoices) =>
      invoices.id === updated.id ? updated : invoices
    );
    setInvoices(updatedInvoices);
  };

  const handleSendInvoice = (facture: Invoices) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === facture.id ? { ...invoice, statut: "en attente" } : invoice
    );
    setInvoices(updatedInvoices);
    console.log(`Facture envoyée à ${facture.client}`);
  };

  const handleViewClick = (facture: Invoices) => {
    setSelectedInvoice(facture);
    setViewModalOpen(true);
  };

  const filteredInvoices = activeTab === 0
    ? invoices
    : invoices.filter((facture) => facture.statut === statusTabs[activeTab]);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.API_URL}/me/invoices`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });
        
        console.info(response);
        if (!response.ok) throw new Error("Erreur lors de la récupération des factures.");
    
        const data = await response.json();
        const allInvoices: Invoices[] = data || []; 
        console.info(allInvoices);
        
        setInvoices(allInvoices);
      } catch (error) {
        console.error(error);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <>
      <Box sx={{ height: "100vh" }}>
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

        <Card sx={{ borderRadius: 2, height: "600px" }}>
          <CardContent>
            {loading ? (
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
                  {filteredInvoices.map((facture, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ color: "black" }}>{facture.client.firstName} - {facture.client.lastName}</TableCell>
                      <TableCell sx={{ color: "black" }}>{facture.amountHt} €</TableCell>
                      <TableCell>
                        <Chip
                          label={facture.statut}
                          color={statusColors[facture.statut]}
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
                          {(facture.statut === "en attente" || facture.statut === "facture prête") && (
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
                          {facture.statut === "facture prête" && (
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
              <Typography variant="h6">Client: {selectedInvoice.client.firstName} - {selectedInvoice.client.lastName}</Typography>
              <Typography variant="body1">Montant: {selectedInvoice.amountTtc} €</Typography>
              <Typography variant="body1">Statut: {selectedInvoice.statut}</Typography>
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
        invoices={selectedInvoice}
      />
      <InvoiceEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        invoices={selectedInvoice}
        onSave={handleSaveInvoice}
      />
    </>
  );
}
