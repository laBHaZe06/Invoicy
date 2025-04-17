// src/components/Modal/InvoiceShowModal.tsx
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import { Invoice } from "@/components/Modal/InvoiceEditModal"; 

interface InvoiceShowModalProps {
  open: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

const InvoiceShowModal: React.FC<InvoiceShowModalProps> = ({ open, onClose, invoice }) => {
  if (!invoice) return null; 

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: "text.secondary" }}>Détails de la Facture</DialogTitle>
      <DialogContent sx={{ color: "text.secondary" }}>
        <Typography variant="h6">Client: {invoice.client}</Typography>
        <Typography variant="body1">Montant: {invoice.amount} €</Typography>
        <Typography variant="body1">Statut: {invoice.status}</Typography>
        <Typography variant="body1">ID de la Facture: {invoice.id}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceShowModal;
