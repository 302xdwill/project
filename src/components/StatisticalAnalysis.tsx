import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ScatterChart, Scatter, LineChart, Line,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { Sample } from '../types/zones';
import { calculateStatistics } from '../utils/sampling';

interface StatisticalAnalysisProps {
  samples: Sample[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function StatisticalAnalysis({ samples }: StatisticalAnalysisProps) {
  const stats = calculateStatistics(samples);
  if (!stats) return null;

  // Datos para las métricas de calidad
  const qualityMetricsData = [
    {
      name: 'Tamaño (cm)',
      promedio: stats.size.mean,
      desviacion: stats.size.stdDev
    },
    {
      name: 'Daños (%)',
      promedio: stats.physicalDamage.mean,
      desviacion: stats.physicalDamage.stdDev
    },
    {
      name: 'Enfermedades (%)',
      promedio: stats.diseases.mean,
      desviacion: stats.diseases.stdDev
    }
  ];

  // Distribución de tipos de papa (por color)
  const potatoTypeDistribution = samples.reduce((acc, sample) => {
    acc[sample.color] = (acc[sample.color] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(potatoTypeDistribution).map(([type, count]) => ({
    name: type,
    value: count
  }));

  // Datos para el gráfico de Rendimiento vs Tamaño
  const yieldByTypeData = samples.map(sample => ({
    tipo: sample.color,
    rendimiento: sample.yield,
    tamaño: sample.size
  }));

  // Tendencias de calidad de las muestras
  const yieldTrendData = samples.map((sample, index) => ({
    muestra: index + 1,
    rendimiento: sample.yield,
    daños: sample.physicalDamage,
    enfermedades: sample.diseases
  }));

  return (
    <div className="space-y-8">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="mb-4 text-xl font-semibold">Resumen Estadístico</h3>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 rounded-lg bg-gray-50">
            <h4 className="font-medium text-gray-700">Tamaño</h4>
            <p className="text-sm">Media: {stats.size.mean.toFixed(2)} cm</p>
            <p className="text-sm">Desv. Est.: {stats.size.stdDev.toFixed(2)}</p>
            <p className="text-sm">Min: {stats.size.min.toFixed(2)} cm</p>
            <p className="text-sm">Max: {stats.size.max.toFixed(2)} cm</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50">
            <h4 className="font-medium text-gray-700">Daños Físicos</h4>
            <p className="text-sm">Media: {stats.physicalDamage.mean.toFixed(2)}%</p>
            <p className="text-sm">Desv. Est.: {stats.physicalDamage.stdDev.toFixed(2)}</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50">
            <h4 className="font-medium text-gray-700">Enfermedades</h4>
            <p className="text-sm">Media: {stats.diseases.mean.toFixed(2)}%</p>
            <p className="text-sm">Desv. Est.: {stats.diseases.stdDev.toFixed(2)}</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50">
            <h4 className="font-medium text-gray-700">Rendimiento</h4>
            <p className="text-sm">Media: {stats.yield.mean.toFixed(2)} kg/ha</p>
            <p className="text-sm">Desv. Est.: {stats.yield.stdDev.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-xl font-semibold">Métricas de Calidad</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={qualityMetricsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="promedio" fill="#4F46E5" name="Promedio" />
              <Bar dataKey="desviacion" fill="#10B981" name="Desviación Estándar" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-xl font-semibold">Distribución por Tipo de Papa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-xl font-semibold">Rendimiento vs Tamaño</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="tamaño" 
                name="Tamaño" 
                unit="cm"
                label={{ value: 'Tamaño (cm)', position: 'bottom' }}
              />
              <YAxis 
                dataKey="rendimiento" 
                name="Rendimiento"
                unit="kg/ha"
                label={{ value: 'Rendimiento (kg/ha)', angle: -90, position: 'left' }}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter
                name="Muestras"
                data={yieldByTypeData}
                fill="#8884d8"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-xl font-semibold">Tendencias de Calidad</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yieldTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="muestra" label={{ value: 'Número de Muestra', position: 'bottom' }} />
              <YAxis yAxisId="left" label={{ value: 'Rendimiento (kg/ha)', angle: -90, position: 'left' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Porcentaje (%)', angle: 90, position: 'right' }} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="rendimiento"
                stroke="#8884d8"
                name="Rendimiento"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="daños"
                stroke="#82ca9d"
                name="Daños Físicos"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="enfermedades"
                stroke="#ffc658"
                name="Enfermedades"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
