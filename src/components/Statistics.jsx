import { Home, Droplet, Wheat, Landmark, GraduationCap, Fish, Route, Hospital, Anchor, X } from 'lucide-react'
import { getAssetStatus } from '../utils/statusHelpers'

const CATEGORY_CONFIG = {
  house: { icon: Home, label: 'Homes' },
  water: { icon: Droplet, label: 'Water sources' },
  farm: { icon: Wheat, label: 'Farms' },
  sacred: { icon: Landmark, label: 'Sacred sites' },
  school: { icon: GraduationCap, label: 'Schools' },
  reef: { icon: Fish, label: 'Reefs' },
  road: { icon: Route, label: 'Roads' },
  hospital: { icon: Hospital, label: 'Health posts' },
  fishing: { icon: Anchor, label: 'Fishing grounds' }
}

export default function Statistics({ assets, year, appliedAdaptations, filterType, onFilterChange }) {
  const stats = assets.reduce((acc, asset) => {
    const status = getAssetStatus(asset, year, appliedAdaptations)
    if (status !== 'safe') {
      acc.affectedByType[asset.type] = (acc.affectedByType[asset.type] || 0) + 1
      acc.totalAffected += 1
    }
    acc.totalByType[asset.type] = (acc.totalByType[asset.type] || 0) + 1
    return acc
  }, { affectedByType: {}, totalByType: {}, totalAffected: 0 })

  const totalAssets = assets.length
  const isYearBad = stats.totalAffected > 0

  return (
    <div className="p-5">
      <div className="mb-4">
        <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Projected impact</div>
        <div className="flex items-baseline gap-2">
          <div className="text-5xl font-bold text-red-400">{stats.totalAffected}</div>
          <div className="text-lg text-slate-500">of {totalAssets}</div>
        </div>
        <div className="text-sm text-slate-400 mt-1">places affected by {year}</div>
      </div>

      {/* Plain-language summary so the number isn't just an abstract stat */}
      <div className="mb-5 p-3 bg-slate-800 rounded-lg text-sm text-slate-300 leading-relaxed">
        {isYearBad ? (
          <>By <span className="font-semibold text-white">{year}</span>, <span className="font-semibold text-red-400">{stats.totalAffected} out of {totalAssets}</span> important places in this village are being hurt by rising seas and stronger storms — things like flooded homes, salty wells, or damaged farms.</>
        ) : (
          <>In <span className="font-semibold text-white">{year}</span>, everything in this village is still safe from rising seas and storms.</>
        )}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs text-slate-500 uppercase tracking-wide">Filter by category</div>
        {filterType && (
          <button
            onClick={() => onFilterChange(null)}
            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      <div className="space-y-1.5">
        {Object.entries(CATEGORY_CONFIG).map(([type, config]) => {
          const affected = stats.affectedByType[type] || 0
          const total = stats.totalByType[type] || 0
          const Icon = config.icon
          const isActive = filterType === type
          const hasData = total > 0

          if (!hasData) return null

          return (
            <button
              key={type}
              onClick={() => onFilterChange(isActive ? null : type)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 hover:bg-blue-500' 
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${affected > 0 ? 'text-slate-200' : 'text-slate-500'}`} />
                <div className={`text-sm font-medium ${affected > 0 ? 'text-white' : 'text-slate-400'}`}>
                  {config.label}
                </div>
              </div>
              <div className={`text-sm font-semibold ${
                affected > 0 
                  ? (isActive ? 'text-white' : 'text-red-400') 
                  : 'text-slate-500'
              }`}>
                {affected}/{total}
              </div>
            </button>
          )
        })}
      </div>

      {filterType && (
        <div className="mt-4 p-3 bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg text-xs text-blue-300">
          Showing only {CATEGORY_CONFIG[filterType].label.toLowerCase()} on the map. Click the category again, or "Clear" above, to see everything.
        </div>
      )}

      <div className="mt-6 text-xs text-slate-500 leading-relaxed">
        Click any place on the map to see what's happening there and what the village can do about it.
      </div>
    </div>
  )
}