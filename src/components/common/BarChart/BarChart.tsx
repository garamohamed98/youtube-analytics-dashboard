import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "@mui/material";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({
  data,
  labels,
  label,
}: {
  data: number[];
  labels: string[];
  label: string;
}) => {
  const theme = useTheme();
  return (
    <Bar
      data={{
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, theme.palette.primary.dark);
              gradient.addColorStop(1, theme.palette.primary.main);
              return gradient;
            },
            borderColor: theme.palette.primary.light,
            borderWidth: 2,
            borderRadius: 8,
            barPercentage: 0.7,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: theme.palette.text.secondary,
              maxRotation: 45,
              minRotation: 60,
              font: {
                size: 9,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: theme.palette.background.default,
            },
            ticks: {
              color: theme.palette.text.secondary,
            },
          },
        },
        animation: {
          duration: 1500,
          easing: "easeInOutQuart",
        },
      }}
    />
  );
};

export default BarChart;
