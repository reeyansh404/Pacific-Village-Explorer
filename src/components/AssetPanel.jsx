import { useState } from 'react'
import { STATUS_COLORS, STATUS_LABELS, ASSET_ICONS, ASSET_LABELS, getAssetStatus, getAssetNote } from '../utils/statusHelpers'

export default function AssetPanel({ asset, year, village, appliedAdaptations, onClose, onApplyAdaptation }) {
  const [adaptations, setAdaptations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const status = getAssetStatus(asset, year, appliedAdaptations)
  const note = getAssetNote(asset, year, appliedAdaptations)
  const isProtected = appliedAdaptations.includes(asset.id)

  const fetchAdaptations = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/adaptations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          village,
          asset,
          year,
          threat: note
        })
      })
      if (!res.ok) throw new Error('Failed to fetch adaptations')
      const data = await res.json()
      setAdaptations(data.adaptations)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white mb-4 text-sm"
      >
        ← Back to overview
      </button>

      <div className="mb-4">
        <div className="text-3xl mb-2">{ASSET_ICONS[asset.type]}</div>
        <h2 className="text-2xl font-bold">{asset.name}</h2>
        <div className="text-sm text-slate-400 mt-1">{ASSET_LABELS[asset.type]}</div>
      </div>

      {(asset.culturalSignificance === 'high' || asset.culturalSignificance === 'critical') && (
        <div className="bg-yellow-900 bg-opacity-30 border border-yellow-800 rounded-lg p-3 mb-4">
          <div className="text-sm font-semibold text-yellow-400 mb-1">
            🏛️ {asset.culturalSignificance === 'critical' ? 'Critical' : 'High'} Cultural Value
          </div>
          <div className="text-sm text-slate-300">
            This asset carries deep community meaning. Adaptation must preserve cultural function alongside physical protection.
          </div>
        </div>
      )}

      <div className="bg-slate-800 rounded-lg p-4 mb-4">
        <p className="text-sm text-slate-300">{asset.description}</p>
      </div>

      <div className="mb-4">
        <div className="text-sm text-slate-400 mb-1">Status in {year}</div>
        <div
          className="text-2xl font-bold"
          style={{ color: STATUS_COLORS[status] }}
        >
          {STATUS_LABELS[status]}
        </div>
        <p className="text-sm text-slate-300 mt-2 italic">{note}</p>
      </div>

      {isProtected && (
        <div className="bg-green-900 bg-opacity-30 border border-green-800 rounded-lg p-3 mb-4">
          <div className="text-sm text-green-400">✓ Community adaptation applied</div>
        </div>
      )}

      {!isProtected && status !== 'safe' && !adaptations && !loading && (
        <button
          onClick={fetchAdaptations}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
        >
          Get Adaptation Options
        </button>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="text-slate-400">Generating adaptation recommendations...</div>
          <div className="text-xs text-slate-500 mt-2">Tailored to {village.name}'s context</div>
        </div>
      )}

      {error && (
        <div className="bg-red-900 bg-opacity-30 border border-red-800 rounded-lg p-4 text-sm text-red-400">
          {error}
          <button onClick={fetchAdaptations} className="block mt-2 underline">Try again</button>
        </div>
      )}

      {adaptations && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Recommended Adaptations</h3>
          <div className="space-y-3">
            {adaptations.map((a, i) => (
              <AdaptationCard
                key={i}
                adaptation={a}
                onApply={() => onApplyAdaptation(asset.id)}
                isApplied={isProtected}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function AdaptationCard({ adaptation, onApply, isApplied }) {
  const effortColor = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-red-400'
  }

  const effectivenessColor = {
    low: 'text-red-400',
    medium: 'text-yellow-400',
    high: 'text-green-400'
  }

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      <div className="font-semibold text-lg mb-1">{adaptation.name}</div>
      <p className="text-sm text-slate-300 mb-3">{adaptation.description}</p>

      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
        <div>
          <div className="text-slate-500">Cost</div>
          <div className="font-semibold">${adaptation.cost_estimate_usd?.toLocaleString() || 'N/A'}</div>
        </div>
        <div>
          <div className="text-slate-500">Time</div>
          <div className="font-semibold">{adaptation.implementation_time_months} months</div>
        </div>
        <div>
          <div className="text-slate-500">Community Effort</div>
          <div className={`font-semibold ${effortColor[adaptation.community_effort]}`}>
            {adaptation.community_effort}
          </div>
        </div>
        <div>
          <div className="text-slate-500">Effectiveness</div>
          <div className={`font-semibold ${effectivenessColor[adaptation.effectiveness]}`}>
            {adaptation.effectiveness}
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-400 italic mb-3">
        🏛️ {adaptation.cultural_considerations}
      </div>

      {!isApplied && (
        <button
          onClick={onApply}
          className="w-full bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm font-semibold transition-colors"
        >
          Apply This Adaptation
        </button>
      )}
    </div>
  )
}