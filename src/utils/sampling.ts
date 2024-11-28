import jStat from 'jstat';
import { Sample } from '../types/zones';

export function generateRandomPlots(totalPlots: number, selectedPlots: number): number[] {
  const plots: number[] = [];
  const available = Array.from({ length: totalPlots }, (_, i) => i + 1);

  while (plots.length < selectedPlots && available.length > 0) {
    const randomIndex = Math.floor(Math.random() * available.length);
    plots.push(available[randomIndex]);
    available.splice(randomIndex, 1);
  }

  return plots.sort((a, b) => a - b);
}

export function calculateStatistics(samples: Sample[]) {
  if (samples.length === 0) return null;

  const stats = {
    size: {
      mean: jStat.mean(samples.map(s => s.size)),
      stdDev: jStat.stdev(samples.map(s => s.size)),
      min: Math.min(...samples.map(s => s.size)),
      max: Math.max(...samples.map(s => s.size))
    },
    physicalDamage: {
      mean: jStat.mean(samples.map(s => s.physicalDamage)),
      stdDev: jStat.stdev(samples.map(s => s.physicalDamage))
    },
    diseases: {
      mean: jStat.mean(samples.map(s => s.diseases)),
      stdDev: jStat.stdev(samples.map(s => s.diseases))
    },
    humidity: {
      mean: jStat.mean(samples.map(s => s.humidity)),
      stdDev: jStat.stdev(samples.map(s => s.humidity))
    },
    yield: {
      mean: jStat.mean(samples.map(s => s.yield)),
      stdDev: jStat.stdev(samples.map(s => s.yield))
    }
  };

  return stats;
}