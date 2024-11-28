import React, { useState } from 'react';
import { POTATO_TYPES, IRRIGATION_TYPES, SOIL_TYPES, Stratum } from '../types/sampling';

interface StratumFormProps {
  onStratumSubmit: (stratum: Stratum) => void;
}

export function StratumForm({ onStratumSubmit }: StratumFormProps) {
  const [stratum, setStratum] = useState<Stratum>({
    id: crypto.randomUUID(),
    potatoType: '',
    irrigationType: '',
    soilType: '',
    totalPlots: 0,
    selectedPlots: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStratumSubmit(stratum);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Papa
        </label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={stratum.potatoType}
          onChange={(e) => setStratum({ ...stratum, potatoType: e.target.value })}
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
          Método de Riego
        </label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={stratum.irrigationType}
          onChange={(e) => setStratum({ ...stratum, irrigationType: e.target.value })}
        >
          <option value="">Seleccionar método</option>
          {IRRIGATION_TYPES.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Suelo
        </label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={stratum.soilType}
          onChange={(e) => setStratum({ ...stratum, soilType: e.target.value })}
        >
          <option value="">Seleccionar tipo</option>
          {SOIL_TYPES.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Total de Parcelas
        </label>
        <input
          type="number"
          required
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={stratum.totalPlots}
          onChange={(e) => setStratum({ ...stratum, totalPlots: Number(e.target.value) })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Parcelas a Seleccionar
        </label>
        <input
          type="number"
          required
          min="1"
          max={stratum.totalPlots}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={stratum.selectedPlots}
          onChange={(e) => setStratum({ ...stratum, selectedPlots: Number(e.target.value) })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Agregar Estrato
      </button>
    </form>
  );
}