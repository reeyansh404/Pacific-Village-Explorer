import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { villages } from '../data/villages'

export default function Homepage({ onSelectVillage }) {
  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 overflow-hidden">
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">🌊 Pacific Village Explorer</h1>
          <p className="text-slate-400 text-sm mt-1">See your village's climate future. Plan the adaptations that change it.</p>
        </div>
      </div>

      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
        <div className="flex-1 map-container-frame overflow-hidden">
          <MapContainer
            center={[-15, 175]}
            zoom={4}
            minZoom={3}
            maxZoom={7}
            scrollWheelZoom={true}
            className="h-full w-full"
            maxBounds={[[-50, 110], [15, 220]]}
            maxBoundsViscosity={1.0}
            worldCopyJump={true}
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Esri World Imagery"
            />
            {villages.map(v => (
              <Marker
                key={v.id}
                position={v.coordinates}
                eventHandlers={{ click: () => onSelectVillage(v) }}
              >
                <Popup>
                  <div className="font-semibold">{v.name}, {v.country}</div>
                  <div className="text-sm">{v.population} people</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="w-96 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex-shrink-0">
            <h2 className="text-xl font-bold">Pacific Villages</h2>
            <p className="text-sm text-slate-400 mt-1">Select a village to explore its climate future.</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {villages.map(v => (
                <div
                  key={v.id}
                  onClick={() => onSelectVillage(v)}
                  className="p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  <div className="font-semibold text-lg">{v.name}</div>
                  <div className="text-sm text-slate-400">{v.country} · {v.region}</div>
                  <div className="text-sm text-slate-400 mt-1">Population: {v.population}</div>
                  <p className="text-sm text-slate-300 mt-2">{v.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-500">
              Climate projections based on IPCC AR6 (SSP2-4.5), NASA sea level data, and SPREP Pacific Climate Change Programme.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}