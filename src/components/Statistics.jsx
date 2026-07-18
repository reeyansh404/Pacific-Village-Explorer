import { getAssetStatus } from '../utils/statusHelpers'

export default function Statistics({ assets, year, appliedAdaptations }) {
  const stats = assets.reduce((acc, asset) => {
    const status = getAssetStatus(asset, year, appliedAdaptations)
    if (status !== 'safe') {
      acc.affectedByType[asset.type] = (acc.affectedByType[asset.type] || 0) + 1
      acc.totalAffected += 1
    }
    return acc
  }, { affectedByType: {}, totalAffected: 0 })

  const totalAssets = assets.length

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Village Impact</h2>
      <p className="text-sm text-slate-400 mb-6">Projections for {year}</p>

      <div className="mb-6">
        <div className="text-4xl font-bold text-red-400">
          {stats.totalAffected} / {totalAssets}
        </div>
        <div className="text-sm text-slate-400">assets affected by climate change</div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">By category</h3>
        <StatRow icon="🏠" label="Houses at risk" count={stats.affectedByType.house || 0} />
        <StatRow icon="💧" label="Water sources compromised" count={stats.affectedByType.water || 0} />
        <StatRow icon="🌾" label="Farms threatened" count={stats.affectedByType.farm || 0} />
        <StatRow icon="⚱️" label="Sacred sites lost" count={stats.affectedByType.sacred || 0} />
        <StatRow icon="🏫" label="Schools affected" count={stats.affectedByType.school || 0} />
        <StatRow icon="🪸" label="Reef degradation" count={stats.affectedByType.reef || 0} />
        <StatRow icon="🛤️" label="Roads damaged" count={stats.affectedByType.road || 0} />
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Legend</h3>
        <div className="space-y-2 text-sm">
          <LegendItem color="#22c55e" label="Safe" />
          <LegendItem color="#eab308" label="At Risk" />
          <LegendItem color="#f97316" label="Compromised" />
          <LegendItem color="#ef4444" label="Destroyed" />
        </div>
      </div>

      <div className="mt-6 text-xs text-slate-500">
        Click any asset on the map to see specific projections and adaptation options.
      </div>
    </div>
  )
}

function StatRow({ icon, label, count }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-slate-300">
        <span className="mr-2">{icon}</span>
        {label}
      </div>
      <div className={`text-lg font-semibold ${count > 0 ? 'text-red-400' : 'text-slate-500'}`}>
        {count}
      </div>
    </div>
  )
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-slate-300">{label}</span>
    </div>
  )
}