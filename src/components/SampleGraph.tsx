import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Sample } from '../types/zones';

// Registramos los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface SampleGraphProps {
  samples: Sample[];
}

const SampleGraph: React.FC<SampleGraphProps> = ({ samples }) => {
  const labels = ['Tamaño', 'Daños', 'Enfermedades', 'Humedad', 'Rendimiento'];

  // Generamos los datasets para el gráfico
  const data = {
    labels: labels,
    datasets: samples.map((sample, index) => ({
      label: `Muestra ${index + 1}`,
      data: [sample.size, sample.physicalDamage, sample.diseases, sample.humidity, sample.yield],
      borderColor: `hsl(${(index * 60) % 360}, 100%, 50%)`, // Diferente color para cada muestra
      backgroundColor: `rgba(${(index * 60) % 360}, 100%, 50%, 0.2)`, // Color más claro para el fondo
      borderWidth: 2,
      fill: true, // Rellenar debajo de la línea
    })),
  };

  return (
    <div className="w-full">
      <Line data={data} options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }} />
    </div>
  );
};

export default SampleGraph;
