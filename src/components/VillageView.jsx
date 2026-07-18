import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polygon } from 'react-leaflet'
import { ArrowLeft } from 'lucide-react'
import L from 'leaflet'
import { assets } from '../data/assets'
import { STATUS_COLORS, ASSET_SVG, ASSET_LABELS, getAssetStatus, SEA_LEVEL_RISE_METERS } from '../utils/statusHelpers'
import TimeSlider from './TimeSlider'
import Statistics from './Statistics'
import AssetPanel from './AssetPanel'
import AdaptationConfirmModal from './AdaptationConfirmModal'
import CoastlineTracerPanel, { CoastlineTraceLayer } from './CoastlineTracer'
import { buildTracedFloodPolygon, TRACED_COASTLINE_VILLAGE_ID } from '../utils/coastline'

export default function VillageView({ village, onBack }) {
  const [year, setYear] = useState(2026)
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [appliedAdaptations, setAppliedAdaptations] = useState([]) // asset ids currently protected
  const [appliedAdaptationNames, setAppliedAdaptationNames] = useState({}) // assetId -> adaptation name, for display only
  const [filterType, setFilterType] = useState(null)
  const [confirmation, setConfirmation] = useState(null) // { mode: 'applied' | 'removed', assetName, adaptationName }
  const [tracing, setTracing] = useState(false)
  const [tracedPoints, setTracedPoints] = useState([])

  const allVillageAssets = assets.filter(a => a.villageId === village.id)
  const villageAssets = filterType
    ? allVillageAssets.filter(a => a.type === filterType)
    : allVillageAssets

  const seaLevelMeters = SEA_LEVEL_RISE_METERS[year]

  const lat = village.coordinates[0]
  const lng = village.coordinates[1]

  // Fallback shape (hand-picked offsets from the village centre) — used for
  // any village other than the one we actually traced a real coastline for,
  // since those don't have asset data or a traced shoreline yet.
  const fallbackFloodPolygonByYear = {
    2026: [
      [lat - 0.0130, lng - 0.0180], [lat - 0.0115, lng - 0.0100],
      [lat - 0.0105, lng - 0.0050], [lat - 0.0100, lng + 0.0000],
      [lat - 0.0105, lng + 0.0050], [lat - 0.0115, lng + 0.0100],
      [lat - 0.0130, lng + 0.0180], [lat - 0.0180, lng + 0.0200],
      [lat - 0.0180, lng - 0.0200],
    ],
    2030: [
      [lat - 0.0130, lng - 0.0180], [lat - 0.0108, lng - 0.0110],
      [lat - 0.0095, lng - 0.0060], [lat - 0.0088, lng + 0.0000],
      [lat - 0.0095, lng + 0.0060], [lat - 0.0108, lng + 0.0110],
      [lat - 0.0130, lng + 0.0180], [lat - 0.0180, lng + 0.0200],
      [lat - 0.0180, lng - 0.0200],
    ],
    2035: [
      [lat - 0.0130, lng - 0.0180], [lat - 0.0100, lng - 0.0120],
      [lat - 0.0083, lng - 0.0070], [lat - 0.0075, lng + 0.0000],
      [lat - 0.0083, lng + 0.0070], [lat - 0.0100, lng + 0.0120],
      [lat - 0.0130, lng + 0.0180], [lat - 0.0180, lng + 0.0200],
      [lat - 0.0180, lng - 0.0200],
    ],
    2040: [
      [lat - 0.0130, lng - 0.0190], [lat - 0.0090, lng - 0.0130],
      [lat - 0.0070, lng - 0.0080], [lat - 0.0062, lng + 0.0000],
      [lat - 0.0070, lng + 0.0080], [lat - 0.0090, lng + 0.0130],
      [lat - 0.0130, lng + 0.0190], [lat - 0.0180, lng + 0.0210],
      [lat - 0.0180, lng - 0.0210],
    ],
    2045: [
      [lat - 0.0130, lng - 0.0200], [lat - 0.0078, lng - 0.0140],
      [lat - 0.0058, lng - 0.0090], [lat - 0.0050, lng + 0.0000],
      [lat - 0.0058, lng + 0.0090], [lat - 0.0078, lng + 0.0140],
      [lat - 0.0130, lng + 0.0200], [lat - 0.0180, lng + 0.0220],
      [lat - 0.0180, lng - 0.0220],
    ],
    2050: [
      [lat - 0.0130, lng - 0.0210], [lat - 0.0065, lng - 0.0150],
      [lat - 0.0045, lng - 0.0100], [lat - 0.0038, lng + 0.0000],
      [lat - 0.0045, lng + 0.0100], [lat - 0.0065, lng + 0.0150],
      [lat - 0.0130, lng + 0.0210], [lat - 0.0180, lng + 0.0230],
      [lat - 0.0180, lng - 0.0230],
    ],
    2060: [
      [lat - 0.0130, lng - 0.0220], [lat - 0.0050, lng - 0.0160],
      [lat - 0.0030, lng - 0.0110], [lat - 0.0022, lng + 0.0000],
      [lat - 0.0030, lng + 0.0110], [lat - 0.0050, lng + 0.0160],
      [lat - 0.0130, lng + 0.0220], [lat - 0.0180, lng + 0.0240],
      [lat - 0.0180, lng - 0.0240],
    ],
    2075: [
      [lat - 0.0130, lng - 0.0230], [lat - 0.0030, lng - 0.0170],
      [lat - 0.0010, lng - 0.0120], [lat + 0.0000, lng + 0.0000],
      [lat - 0.0010, lng + 0.0120], [lat - 0.0030, lng + 0.0170],
      [lat - 0.0130, lng + 0.0230], [lat - 0.0180, lng + 0.0250],
      [lat - 0.0180, lng - 0.0250],
    ]
  }

  // Muanikau (Nakawaqa) gets the real traced coastline; every other village
  // falls back to the approximate hand-tuned shape until someone traces
  // theirs too.
  const floodPolygon = village.id === TRACED_COASTLINE_VILLAGE_ID
    ? buildTracedFloodPolygon(year)
    : fallbackFloodPolygonByYear[year]

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 overflow-hidden">
      <div className="bg-slate-900 border-b border-slate-800 p-3 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm px-3 py-1 rounded hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All villages
          </button>
          <div>
            <h1 className="text-base font-bold">{village.name}, {village.country}</h1>
            <div className="text-xs text-slate-400">{village.region} · {village.population} people</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
        <div className="flex-1 relative map-container-frame overflow-hidden">
          <MapContainer
            center={village.coordinates}
            zoom={15}
            minZoom={13}
            maxZoom={19}
            scrollWheelZoom={true}
            key={village.id}
            className="h-full w-full"
            maxBounds={[
              [village.coordinates[0] - 0.05, village.coordinates[1] - 0.05],
              [village.coordinates[0] + 0.05, village.coordinates[1] + 0.05]
            ]}
            maxBoundsViscosity={1.0}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap contributors &copy; CARTO | Climate: IPCC AR6'
              subdomains="abcd"
            />

            <Polygon
              positions={floodPolygon}
              pathOptions={{
                color: '#3b82f6',
                fillColor: '#1e40af',
                fillOpacity: 0.55,
                weight: 2,
                dashArray: '5, 5'
              }}
            >
              <Tooltip sticky opacity={0.9}>
                <div style={{ fontWeight: 600 }}>Projected inundation zone</div>
                <div style={{ fontSize: '11px' }}>Sea level +{seaLevelMeters}m by {year}</div>
              </Tooltip>
            </Polygon>

            <CoastlineTraceLayer
              active={tracing}
              points={tracedPoints}
              onPoint={p => setTracedPoints(prev => [...prev, p])}
            />

            {villageAssets.map(asset => {
              const status = getAssetStatus(asset, year, appliedAdaptations)
              const icon = L.divIcon({
                className: `custom-asset-marker ${status === 'destroyed' ? 'destroyed' : ''}`,
                html: `
                  <div style="
                    background: ${STATUS_COLORS[status]};
                    border: 2px solid white;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
                    cursor: pointer;
                  ">${ASSET_SVG[asset.type]}</div>
                `,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
              })

              return (
                <Marker
                  key={asset.id}
                  position={asset.coordinates}
                  icon={icon}
                  eventHandlers={{ click: () => setSelectedAsset(asset) }}
                >
                  <Tooltip direction="top" offset={[0, -16]} opacity={0.9}>
                    <span className="text-sm font-semibold">{asset.name}</span>
                  </Tooltip>
                </Marker>
              )
            })}
          </MapContainer>

          <div className="sea-level-badge">
            <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '4px' }}>
              SEA LEVEL RISE
            </div>
            <div className="value" style={{ fontSize: '24px', lineHeight: '1' }}>
              +{seaLevelMeters}m
            </div>
            <div style={{ fontSize: '9px', opacity: 0.6, marginTop: '4px' }}>
              vs 2020 baseline · IPCC AR6
            </div>
          </div>

          {filterType && (
            <div className="absolute top-4 left-16 bg-blue-900 bg-opacity-90 border border-blue-700 px-3 py-1 rounded-lg text-xs text-white z-500">
              Showing: {ASSET_LABELS[filterType]}
            </div>
          )}

          <CoastlineTracerPanel
            tracing={tracing}
            onToggle={() => setTracing(t => !t)}
            points={tracedPoints}
            onUndo={() => setTracedPoints(prev => prev.slice(0, -1))}
            onClear={() => setTracedPoints([])}
          />
        </div>

        <div className="w-96 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {selectedAsset ? (
              <AssetPanel
                asset={selectedAsset}
                year={year}
                village={village}
                appliedAdaptations={appliedAdaptations}
                appliedAdaptationNames={appliedAdaptationNames}
                onClose={() => setSelectedAsset(null)}
                onApplyAdaptation={(assetId, adaptationName) => {
                  setAppliedAdaptations(prev => [...prev, assetId])
                  setAppliedAdaptationNames(prev => ({ ...prev, [assetId]: adaptationName }))
                  setConfirmation({ mode: 'applied', assetName: selectedAsset.name, adaptationName })
                }}
                onRemoveAdaptation={(assetId) => {
                  setAppliedAdaptations(prev => prev.filter(id => id !== assetId))
                  setConfirmation({ mode: 'removed', assetName: selectedAsset.name })
                }}
              />
            ) : (
              <Statistics
                assets={allVillageAssets}
                year={year}
                appliedAdaptations={appliedAdaptations}
                filterType={filterType}
                onFilterChange={setFilterType}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex-shrink-0">
        <TimeSlider year={year} onChange={setYear} />
      </div>

      {confirmation && (
        <AdaptationConfirmModal
          mode={confirmation.mode}
          assetName={confirmation.assetName}
          adaptationName={confirmation.adaptationName}
          onClose={() => setConfirmation(null)}
        />
      )}
    </div>
  )
}