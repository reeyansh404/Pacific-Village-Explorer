export const STATUS_COLORS = {
  safe: '#22c55e',
  at_risk: '#eab308',
  compromised: '#f97316',
  destroyed: '#ef4444'
}

export const STATUS_LABELS = {
  safe: 'Safe',
  at_risk: 'At Risk',
  compromised: 'Compromised',
  destroyed: 'Destroyed'
}

export const ASSET_ICONS = {
  house: '🏠',
  water: '💧',
  farm: '🌾',
  sacred: '⚱️',
  school: '🏫',
  reef: '🪸',
  road: '🛤️'
}

export const ASSET_LABELS = {
  house: 'House',
  water: 'Water Source',
  farm: 'Farm',
  sacred: 'Sacred Site',
  school: 'School',
  reef: 'Reef',
  road: 'Road'
}

// Sea level rise projections in meters (IPCC AR6 SSP2-4.5 for Pacific region)
export const SEA_LEVEL_RISE_METERS = {
  2026: 0.05,
  2030: 0.09,
  2035: 0.15,
  2040: 0.20,
  2045: 0.24,
  2050: 0.28,
  2060: 0.38,
  2075: 0.55
}

// Pacific region bounding box
export const PACIFIC_BOUNDS = [
  [-45, 130],  // Southwest corner
  [25, -140]   // Northeast corner (crosses date line)
]

export function getAssetStatus(asset, year, appliedAdaptations) {
  if (appliedAdaptations.includes(asset.id)) return 'safe'
  return asset.states[year]?.status || 'safe'
}

export function getAssetNote(asset, year, appliedAdaptations) {
  if (appliedAdaptations.includes(asset.id)) return 'Protected by community adaptation'
  return asset.states[year]?.note || ''
}