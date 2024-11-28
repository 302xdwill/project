import React, { useState, useEffect } from 'react';
import { ZoneSelector } from './components/ZoneSelector';
import { ZoneDetails } from './components/ZoneDetails';
import { LocalitySelector } from './components/LocalitySelector';
import { StratumForm } from './components/StratumForm';
import { StratumList } from './components/StratumList';
import { SampleForm } from './components/SampleForm';
import { SampleList } from './components/SampleList';
import { StatisticalAnalysis } from './components/StatisticalAnalysis';
import { zones } from './data/zones';
import { Zone, Sample } from './types/zones';
import { Locality, Stratum } from './types/sampling';
import { generateRandomPlots } from './utils/sampling';
import SampleGraph from './components/SampleGraph'; // Importar el componente de gráfico

function App() {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedLocality, setSelectedLocality] = useState<Locality | null>(null);
  const [strata, setStrata] = useState<Stratum[]>([]);
  const [selectedPlots, setSelectedPlots] = useState<number[]>([]);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [showStatistics, setShowStatistics] = useState(false);

  // Cargar los datos del localStorage al cargar la página
  useEffect(() => {
    const savedSamples = localStorage.getItem('samples');
    const savedStrata = localStorage.getItem('strata');
    const savedSelectedPlots = localStorage.getItem('selectedPlots');

    if (savedSamples) {
      setSamples(JSON.parse(savedSamples));
    }

    if (savedStrata) {
      setStrata(JSON.parse(savedStrata));
    }

    if (savedSelectedPlots) {
      setSelectedPlots(JSON.parse(savedSelectedPlots));
    }
  }, []);

  // Guardar los datos en el localStorage cada vez que se actualicen
  useEffect(() => {
    localStorage.setItem('samples', JSON.stringify(samples));
    localStorage.setItem('strata', JSON.stringify(strata));
    localStorage.setItem('selectedPlots', JSON.stringify(selectedPlots));
  }, [samples, strata, selectedPlots]);

  const handleZoneSelect = (zoneName: string) => {
    setSelectedZone(zones[zoneName]);
    setSelectedLocality(null);
    setStrata([]);
    setSelectedPlots([]);
    setSamples([]);
    setShowStatistics(false);
  };

  const handleLocalitySelect = (locality: Locality) => {
    setSelectedLocality(locality);
    setStrata([]);
    setSelectedPlots([]);
    setSamples([]);
    setShowStatistics(false);
  };

  const handleStratumSubmit = (stratum: Stratum) => {
    setStrata([...strata, stratum]);
  };

  const handleGeneratePlots = () => {
    const allPlots: number[] = [];
    strata.forEach(stratum => {
      const plots = generateRandomPlots(stratum.totalPlots, stratum.selectedPlots);
      allPlots.push(...plots);
    });
    setSelectedPlots(allPlots.sort((a, b) => a - b));
  };

  const handleSampleSubmit = (sample: Sample) => {
    const updatedSamples = [...samples, sample];
    setSamples(updatedSamples);
    if (updatedSamples.length >= selectedPlots.length) {
      setShowStatistics(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="px-4 py-6 mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900">
            Sistema de Muestreo de Calidad de Papa - Juliaca
          </h1>
        </div>
      </header>

      <main className="px-4 py-8 mx-auto max-w-7xl">
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Seleccionar Zona</h2>
            <ZoneSelector onZoneSelect={handleZoneSelect} />
          </section>

          {selectedZone && (
            <>
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Detalles de la Zona</h2>
                <ZoneDetails zone={selectedZone} />
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold">Seleccionar Localidad</h2>
                <LocalitySelector 
                  zone={selectedZone.name} 
                  onLocalitySelect={handleLocalitySelect} 
                />
              </section>

              {selectedLocality && (
                <>
                  <section>
                    <h2 className="mb-4 text-2xl font-semibold">Definir Estratos</h2>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                      <StratumForm onStratumSubmit={handleStratumSubmit} />
                      <StratumList 
                        strata={strata} 
                        onGeneratePlots={handleGeneratePlots}
                      />
                    </div>
                  </section>

                  {selectedPlots.length > 0 && (
                    <section>
                      <h2 className="mb-4 text-2xl font-semibold">
                        Parcelas Seleccionadas: {selectedPlots.join(', ')}
                      </h2>
                      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <SampleForm onSampleSubmit={handleSampleSubmit} />
                        {samples.length > 0 && (
                          <SampleList samples={samples} />
                        )}
                      </div>
                    </section>
                  )}

                  {showStatistics && (
                    <section>
                      <h2 className="mb-4 text-2xl font-semibold">Análisis Estadístico</h2>
                      <StatisticalAnalysis samples={samples} />
                    </section>
                  )}

                  <section>
                    <h2 className="mb-4 text-2xl font-semibold">Gráfico de Muestras</h2>
                    <SampleGraph samples={samples} />
                  </section>
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
