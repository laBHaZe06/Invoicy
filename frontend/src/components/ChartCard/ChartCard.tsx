"use client";

import { useState, useEffect } from "react";
import CountryMap from "./CountryMap";
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Invoices } from "@/type/Invoices";

const getLatLngForClient = async (country: string, city: string) => {
  if (!country || !city) {
    console.warn("Pays ou ville non définis", { country, city });
    return null;
  }

  try {
    const res = await fetch(`${process.env.API_URL}/geocode`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: country,
        city: city,
      }),
    });

    if (!res.ok) {
      console.error("Erreur HTTP:", res.status);
      return null;
    }

    const data = await res.json();
    if (data.error) {
      console.warn("Erreur API:", data.error);
      return null;
    }

    if (Array.isArray(data.latLng) && data.latLng.length === 2) {
      return [data.latLng[0], data.latLng[1]] as [number, number];
    }

    console.warn("Format inattendu de réponse", data);
    return null;

  } catch (error) {
    console.error("Erreur de géolocalisation", error);
    return null;
  }
};


export default function ChartCard({ invoices }: { invoices: Invoices[] }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [mapData, setMapData] = useState<
    { country: string; customers: number; latLng: [number, number] }[]
  >([]);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (region: string) => {
    setSelectedRegion(region);
    setAnchorEl(null);
  };

  const uniqueCountries = Array.from(
    new Set(invoices.map((inv) => inv.client.country).filter(Boolean))
  );

  useEffect(() => {
    const generateMapData = async () => {
      const grouped: Record<string, { count: number; latLng: [number, number] }> = {};

      await Promise.all(invoices.map(async (invoice) => {
        const country = invoice.client.country;
        const town = invoice.client.town;

        if (!country || !town) {
          console.warn("Données manquantes pour un client", invoice);
          return;
        }

        const key = `${country}-${town}`;

        if (!grouped[key]) {
          const coords = await getLatLngForClient(country, town);
          if (!coords) return;
          grouped[key] = { count: 1, latLng: coords };
        } else {
          grouped[key].count += 1;
        }
      }));

      const result = Object.entries(grouped).map(([key, value]) => ({
        country: key,
        customers: value.count,
        latLng: value.latLng,
      }));

      setMapData(result);
    };

    if (invoices.length > 0) {
      generateMapData();
    }
  }, [invoices]);

  const customers = mapData.filter((item) => {
    return selectedRegion === "all" || item.country.startsWith(selectedRegion);
  });

  const total = mapData.reduce((acc, curr) => acc + curr.customers, 0);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Localisation de vos clients</Typography>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => handleClose("all")}>Tous les clients</MenuItem>
          {uniqueCountries.map((country, index) => (
            <MenuItem key={index} onClick={() => handleClose(country)}>
              {country}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <CountryMap data={mapData} />

      <Box sx={{ mt: 2, maxHeight: 300, overflowY: "auto", pr: 1 }}>
        {customers.map((item) => {
          const percent = total > 0 ? Math.round((item.customers / total) * 100) : 0;
          return (
            <Box
              key={item.country}
              sx={{
                mb: 2,
                p: 1,
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <Box>
                  <Typography fontWeight={600}>{item.country}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.customers} clients
                  </Typography>
                </Box>
                <Typography fontWeight={600}>{percent}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={percent}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#1976d2",
                  },
                }}
              />
            </Box>
          );
        })}
      </Box>
    </>
  );
}
