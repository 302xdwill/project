import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registra los componentes de Chart.js necesarios
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StatisticalChartProps {
  samples: { [key: string]: number }; // Muestras con nombre y su valor (puede ser peso, tamaño, etc.)
}

const StatisticalChart: React.FC<StatisticalChartProps> = ({ samples }) => {
  // Prepara los datos para el gráfico
  const data = {
    labels: Object.keys(samples), // Las etiquetas son los nombres de las muestras
    datasets: [
      {
        label: 'Valor de las muestras',
        data: Object.values(samples), // Los valores son los valores de cada muestra
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opciones para el gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Análisis Estadístico de Muestras',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StatisticalChart;
