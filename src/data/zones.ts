import { Zone } from '../types/zones';

export const zones: Record<string, Zone> = {
  'Alto Puno': {
    name: 'Alto Puno',
    altitude: '3,800 - 4,000 m.s.n.m.',
    temperature: '10 - 15°C',
    soilType: 'Suelos andinos de tipo aridisoles y mollisoles',
    irrigation: 'Riego por gravedad',
    climate: 'Clima frío y seco, con lluvias entre noviembre a marzo'
  },
  'Zona Norte': {
    name: 'Zona Norte',
    altitude: '3,900 - 4,200 m.s.n.m.',
    temperature: '9 - 14°C',
    soilType: 'Suelos de tipo andisoles y luvisoles',
    irrigation: 'Riego por goteo o aspersión',
    climate: 'Frío, con variabilidad en la precipitación'
  },
  'Zona Este': {
    name: 'Zona Este',
    altitude: '3,700 - 3,900 m.s.n.m.',
    temperature: '12 - 18°C',
    soilType: 'Suelos de tipo entisoles y mollisoles',
    irrigation: 'Riego por gravedad o goteo',
    climate: 'Clima intermedio, lluvias moderadas entre diciembre y abril'
  },
  'Zona Sur': {
    name: 'Zona Sur',
    altitude: '3,800 - 4,100 m.s.n.m.',
    temperature: '8 - 14°C',
    soilType: 'Suelos de tipo aridisoles',
    irrigation: 'Riego por gravedad',
    climate: 'Clima frío y seco, precipitaciones limitadas'
  },
  'Areas Rurales': {
    name: 'Areas Rurales Periurbanas',
    altitude: '3,800 - 4,000 m.s.n.m.',
    temperature: '12 - 17°C',
    soilType: 'Suelos heterogéneos, andisoles y luvisoles',
    irrigation: 'Riego por goteo y aspersión',
    climate: 'Condiciones moderadas, precipitación en verano'
  }
};