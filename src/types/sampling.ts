export interface Locality {
  id: string;
  name: string;
  zone: string;
}

export interface PotatoType {
  id: string;
  name: string;
}

export interface IrrigationType {
  id: string;
  name: string;
}

export interface SoilType {
  id: string;
  name: string;
}

export interface Stratum {
  id: string;
  potatoType: string;
  irrigationType: string;
  soilType: string;
  totalPlots: number;
  selectedPlots: number;
}

export const POTATO_TYPES: PotatoType[] = [
  { id: 'amarilla', name: 'Papa Amarilla' },
  { id: 'blanca', name: 'Papa Blanca' },
  { id: 'nativa', name: 'Papa Nativa' }
];

export const IRRIGATION_TYPES: IrrigationType[] = [
  { id: 'goteo', name: 'Riego por Goteo' },
  { id: 'gravedad', name: 'Riego por Gravedad' },
  { id: 'aspersion', name: 'Riego por Aspersión' }
];

export const SOIL_TYPES: SoilType[] = [
  { id: 'andisoles', name: 'Andisoles' },
  { id: 'aridisoles', name: 'Aridisoles' },
  { id: 'mollisoles', name: 'Mollisoles' }
];

