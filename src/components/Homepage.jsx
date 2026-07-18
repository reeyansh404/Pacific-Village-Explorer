import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { villages } from '../data/villages'
import { Waves, Building2, Users } from 'lucide-react'

export default function Homepage({ onSelectVillage }) {
  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 overflow-hidden">
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Pacific Village Explorer</h1>
        </div>
      </div>

      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex-shrink-0">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-lg p-3 flex-shrink-0">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold mb-1">Climate planning for Pacific villages</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Built for the <span className="text-blue-400 font-semibold">Bose ni Koro</span> — the village council — 
                  and community coordinators. See what climate change means for your village today, 
                  in 2050, in 2075. Plan adaptations your community can actually build.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 map-container-frame overflow-hidden">
            <MapContainer
              center={[-11, 184]}
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
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                subdomains="abcd"
              />
              {villages.map(v => (
                <Marker
                  key={v.id}
                  position={[v.coordinates[0], v.coordinates[1] < 0 ? v.coordinates[1] + 360 : v.coordinates[1]]}
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
        </div>

        <div className="w-80 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex-shrink-0">
            <h2 className="text-lg font-bold">Villages</h2>
            <p className="text-xs text-slate-400 mt-1">Select a village to begin</p>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <div className="space-y-2">
              {villages.map(v => (
                <div
                  key={v.id}
                  onClick={() => onSelectVillage(v)}
                  className="p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors border border-slate-700 hover:border-blue-500"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold">{v.name}</div>
                    <div className="text-xs text-slate-400">{v.country}</div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {v.population}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {v.region.split(',')[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500 leading-relaxed">
              Climate data from IPCC AR6 (SSP2-4.5), NASA sea level projections, and SPREP Pacific Climate Change Programme.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}