import { useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { assets } from '../data/assets'
import { STATUS_COLORS, ASSET_ICONS, getAssetStatus } from '../utils/statusHelpers'
import TimeSlider from './TimeSlider'
import Statistics from './Statistics'
import AssetPanel from './AssetPanel'

export default function VillageView({ village, onBack }) {
  const [year, setYear] = useState(2026)
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [appliedAdaptations, setAppliedAdaptations] = useState([])

  const villageAssets = assets.filter(a => a.villageId === village.id)

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-slate-900 border-b border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-slate-400 hover:text-white text-sm"
            >
              ← All villages
            </button>
            <div>
              <h1 className="text-xl font-bold">{village.name}, {village.country}</h1>
              <div className="text-sm text-slate-400">{village.region} · {village.population} people</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative">
          <MapContainer
            center={village.coordinates}
            zoom={17}
            className="h-full w-full"
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Esri World Imagery"
            />
            {villageAssets.map(asset => {
              const status = getAssetStatus(asset, year, appliedAdaptations)
              return (
                <CircleMarker
                  key={asset.id}
                  center={asset.coordinates}
                  radius={12}
                  fillColor={STATUS_COLORS[status]}
                  color="white"
                  weight={2}
                  fillOpacity={0.8}
                  eventHandlers={{ click: () => setSelectedAsset(asset) }}
                >
                  <Popup>
                    <div className="font-semibold">
                      {ASSET_ICONS[asset.type]} {asset.name}
                    </div>
                    <div className="text-sm">Click marker to view details</div>
                  </Popup>
                </CircleMarker>
              )
            })}
          </MapContainer>
        </div>

        <div className="w-96 bg-slate-900 border-l border-slate-800 overflow-y-auto">
          {selectedAsset ? (
            <AssetPanel
              asset={selectedAsset}
              year={year}
              village={village}
              appliedAdaptations={appliedAdaptations}
              onClose={() => setSelectedAsset(null)}
              onApplyAdaptation={(id) => {
                setAppliedAdaptations([...appliedAdaptations, id])
              }}
            />
          ) : (
            <Statistics
              assets={villageAssets}
              year={year}
              appliedAdaptations={appliedAdaptations}
            />
          )}
        </div>
      </div>

      <TimeSlider year={year} onChange={setYear} />
    </div>
  )
}