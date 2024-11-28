export interface Zone {
  name: string;
  altitude: string;
  temperature: string;
  soilType: string;
  irrigation: string;
  climate: string;
}

export interface Sample {
  size: number;
  color: string;
  physicalDamage: number;
  diseases: number;
  humidity: number;
  yield: number;
}

export interface Plot {
  id: string;
  zone: string;
  locality: string;
  stratum: string;
  samples: Sample[];
}