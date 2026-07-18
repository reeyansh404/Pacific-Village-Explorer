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

export function getAssetStatus(asset, year, appliedAdaptations) {
  if (appliedAdaptations.includes(asset.id)) return 'safe'
  return asset.states[year]?.status || 'safe'
}

export function getAssetNote(asset, year, appliedAdaptations) {
  if (appliedAdaptations.includes(asset.id)) return 'Protected by community adaptation'
  return asset.states[year]?.note || ''
}