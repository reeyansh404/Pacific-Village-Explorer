import { useState } from 'react'
import { useMapEvents } from 'react-leaflet'
import { Polyline, CircleMarker } from 'react-leaflet'
import { MapPin, Copy, Undo2, Trash2, X, Check } from 'lucide-react'

// Click handler must live inside <MapContainer> to use useMapEvents.
export function CoastlineTraceLayer({ active, points, onPoint }) {
  useMapEvents({
    click(e) {
      if (!active) return
      onPoint([+e.latlng.lat.toFixed(6), +e.latlng.lng.toFixed(6)])
    }
  })

  if (points.length === 0) return null

  return (
    <>
      <Polyline positions={points} pathOptions={{ color: '#f43f5e', weight: 3, dashArray: '4, 4' }} />
      {points.map((p, i) => (
        <CircleMarker
          key={i}
          center={p}
          radius={5}
          pathOptions={{ color: '#f43f5e', fillColor: '#f43f5e', fillOpacity: 1, weight: 2 }}
        />
      ))}
    </>
  )
}

// Floating control panel — lives outside the map, in normal DOM.
export default function CoastlineTracerPanel({ tracing, onToggle, points, onUndo, onClear }) {
  const [copied, setCopied] = useState(false)

  const copyPoints = async () => {
    const json = JSON.stringify(points, null, 2)
    try {
      await navigator.clipboard.writeText(json)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API can be blocked (e.g. non-HTTPS) — fall back to a prompt
      window.prompt('Copy these coordinates:', json)
    }
  }

  if (!tracing) {
    return (
      <button
        onClick={onToggle}
        className="absolute bottom-4 left-4 z-[500] flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs px-3 py-2 rounded-lg backdrop-blur-sm transition-colors"
        title="Dev tool: trace the real coastline by clicking on the map"
      >
        <MapPin className="w-3.5 h-3.5" />
        Trace real coastline
      </button>
    )
  }

  return (
    <div className="absolute bottom-4 left-4 z-[500] bg-slate-900/95 border border-rose-600 rounded-lg p-3 backdrop-blur-sm w-64">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          Tracing coastline
        </div>
        <button onClick={onToggle} className="text-slate-500 hover:text-white">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
        Click along the real shoreline, in order, following the water's edge. {points.length} point{points.length === 1 ? '' : 's'} placed.
      </p>

      <div className="flex gap-1.5 mb-1.5">
        <button
          onClick={onUndo}
          disabled={points.length === 0}
          className="flex-1 flex items-center justify-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 px-2 py-1.5 rounded"
        >
          <Undo2 className="w-3 h-3" /> Undo
        </button>
        <button
          onClick={onClear}
          disabled={points.length === 0}
          className="flex-1 flex items-center justify-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 px-2 py-1.5 rounded"
        >
          <Trash2 className="w-3 h-3" /> Clear
        </button>
      </div>

      <button
        onClick={copyPoints}
        disabled={points.length === 0}
        className="w-full flex items-center justify-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-2 py-2 rounded font-semibold"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? 'Copied!' : 'Copy coordinates'}
      </button>

      <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
        Paste the copied list back to rebuild the flood zone from the real coastline instead of an approximation.
      </p>
    </div>
  )
}