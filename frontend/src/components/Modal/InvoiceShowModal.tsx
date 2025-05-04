// src/components/Modal/InvoiceShowModal.tsx
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import { Invoices } from "@/type/Invoices";

interface InvoiceShowModalProps {
  open: boolean;
  onClose: () => void;
  invoices: Invoices | null;
}

const InvoiceShowModal: React.FC<InvoiceShowModalProps> = ({ open, onClose, invoices }) => {
  if (!invoices) return null; 

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: "text.secondary" }}>Détails de la Facture</DialogTitle>
      <DialogContent sx={{ color: "text.secondary" }}>
        <Typography variant="h6">Client: {invoices?.client.lastName}</Typography>
        <Typography variant="body1">Montant: {invoices?.amountTtc} €</Typography>
        <Typography variant="body1">Statut: {invoices?.statut}</Typography>
        <Typography variant="body1">N° de la Facture: {invoices?.invoiceNumber}</Typography>
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
