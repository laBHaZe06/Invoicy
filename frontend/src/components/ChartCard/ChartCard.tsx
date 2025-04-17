"use client";

import { useState } from "react";
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

// Fausse data localisée
const clientData: {
  all: { country: string; customers: number; latLng: [number, number] }[];
  europe: { country: string; customers: number; latLng: [number, number] }[];
  usa: { country: string; customers: number; latLng: [number, number] }[];
} = {
  all: [
    { country: "USA - East", customers: 2, latLng: [37.0902, -95.7129] },
    { country: "France", customers: 12, latLng: [46.6034, 1.8883] },
    { country: "USA - West", customers: 9, latLng: [37.7749, -122.4194] },
    { country: "Italie", customers: 5, latLng: [41.8967, 12.4822] },
    { country: "Germany", customers: 2, latLng: [51.1657, 10.4515] },
  ],
  europe: [
    { country: "France", customers: 589, latLng: [46.6034, 1.8883] },
    { country: "Germany", customers: 412, latLng: [51.1657, 10.4515] },
  ],
  usa: [{ country: "USA", customers: 2379, latLng: [37.0902, -95.7129] }],
};

export default function ChartCard() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<"all" | "europe" | "usa">("all");

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (region: "all" | "europe" | "usa") => {
    setSelectedRegion(region);
    setAnchorEl(null);
  };

  const customers = clientData[selectedRegion];
  const total = clientData["all"].reduce((acc, curr) => acc + curr.customers, 0);

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
          <MenuItem onClick={() => handleClose("europe")}>Europe</MenuItem>
          <MenuItem onClick={() => handleClose("usa")}>USA</MenuItem>
        </Menu>
      </Box>

      <CountryMap data={customers} />

      <Box
        sx={{
          mt: 2,
          maxHeight: 300,
          overflowY: "auto",
          pr: 1,
        }}
      >
        {customers.map((item) => {
          const percent = Math.round((item.customers / total) * 100);
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
