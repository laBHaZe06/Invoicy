"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";

export type Invoice = {
  id: number;
  client: string;
  amount: number;
  status: "payée" | "non payée" | "en attente" | "rappel envoyé" | "facture prête";
};

interface Props {
  open: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onSave: (updated: Invoice) => void;
}

export default function InvoiceEditModal({ open, onClose, invoice, onSave }: Props) {
  const [formData, setFormData] = useState<Invoice | null>(null);

  useEffect(() => {
    if (invoice) {
      setFormData(invoice);
    }
  }, [invoice]);

  const handleChange = (field: keyof Invoice, value: string | number) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSubmit = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: "text.secondary" }}>Modifier la facture</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Nom du client"
          value={formData.client}
          onChange={(e) => handleChange("client", e.target.value)}
          fullWidth
          InputLabelProps={{ sx: { color: "text.secondary" } }}  // Label en text.secondary
          InputProps={{ sx: { color: "text.secondary" } }}  // Texte du champ en text.secondary
          sx={{ mt: 2 }}
        />
        <TextField
          label="Montant (€)"
          type="number"
          value={formData.amount}
          onChange={(e) => handleChange("amount", parseFloat(e.target.value))}
          fullWidth
          InputLabelProps={{ sx: { color: "text.secondary" } }}
          InputProps={{ sx: { color: "text.secondary" } }}
        />
        <TextField
          select
          label="Statut"
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
          fullWidth
          InputLabelProps={{ sx: { color: "text.secondary" } }}
          InputProps={{ sx: { color: "text.secondary" } }}
        >
          <MenuItem value="payée" sx={{ color: "text.secondary" }}>Payée</MenuItem>
          <MenuItem value="non payée" sx={{ color: "text.secondary" }}>Non payée</MenuItem>
          <MenuItem value="en attente" sx={{ color: "text.secondary" }}>En attente</MenuItem>
          <MenuItem value="rappel envoyé" sx={{ color: "text.secondary" }}>Rappel envoyé</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Annuler</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
}
