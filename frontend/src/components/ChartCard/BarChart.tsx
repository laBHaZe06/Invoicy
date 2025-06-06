"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Invoices } from "@/type/Invoices";

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  invoices: Invoices[];
}

export default function BarChart({ invoices }: BarChartProps) {
  // Traitement des données pour le graphique
  const labels = invoices.map((invoice) => invoice.client?.lastName || "Inconnu");
  const data = invoices.map((invoice) => invoice.amountTtc);
  const backgroundColor = invoices.map((invoice) => {
    if (invoice.statut === "non payée" ) {
      return "rgba(255, 99, 132, 0.6)"; 
    } else if (invoice.statut === "en attente") {
      return "rgba(253, 160, 106, 0.62)";
    }else {
      return "rgba(81, 207, 165, 0.6)";
    }
  });
  
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Montant (€)"
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
  };
  const dataForChart = {
    labels,
    datasets: [
      {
        label: "Factures",
        data,
        backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "320px" }}>
      <Bar data={dataForChart} options={options} />
    </div>
  );
}
