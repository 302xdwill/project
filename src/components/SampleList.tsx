import React from 'react';
import { Sample } from '../types/zones';

interface SampleListProps {
  samples: Sample[];
}

export function SampleList({ samples }: SampleListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Tipo
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Tamaño
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Daños
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Enfermedades
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Humedad
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Rendimiento
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {samples.map((sample, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                {sample.color}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                {sample.size} cm
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                {sample.physicalDamage}%
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                {sample.diseases}%
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                {sample.humidity}%
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                {sample.yield} kg/m²
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}