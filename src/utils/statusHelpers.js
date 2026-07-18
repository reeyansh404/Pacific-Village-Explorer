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

// Emoji icons (used by AssetPanel for the detail view)
export const ASSET_ICONS = {
  house: '🏠',
  water: '💧',
  farm: '🌾',
  sacred: '⚱️',
  school: '🏫',
  reef: '🪸',
  road: '🛤️'
}

// SVG icons (used by map markers)
export const ASSET_SVG = {
  house: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/></svg>',
  water: '<svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1"><path d="M12 2c-4 6-8 10-8 14a8 8 0 0016 0c0-4-4-8-8-14z"/></svg>',
  farm: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22h20"/><path d="M6 22V10l6-4 6 4v12"/><path d="M10 14v-4"/><path d="M14 14v-4"/></svg>',
  sacred: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 6 6 1-4 5 1 6-6-3-6 3 1-6-4-5 6-1z"/></svg>',
  school: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>',
  reef: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V8"/><path d="M8 14c0-4 4-6 4-6s4 2 4 6"/><path d="M4 18c0-3 3-4 4-4"/><path d="M20 18c0-3-3-4-4-4"/></svg>',
  road: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22l4-20h8l4 20"/><path d="M12 6v2"/><path d="M12 12v2"/><path d="M12 18v2"/></svg>'
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

export function getAssetStatus(asset, year, appliedAdaptations) {
  if (appliedAdaptations.includes(asset.id)) return 'safe'
  return asset.states[year]?.status || 'safe'
}

export function getAssetNote(asset, year, appliedAdaptations) {
  if (appliedAdaptations.includes(asset.id)) return 'Protected by community adaptation'
  return asset.states[year]?.note || ''
}