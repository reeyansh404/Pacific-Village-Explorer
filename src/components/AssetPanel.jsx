import { useState } from 'react'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import {
  STATUS_COLORS,
  STATUS_LABELS,
  STATUS_INFO,
  ASSET_ICONS,
  ASSET_LABELS,
  ASSET_WHY_IT_MATTERS,
  getAssetStatus,
  getAssetNote
} from '../utils/statusHelpers'

// Mock adaptations by asset type for demo when API is unavailable
const MOCK_ADAPTATIONS = {
  water: [
    {
      name: 'Rainwater Harvesting System',
      description: 'Install rooftop rainwater collection with 5000L community storage tanks',
      cost_estimate_usd: 1500,
      community_effort: 'medium',
      effectiveness: 'high',
      implementation_time_months: 3,
      cultural_considerations: 'Traditional well preserved as ceremonial site while modern collection provides drinking water'
    },
    {
      name: 'Elevated Well with Salt Barrier',
      description: 'Raise well opening 1.5m above ground with clay-lined salt barrier',
      cost_estimate_usd: 3000,
      community_effort: 'high',
      effectiveness: 'medium',
      implementation_time_months: 4,
      cultural_considerations: 'Community elders lead the traditional blessing before construction begins'
    },
    {
      name: 'Community Water Filtration',
      description: 'Solar-powered desalination unit for 45 households, maintained by trained villagers',
      cost_estimate_usd: 8000,
      community_effort: 'low',
      effectiveness: 'high',
      implementation_time_months: 6,
      cultural_considerations: 'Two villagers trained as maintainers, ensuring skills stay in community'
    }
  ],
  house: [
    {
      name: 'Stilted Foundation Rebuild',
      description: 'Elevate structure on hardwood stilts 2m above ground level',
      cost_estimate_usd: 4500,
      community_effort: 'high',
      effectiveness: 'high',
      implementation_time_months: 4,
      cultural_considerations: 'Traditional bure design preserved with modern flood-resistant foundation'
    },
    {
      name: 'Cyclone-Resistant Reinforcement',
      description: 'Add hurricane straps, storm shutters, and reinforced roof structure',
      cost_estimate_usd: 2000,
      community_effort: 'medium',
      effectiveness: 'medium',
      implementation_time_months: 2,
      cultural_considerations: 'Community-led installation using locally-sourced materials where possible'
    },
    {
      name: 'Managed Relocation Support',
      description: 'Gradual family relocation to higher-ground community land with cultural site preservation',
      cost_estimate_usd: 12000,
      community_effort: 'high',
      effectiveness: 'high',
      implementation_time_months: 18,
      cultural_considerations: 'Ancestral connection to land honored through documented cultural memory transfer'
    }
  ],
  farm: [
    {
      name: 'Salt-Tolerant Crop Varieties',
      description: 'Transition to salt-tolerant taro cultivars and traditional root crops',
      cost_estimate_usd: 800,
      community_effort: 'low',
      effectiveness: 'high',
      implementation_time_months: 6,
      cultural_considerations: 'Traditional planting practices preserved with new cultivar varieties'
    },
    {
      name: 'Raised Bed Farming System',
      description: 'Construct raised planting beds with drainage above flood level',
      cost_estimate_usd: 2500,
      community_effort: 'high',
      effectiveness: 'medium',
      implementation_time_months: 4,
      cultural_considerations: 'Community farming traditions maintained with new bed design'
    },
    {
      name: 'Aquaculture Transition',
      description: 'Convert flooded areas to fish farming ponds for food security',
      cost_estimate_usd: 5000,
      community_effort: 'medium',
      effectiveness: 'high',
      implementation_time_months: 8,
      cultural_considerations: 'Elder fishermen lead training in sustainable aquaculture practices'
    }
  ],
  sacred: [
    {
      name: 'Digital Cultural Preservation',
      description: 'Document sacred site with 3D scanning and oral history recording',
      cost_estimate_usd: 3000,
      community_effort: 'medium',
      effectiveness: 'high',
      implementation_time_months: 4,
      cultural_considerations: 'Elders lead the recording process ensuring cultural knowledge is preserved authentically'
    },
    {
      name: 'Protective Sea Wall',
      description: 'Traditional stone-and-mangrove barrier protecting sacred boundary',
      cost_estimate_usd: 6000,
      community_effort: 'high',
      effectiveness: 'medium',
      implementation_time_months: 8,
      cultural_considerations: 'Traditional Fijian stone-fitting techniques used, blessed by chief before construction'
    },
    {
      name: 'Managed Ceremonial Relocation',
      description: 'Community ceremony to establish new sacred site with continuous cultural connection',
      cost_estimate_usd: 4000,
      community_effort: 'high',
      effectiveness: 'high',
      implementation_time_months: 12,
      cultural_considerations: 'Full traditional protocol observed, elders and chief lead relocation ceremony'
    }
  ],
  school: [
    {
      name: 'Storm-Shelter Upgrade',
      description: 'Reinforce school as community cyclone shelter with backup power',
      cost_estimate_usd: 5000,
      community_effort: 'medium',
      effectiveness: 'high',
      implementation_time_months: 6,
      cultural_considerations: 'Dual function preserves community gathering role of school'
    },
    {
      name: 'Elevated Classroom Extension',
      description: 'Add raised classroom block above flood level for continued education',
      cost_estimate_usd: 8000,
      community_effort: 'medium',
      effectiveness: 'high',
      implementation_time_months: 8,
      cultural_considerations: 'Local materials and craftsmanship prioritized in construction'
    },
    {
      name: 'Distance Learning Infrastructure',
      description: 'Solar-powered connectivity for online classes during closures',
      cost_estimate_usd: 3500,
      community_effort: 'low',
      effectiveness: 'medium',
      implementation_time_months: 3,
      cultural_considerations: 'Local teacher training ensures technology serves village needs'
    }
  ],
  reef: [
    {
      name: 'Coral Restoration Program',
      description: 'Community-led coral fragment nursery and replanting initiative',
      cost_estimate_usd: 4000,
      community_effort: 'high',
      effectiveness: 'medium',
      implementation_time_months: 12,
      cultural_considerations: 'Traditional fishing knowledge combined with modern restoration techniques'
    },
    {
      name: 'Alternative Fishing Grounds',
      description: 'Community-managed marine protected area with rotational fishing zones',
      cost_estimate_usd: 1500,
      community_effort: 'medium',
      effectiveness: 'medium',
      implementation_time_months: 6,
      cultural_considerations: 'Traditional taboo (tabu) practices formalized for sustainable management'
    },
    {
      name: 'Aquaculture Development',
      description: 'Establish sustainable aquaculture for continued food security',
      cost_estimate_usd: 6000,
      community_effort: 'medium',
      effectiveness: 'high',
      implementation_time_months: 10,
      cultural_considerations: 'Elder fishermen guide species selection and cultural practices'
    }
  ],
  road: [
    {
      name: 'Elevated Road Reconstruction',
      description: 'Raise road bed 1m with improved drainage culverts',
      cost_estimate_usd: 7000,
      community_effort: 'medium',
      effectiveness: 'high',
      implementation_time_months: 6,
      cultural_considerations: 'Community labor prioritized, road path preserves cultural landmarks'
    },
    {
      name: 'Alternative Inland Route',
      description: 'New access route via higher-ground path connecting to district road',
      cost_estimate_usd: 5000,
      community_effort: 'high',
      effectiveness: 'medium',
      implementation_time_months: 8,
      cultural_considerations: 'Route negotiated through community land with elder consultation'
    }
  ]
}

export default function AssetPanel({ asset, year, village, appliedAdaptations, appliedAdaptationNames, onClose, onApplyAdaptation, onRemoveAdaptation }) {
  const { t } = useT()
  const [adaptations, setAdaptations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const status = getAssetStatus(asset, year, appliedAdaptations)
  const note = getAssetNote(asset, year, appliedAdaptations)
  const isProtected = appliedAdaptations.includes(asset.id)
  const statusInfo = STATUS_INFO[status]

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
      if (!res.ok) throw new Error('API unavailable')
      const data = await res.json()
      setAdaptations(data.adaptations)
    } catch (err) {
      // Fallback to mock adaptations for demo
      console.log('Using mock adaptations for demo')
      setTimeout(() => {
        const mockData = MOCK_ADAPTATIONS[asset.type] || MOCK_ADAPTATIONS.house
        setAdaptations(mockData)
      }, 800) // Simulate API delay for realistic feel
    }
    setLoading(false)
  }

  return (
    <div className="p-6 h-full">
      <button
        onClick={onClose}
        className="flex items-center gap-1.5 text-slate-400 hover:text-white mb-4 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to overview
      </button>

      <div className="mb-4">
        <div className="text-3xl mb-2">{ASSET_ICONS[asset.type]}</div>
        <h2 className="text-2xl font-bold">{asset.name}</h2>
        <div className="text-sm text-slate-400 mt-1">{t('asset.' + asset.type)}</div>
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

      <div className="bg-slate-800 rounded-lg p-4 mb-3">
        <p className="text-sm text-slate-300">{asset.description}</p>
      </div>

      {/* Why this matters — plain language, no jargon */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3 mb-4">
        <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Why this matters</div>
        <p className="text-sm text-slate-300">{ASSET_WHY_IT_MATTERS[asset.type]}</p>
      </div>

      <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: `${STATUS_COLORS[status]}1a`, border: `1px solid ${STATUS_COLORS[status]}55` }}>
        <div className="text-sm text-slate-400 mb-1">Status in {year}</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{statusInfo.emoji}</span>
          <div>
            <div className="text-xl font-bold" style={{ color: STATUS_COLORS[status] }}>
              {t('status.' + status)} — {statusInfo.headline}
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-300">{statusInfo.explain}</p>
        {note && <p className="text-sm text-slate-400 mt-2 italic">"{note}"</p>}
      </div>

      {isProtected && (
        <div className="bg-green-900 bg-opacity-30 border border-green-800 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-green-400 mb-0.5">✓ Protected</div>
              <div className="text-xs text-slate-300">
                {village.name}'s community built{appliedAdaptationNames?.[asset.id] ? `: ${appliedAdaptationNames[asset.id]}` : ' a protection for this place'}.
              </div>
            </div>
            <button
              onClick={() => onRemoveAdaptation(asset.id)}
              className="flex items-center gap-1.5 flex-shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Undo
            </button>
          </div>
        </div>
      )}

      {!isProtected && status !== 'safe' && !adaptations && !loading && (
        <button
          onClick={fetchAdaptations}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
        >
          What can the village do about this?
        </button>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="text-slate-400">Thinking of ways to help...</div>
          <div className="text-xs text-slate-500 mt-2">Tailored to {village.name}'s context</div>
        </div>
      )}

      {adaptations && !isProtected && (
        <div>
          <h3 className="text-lg font-semibold mb-1">Ways to help</h3>
          <p className="text-xs text-slate-400 mb-3">Pick one the village could realistically build. You can undo it any time.</p>
          <div className="space-y-3">
            {adaptations.map((a, i) => (
              <AdaptationCard
                key={i}
                adaptation={a}
                onApply={() => onApplyAdaptation(asset.id, a.name)}
                recommended={i === 0}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function AdaptationCard({ adaptation, onApply, recommended }) {
  const effortMeta = {
    low: { label: 'Easy for the village to build', color: 'text-green-400' },
    medium: { label: 'Takes real community effort', color: 'text-yellow-400' },
    high: { label: 'A big undertaking for the village', color: 'text-red-400' }
  }

  const effectivenessMeta = {
    low: { label: 'Helps a little', color: 'text-red-400' },
    medium: { label: 'Helps a fair amount', color: 'text-yellow-400' },
    high: { label: 'Protects very well', color: 'text-green-400' }
  }

  const effort = effortMeta[adaptation.community_effort] || effortMeta.medium
  const effectiveness = effectivenessMeta[adaptation.effectiveness] || effectivenessMeta.medium

  return (
    <div className={`bg-slate-800 rounded-lg p-4 border ${recommended ? 'border-blue-600' : 'border-slate-700'}`}>
      {recommended && (
        <div className="inline-block text-[10px] font-bold uppercase tracking-wide text-blue-400 bg-blue-900/40 px-2 py-0.5 rounded mb-2">
          Suggested first
        </div>
      )}

      <div className="font-semibold text-lg mb-1">{adaptation.name}</div>
      <p className="text-sm text-slate-300 mb-3">{adaptation.description}</p>

      <div className="grid grid-cols-2 gap-3 text-xs mb-3 bg-slate-900/50 rounded-lg p-3">
        <div>
          <div className="text-slate-500 mb-0.5">How well it works</div>
          <div className={`font-semibold ${effectiveness.color}`}>{effectiveness.label}</div>
        </div>
        <div>
          <div className="text-slate-500 mb-0.5">Effort needed</div>
          <div className={`font-semibold ${effort.color}`}>{effort.label}</div>
        </div>
        <div>
          <div className="text-slate-500 mb-0.5">Roughly costs</div>
          <div className="font-semibold text-slate-200">${adaptation.cost_estimate_usd?.toLocaleString() || 'N/A'}</div>
        </div>
        <div>
          <div className="text-slate-500 mb-0.5">Time to build</div>
          <div className="font-semibold text-slate-200">
            {adaptation.implementation_time_months} {adaptation.implementation_time_months === 1 ? 'month' : 'months'}
          </div>
        </div>
      </div>

      {adaptation.cultural_considerations && (
        <div className="flex items-start gap-1.5 text-xs text-slate-400 mb-3">
          <span>🏛️</span>
          <span className="italic">{adaptation.cultural_considerations}</span>
        </div>
      )}

      <button
        onClick={onApply}
        className="w-full bg-green-600 hover:bg-green-500 text-white px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors"
      >
        Build this to protect it
      </button>
    </div>
  )
}