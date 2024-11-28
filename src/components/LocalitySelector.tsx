import React from 'react';
import { Locality } from '../types/sampling';

interface LocalitySelectorProps {
  zone: string;
  onLocalitySelect: (locality: Locality) => void;
}

const LOCALITIES: Record<string, Locality[]> = {
  'Alto Puno': [
    { id: 'ap1', name: 'Sector 1', zone: 'Alto Puno' },
    { id: 'ap2', name: 'Sector 2', zone: 'Alto Puno' },
    { id: 'ap3', name: 'Sector 3', zone: 'Alto Puno' }
  ],
  'Zona Norte': [
    { id: 'zn1', name: 'Cabanillas', zone: 'Zona Norte' },
    { id: 'zn2', name: 'Calapuja', zone: 'Zona Norte' }
  ]
  // Add more localities as needed
};

export function LocalitySelector({ zone, onLocalitySelect }: LocalitySelectorProps) {
  const localities = LOCALITIES[zone] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {localities.map((locality) => (
        <button
          key={locality.id}
          onClick={() => onLocalitySelect(locality)}
          className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold">{locality.name}</h3>
          <p className="text-sm text-gray-600">Zona: {locality.zone}</p>
        </button>
      ))}
    </div>
  );
}