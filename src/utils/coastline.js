import { SEA_LEVEL_RISE_METERS } from './statusHelpers'

// Traced from the live map by hand, using the coastline tracer tool — real
// coordinates, not invented offsets.
//
// COAST_NOW: today's waterline, ~420m south of the village.
// COAST_HIGH_WATER: how close the water gets in the worst traced scenario,
// only ~10-120m from the village itself. We treat this as the 2075
// (late-century, SSP2-4.5) reference and blend toward it over time using
// the real sea-level-rise curve, rather than inventing intermediate shapes.
const COAST_NOW = [
  [-18.163081, 178.431530],
  [-18.162734, 178.435736],
  [-18.162571, 178.438418],
  [-18.162673, 178.439448]
]

const COAST_HIGH_WATER = [
  [-18.159921, 178.425694],
  [-18.159309, 178.431616],
  [-18.158901, 178.437753],
  [-18.159024, 178.440971],
  [-18.159268, 178.443418]
]

// Only valid for the village these were traced against (Muanikau/Nakawaqa).
// Other villages fall back to the old relative-offset shape in VillageView.
export const TRACED_COASTLINE_VILLAGE_ID = 'nakawaqa'

// Latitude of a traced curve at a given longitude. Curves are sorted west
// to east. Interpolates between traced points; linearly extrapolates past
// either end using the nearest segment's slope, so both curves can be
// sampled across the same longitude range even though they weren't traced
// to identical endpoints.
function latAtLng(curve, lng) {
  const first = curve[0]
  const last = curve[curve.length - 1]

  if (lng <= first[1]) {
    const [lat1, lng1] = curve[0]
    const [lat2, lng2] = curve[1]
    const slope = (lat2 - lat1) / (lng2 - lng1)
    return lat1 + slope * (lng - lng1)
  }

  if (lng >= last[1]) {
    const [lat1, lng1] = curve[curve.length - 2]
    const [lat2, lng2] = curve[curve.length - 1]
    const slope = (lat2 - lat1) / (lng2 - lng1)
    return lat2 + slope * (lng - lng2)
  }

  for (let i = 0; i < curve.length - 1; i++) {
    const [lat1, lng1] = curve[i]
    const [lat2, lng2] = curve[i + 1]
    if (lng >= lng1 && lng <= lng2) {
      const t = (lng - lng1) / (lng2 - lng1)
      return lat1 + t * (lat2 - lat1)
    }
  }

  return last[0]
}

const SAMPLE_COUNT = 12
const SOUTH_CLOSURE_BUFFER = 0.025 // degrees south, to close the shape off toward open sea
const MAX_YEAR_RISE = SEA_LEVEL_RISE_METERS[2075]

// The waterline for a given year: sampled across COAST_HIGH_WATER's full
// span (the widest trace), blending each sampled point between COAST_NOW
// and COAST_HIGH_WATER by how far this year's real sea-level rise is
// toward the 2075 figure. 2026 sits almost entirely on COAST_NOW; 2075
// lands almost exactly on COAST_HIGH_WATER.
function buildWaterline(year) {
  const fraction = SEA_LEVEL_RISE_METERS[year] / MAX_YEAR_RISE
  const minLng = COAST_HIGH_WATER[0][1]
  const maxLng = COAST_HIGH_WATER[COAST_HIGH_WATER.length - 1][1]

  const points = []
  for (let i = 0; i <= SAMPLE_COUNT; i++) {
    const lng = minLng + (maxLng - minLng) * (i / SAMPLE_COUNT)
    const latNow = latAtLng(COAST_NOW, lng)
    const latHighWater = latAtLng(COAST_HIGH_WATER, lng)
    const lat = latNow + fraction * (latHighWater - latNow)
    points.push([lat, lng])
  }
  return points
}

// Closes the waterline into a fillable polygon by dropping straight down
// (south, toward open sea) from each end — everything south of the
// waterline renders as water.
export function buildTracedFloodPolygon(year) {
  const waterline = buildWaterline(year)
  const west = waterline[0]
  const east = waterline[waterline.length - 1]

  return [
    ...waterline,
    [east[0] - SOUTH_CLOSURE_BUFFER, east[1]],
    [west[0] - SOUTH_CLOSURE_BUFFER, west[1]]
  ]
}