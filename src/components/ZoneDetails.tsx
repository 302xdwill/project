import React from 'react';
import { Zone } from '../types/zones';
import { Thermometer, Cloud, Droplets, Mountain } from 'lucide-react';

interface ZoneDetailsProps {
  zone: Zone;
}

export function ZoneDetails({ zone }: ZoneDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{zone.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <Mountain className="w-5 h-5 text-blue-500" />
          <div>
            <p className="font-semibold">Altitud</p>
            <p className="text-gray-600">{zone.altitude}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Thermometer className="w-5 h-5 text-red-500" />
          <div>
            <p className="font-semibold">Temperatura</p>
            <p className="text-gray-600">{zone.temperature}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Cloud className="w-5 h-5 text-gray-500" />
          <div>
            <p className="font-semibold">Clima</p>
            <p className="text-gray-600">{zone.climate}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Droplets className="w-5 h-5 text-blue-500" />
          <div>
            <p className="font-semibold">Riego</p>
            <p className="text-gray-600">{zone.irrigation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}