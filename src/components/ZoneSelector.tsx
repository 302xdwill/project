import React from 'react';
import { zones } from '../data/zones';
import { MapPin } from 'lucide-react';

interface ZoneSelectorProps {
  onZoneSelect: (zoneName: string) => void;
}

export function ZoneSelector({ onZoneSelect }: ZoneSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.values(zones).map((zone) => (
        <button
          key={zone.name}
          onClick={() => onZoneSelect(zone.name)}
          className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">{zone.name}</h3>
          </div>
          <div className="text-sm text-gray-600">
            <p>Altitud: {zone.altitude}</p>
            <p>Temperatura: {zone.temperature}</p>
          </div>
        </button>
      ))}
    </div>
  );
}