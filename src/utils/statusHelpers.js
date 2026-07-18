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

// Plain-language explanations. Written so a child could understand what
// each status means and why it matters — used in the asset panel and
// anywhere we explain impact to a non-technical audience.
export const STATUS_INFO = {
  safe: {
    emoji: '✅',
    headline: 'All good for now',
    explain: 'The sea and storms are not causing any problems here yet.'
  },
  at_risk: {
    emoji: '⚠️',
    headline: 'Starting to feel it',
    explain: 'The sea is beginning to reach this place sometimes, like during a very high tide or a storm. It still works, but it needs watching.'
  },
  compromised: {
    emoji: '🟧',
    headline: 'Hurting, but still here',
    explain: 'This place is regularly flooded or damaged now. People can still use it sometimes, but it is getting harder and harder.'
  },
  destroyed: {
    emoji: '🚫',
    headline: 'Lost to the sea',
    explain: 'This place can no longer be used. The community has had to stop relying on it or move away from it.'
  }
}

// Emoji icons (used by AssetPanel for the detail view)
export const ASSET_ICONS = {
  house: '🏠',
  water: '💧',
  farm: '🌾',
  sacred: '⚱️',
  school: '🏫',
  reef: '🪸',
  road: '🛤️',
  hospital: '🏥',
  fishing: '🎣'
}

// One-line, plain-language description of why each asset TYPE matters —
// used so a reader with no technical background understands the stakes.
export const ASSET_WHY_IT_MATTERS = {
  house: 'Where a family lives, sleeps, and keeps their belongings safe.',
  water: 'Clean drinking water the community needs every single day.',
  farm: 'Food grown here feeds families and is sold for income.',
  sacred: 'A place that holds the community\u2019s history, ancestors, and beliefs.',
  school: 'Where children learn and grow.',
  reef: 'Home to the fish the community depends on for food.',
  road: 'The path people use to reach help, school, and each other.',
  hospital: 'Where sick or hurt people get medicine and care.',
  fishing: 'Where families catch fish to eat and to sell at market.'
}

// SVG icons (used by map markers)
export const ASSET_SVG = {
  house: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/></svg>',
  water: '<svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1"><path d="M12 2c-4 6-8 10-8 14a8 8 0 0016 0c0-4-4-8-8-14z"/></svg>',
  farm: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22h20"/><path d="M6 22V10l6-4 6 4v12"/><path d="M10 14v-4"/><path d="M14 14v-4"/></svg>',
  sacred: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 6 6 1-4 5 1 6-6-3-6 3 1-6-4-5 6-1z"/></svg>',
  school: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>',
  reef: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V8"/><path d="M8 14c0-4 4-6 4-6s4 2 4 6"/><path d="M4 18c0-3 3-4 4-4"/><path d="M20 18c0-3-3-4-4-4"/></svg>',
  road: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22l4-20h8l4 20"/><path d="M12 6v2"/><path d="M12 12v2"/><path d="M12 18v2"/></svg>',
  hospital: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>',
  fishing: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s5-6 10-6 10 6 10 6-5 6-10 6-10-6-10-6z"/><circle cx="16" cy="12" r="0.5" fill="white"/><path d="M2 12l-1-2M2 12l-1 2"/></svg>'
}

export const ASSET_LABELS = {
  house: 'House',
  water: 'Water Source',
  farm: 'Farm',
  sacred: 'Sacred Site',
  school: 'School',
  reef: 'Reef',
  road: 'Road',
  hospital: 'Health Facility',
  fishing: 'Fishing Ground'
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

// Each asset only has narrative checkpoints for a handful of years
// (typically 2026 / 2035 / 2050 / 2075). The slider has 8 stops
// (2026, 2030, 2035, 2040, 2045, 2050, 2060, 2075). For a year that
// isn't a checkpoint, we hold the most recent checkpoint at or before
// that year — the community doesn't un-flood between checkpoints, so
// this guarantees risk only ever holds steady or increases as the
// slider moves forward. This is what fixes "assets at risk" jumping
// around non-sensically (e.g. 9 at 2035, then 0 at 2040) — previously
// any year without an exact match silently fell back to "safe".
function resolveState(asset, year) {
  const definedYears = Object.keys(asset.states)
    .map(Number)
    .sort((a, b) => a - b)

  let chosenYear = definedYears[0]
  for (const y of definedYears) {
    if (y <= year) chosenYear = y
    else break
  }

  return asset.states[chosenYear] || { status: 'safe', note: '' }
}

export function getAssetStatus(asset, year, appliedAdaptations) {
  if (appliedAdaptations.includes(asset.id)) return 'safe'
  return resolveState(asset, year).status
}

export function getAssetNote(asset, year, appliedAdaptations) {
  if (appliedAdaptations.includes(asset.id)) return 'Protected by community adaptation'
  return resolveState(asset, year).note
}