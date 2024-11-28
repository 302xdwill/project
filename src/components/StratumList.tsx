import React from 'react';
import { Stratum } from '../types/sampling';

interface StratumListProps {
  strata: Stratum[];
  onGeneratePlots: () => void;
}

export function StratumList({ strata, onGeneratePlots }: StratumListProps) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de Papa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Método de Riego
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de Suelo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Parcelas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parcelas Seleccionadas
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {strata.map((stratum) => (
              <tr key={stratum.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {stratum.potatoType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {stratum.irrigationType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {stratum.soilType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {stratum.totalPlots}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {stratum.selectedPlots}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {strata.length > 0 && (
        <button
          onClick={onGeneratePlots}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Generar Parcelas Aleatorias
        </button>
      )}
    </div>
  );
}