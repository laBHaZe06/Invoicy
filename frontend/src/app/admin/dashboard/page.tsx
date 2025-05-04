"use client";

import { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Skeleton } from "@mui/material";
import BarChart from "@/components/ChartCard/BarChart";
import ChartCard from "@/components/ChartCard/ChartCard";
import { Invoices } from "@/type/Invoices";



export default function DashboardPage() {
  const [invoices, setInvoices] = useState<Invoices[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await fetch(`${process.env.API_URL}/me/invoices`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        }
      );
      console.info(response);
      // console.info(localStorage.getItem("token"));
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des factures.");
      }

      const data = await response.json();
      const allInvoices = data.map((invoice: Invoices) => ({
        ...invoice,
        client: {
          ...invoice.client,
          
        },

      }));

      const timer = setTimeout(() => {
        setInvoices(allInvoices);
        setLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    };

    fetchInvoices();
  }, []);

  return (
    <>
      {/* Stats Cards */}
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
                {loading ? (
                  <>
                    <Skeleton width="60%" sx={{ bgcolor: "primary.light" }} />
                    <Skeleton variant="text" height={40} sx={{ bgcolor: "primary.light" }}/>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">Factures en attente</Typography>
                    <Typography variant="h4">15</Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* BarChart Section */}
      <Box sx={{ mb: 3 }}>
        <Card sx={{ borderRadius: 2, height: 350, backgroundColor: "white", zIndex: 10 }}>
          <CardContent>
            {loading ? (
              <Skeleton variant="rectangular" height={300} sx={{ bgcolor: "primary.light" }} />
            ) : (
              <BarChart invoices={invoices} />
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {/* Chart Card */}
        <Box sx={{ flex: "1 1 60%", zIndex: 10 }}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              {loading ? <Skeleton variant="rectangular" height={250} sx={{ bgcolor: "primary.light" }} /> : <ChartCard invoices={invoices} />}
            </CardContent>
          </Card>
        </Box>

        {/* Totals */}
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
          {[1, 2].map((_, idx) => (
            <Card key={idx} sx={{ borderRadius: 2, backgroundColor: "white" }}>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton width="70%" sx={{ bgcolor: "primary.light" }} />
                    <Skeleton variant="text" height={40} sx={{ bgcolor: "primary.light" }}/>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">Paiements en attente</Typography>
                    <Typography variant="h4">3 200 €</Typography>
                  </>
                )}
              </CardContent>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton width="70%" sx={{ bgcolor: "primary.light" }} />
                    <Skeleton variant="text" height={40} sx={{ bgcolor: "primary.light" }}/>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">Paiements en attente</Typography>
                    <Typography variant="h4">3 200 €</Typography>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
