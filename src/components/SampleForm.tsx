import React, { useState } from 'react';
import { Sample } from '../types/zones';
import { POTATO_TYPES } from '../types/sampling';

interface SampleFormProps {
  onSampleSubmit: (sample: Sample) => void;
}

export function SampleForm({ onSampleSubmit }: SampleFormProps) {
  const [plotArea, setPlotArea] = useState<number>(0);
  const [sample, setSample] = useState<Sample>({
    size: 0,
    color: '',
    physicalDamage: 0,
    diseases: 0,
    humidity: 80, // Humedad fija al 80%
    yield: 0, // Producción en kg
  });

  // Función para calcular el rendimiento en kg/m²
  const calculateYield = (productionKg: number, areaM2: number) => {
    return productionKg / areaM2; // Rendimiento en kg/m²
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Se usa la función de cálculo de rendimiento al momento de guardar la muestra
    const yieldValue = calculateYield(sample.yield, plotArea);
    onSampleSubmit({
      ...sample,
      yield: yieldValue // Guardar el rendimiento en kg/m²
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Papa
        </label>
        <select
          required
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={sample.color}
          onChange={(e) => setSample({ ...sample, color: e.target.value })}
        >
          <option value="">Seleccionar tipo</option>
          {POTATO_TYPES.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Área de la Parcela (m²)
        </label>
        <input
          type="number"
          required
          min="1"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={plotArea}
          onChange={(e) => setPlotArea(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tamaño (cm)
        </label>
        <input
          type="number"
          required
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={sample.size}
          onChange={(e) => setSample({ ...sample, size: Number(e.target.value) })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Daños Físicos (%)
        </label>
        <input
          type="number"
          required
          min="0"
          max="100"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={sample.physicalDamage}
          onChange={(e) => setSample({ ...sample, physicalDamage: Number(e.target.value) })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Enfermedades (%)
        </label>
        <input
          type="number"
          required
          min="0"
          max="100"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={sample.diseases}
          onChange={(e) => setSample({ ...sample, diseases: Number(e.target.value) })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Producción Total (kg)
        </label>
        <input
          type="number"
          required
          min="0"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={sample.yield}
          onChange={(e) => setSample({ ...sample, yield: Number(e.target.value) })}
        />
        <p className="mt-1 text-sm text-gray-500">
          Rendimiento estimado: {plotArea ? calculateYield(sample.yield, plotArea).toFixed(2) : 0} kg/m²
        </p>
      </div>

      <div className="p-4 rounded-md bg-gray-50">
        <p className="text-sm text-gray-600">
          Humedad fija: 80%
        </p>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Guardar Muestra
      </button>
    </form>
  );
}
