import { SEA_LEVEL_RISE_METERS } from './statusHelpers'

// Full closed-loop coastline traces, hand-traced from the live map for 5
// real years. Each loop is the actual flood-zone outline for that year —
// an "outer" edge (further from the village) and an "inner" edge (the
// waterline itself, closer to the village) — traced directly, not
// invented. For the 3 slider years without a direct trace (2040, 2045,
// 2060) we interpolate between whichever two real traces bracket them,
// weighted by the real sea-level-rise curve.
const TRACED_LOOPS = {
  2026: [
    [-18.162816, 178.431101], [-18.163101, 178.431487], [-18.163428, 178.433075],
    [-18.163754, 178.433847], [-18.164080, 178.434577], [-18.164080, 178.435092],
    [-18.163958, 178.436122], [-18.163795, 178.437109], [-18.163142, 178.438826],
    [-18.162367, 178.440070], [-18.162204, 178.439126], [-18.162286, 178.437366],
    [-18.162490, 178.435564], [-18.162612, 178.433590], [-18.162816, 178.431401]
  ],
  2030: [
    [-18.162530, 178.430543], [-18.162245, 178.432474], [-18.162327, 178.434362],
    [-18.162041, 178.436337], [-18.162123, 178.438225], [-18.162204, 178.439727],
    [-18.162163, 178.439941], [-18.163305, 178.438697], [-18.163713, 178.436594],
    [-18.163917, 178.436122], [-18.164080, 178.434620], [-18.163998, 178.433762],
    [-18.163672, 178.433247], [-18.163305, 178.432088], [-18.162530, 178.430457]
  ],
  2035: [
    [-18.162286, 178.429899], [-18.162163, 178.431530], [-18.161715, 178.434062],
    [-18.161715, 178.435349], [-18.161633, 178.437624], [-18.161796, 178.440542],
    [-18.162775, 178.439641], [-18.163061, 178.438783], [-18.163509, 178.438010],
    [-18.163917, 178.435564], [-18.163917, 178.433762], [-18.163468, 178.432560],
    [-18.162897, 178.430500], [-18.162327, 178.429813]
  ],
  2050: [
    [-18.161470, 178.428440], [-18.161062, 178.433075], [-18.160736, 178.435564],
    [-18.160818, 178.440285], [-18.160981, 178.441272], [-18.162449, 178.439813],
    [-18.163917, 178.436165], [-18.163795, 178.434620], [-18.162816, 178.430800],
    [-18.161756, 178.429041], [-18.161593, 178.428140]
  ],
  2075: [
    [-18.159961, 178.425651], [-18.159391, 178.430071], [-18.158779, 178.435521],
    [-18.159227, 178.443332], [-18.159635, 178.443031], [-18.160247, 178.441744],
    [-18.161266, 178.440886], [-18.162245, 178.439641], [-18.162897, 178.438010],
    [-18.163917, 178.436680], [-18.163998, 178.434834], [-18.163183, 178.432174],
    [-18.162245, 178.430328], [-18.160818, 178.428140], [-18.160410, 178.427024],
    [-18.159921, 178.425565]
  ]
}

// Only valid for the village these were traced against (Muanikau/Nakawaqa).
// Other villages fall back to the old relative-offset shape in VillageView.
export const TRACED_COASTLINE_VILLAGE_ID = 'nakawaqa'

// Splits a closed hand-traced loop into its two edges, each running west
// to east: the "outer" edge (further south, away from the village) and
// the "inner" edge (the actual waterline, closer to the village). Works
// regardless of which direction the loop was traced in — some of these
// were clicked clockwise, some counter-clockwise — by finding the
// westmost/eastmost points as the two turning points, then classifying
// each resulting arc by its average latitude (further south = more
// negative = outer).
function splitLoop(loop) {
  let westIdx = 0
  let eastIdx = 0
  loop.forEach((p, i) => {
    if (p[1] < loop[westIdx][1]) westIdx = i
    if (p[1] > loop[eastIdx][1]) eastIdx = i
  })

  const n = loop.length
  const arc = (from, to) => {
    const out = []
    let i = from
    while (true) {
      out.push(loop[i])
      if (i === to) break
      i = (i + 1) % n
    }
    return out
  }

  const arcA = arc(westIdx, eastIdx)
  const arcB = arc(eastIdx, westIdx).reverse()
  const avgLat = arr => arr.reduce((sum, p) => sum + p[0], 0) / arr.length

  return avgLat(arcA) < avgLat(arcB)
    ? { outer: arcA, inner: arcB }
    : { outer: arcB, inner: arcA }
}

const TRACED_EDGES = Object.fromEntries(
  Object.entries(TRACED_LOOPS).map(([year, loop]) => [Number(year), splitLoop(loop)])
)

// Latitude of a curve at a given longitude. Interpolates between traced
// points; clamps (holds flat) past either end rather than extrapolating a
// slope, since a slope extrapolation once overshot past a real traced
// value in an earlier version of this file.
function latAtLng(curve, lng) {
  const first = curve[0]
  const last = curve[curve.length - 1]

  if (lng <= first[1]) return first[0]
  if (lng >= last[1]) return last[0]

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

const TRACED_YEARS = [2026, 2030, 2035, 2050, 2075]
const SAMPLE_COUNT = 20

// Sample across the widest traced curve (2075) so the shape doesn't get
// clipped to a narrower year's range.
const DOMAIN_CURVE = TRACED_EDGES[2075].inner
const MIN_LNG = DOMAIN_CURVE[0][1]
const MAX_LNG = DOMAIN_CURVE[DOMAIN_CURVE.length - 1][1]

// Finds the two traced years bracketing a given slider year. Returns the
// same year twice if it was traced directly.
function bracketingYears(year) {
  if (TRACED_YEARS.includes(year)) return [year, year]
  for (let i = 0; i < TRACED_YEARS.length - 1; i++) {
    if (year > TRACED_YEARS[i] && year < TRACED_YEARS[i + 1]) {
      return [TRACED_YEARS[i], TRACED_YEARS[i + 1]]
    }
  }
  // Outside the traced range entirely — shouldn't happen given the slider's
  // years, but fall back to the nearest real trace rather than throwing.
  return year < TRACED_YEARS[0]
    ? [TRACED_YEARS[0], TRACED_YEARS[0]]
    : [TRACED_YEARS[TRACED_YEARS.length - 1], TRACED_YEARS[TRACED_YEARS.length - 1]]
}

// The outer/inner latitude at a given longitude, for any slider year —
// read directly off a real trace if one exists for that year, otherwise
// interpolated between the two nearest real traces using the actual
// sea-level-rise curve as the blend weight (not calendar time), since sea
// level doesn't rise linearly with years.
function edgeAt(year, lng) {
  const [lowerYear, upperYear] = bracketingYears(year)

  if (lowerYear === upperYear) {
    return {
      outer: latAtLng(TRACED_EDGES[lowerYear].outer, lng),
      inner: latAtLng(TRACED_EDGES[lowerYear].inner, lng)
    }
  }

  const fraction =
    (SEA_LEVEL_RISE_METERS[year] - SEA_LEVEL_RISE_METERS[lowerYear]) /
    (SEA_LEVEL_RISE_METERS[upperYear] - SEA_LEVEL_RISE_METERS[lowerYear])

  const outerLo = latAtLng(TRACED_EDGES[lowerYear].outer, lng)
  const outerHi = latAtLng(TRACED_EDGES[upperYear].outer, lng)
  const innerLo = latAtLng(TRACED_EDGES[lowerYear].inner, lng)
  const innerHi = latAtLng(TRACED_EDGES[upperYear].inner, lng)

  return {
    outer: outerLo + fraction * (outerHi - outerLo),
    inner: innerLo + fraction * (innerHi - innerLo)
  }
}

// Builds the flood polygon for a given slider year: the waterline (inner
// edge, west to east) closing back along the outer edge (east to west) —
// shading the strip between them, not the open ocean beyond.
export function buildTracedFloodPolygon(year) {
  const outerPoints = []
  const innerPoints = []

  for (let i = 0; i <= SAMPLE_COUNT; i++) {
    const lng = MIN_LNG + (MAX_LNG - MIN_LNG) * (i / SAMPLE_COUNT)
    const { outer, inner } = edgeAt(year, lng)
    outerPoints.push([outer, lng])
    innerPoints.push([inner, lng])
  }

  return [...innerPoints, ...outerPoints.slice().reverse()]
}

// The slider's own year steps, in order. Needed to find "the previous
// step" for a given year, which is a distinct question from "the nearest
// real trace" (bracketingYears) above.
const SLIDER_YEARS = [2026, 2030, 2035, 2040, 2045, 2050, 2060, 2075]

function previousSliderYear(year) {
  const idx = SLIDER_YEARS.indexOf(year)
  if (idx <= 0) return year // first year (or unrecognised) — nothing "new" to show yet
  return SLIDER_YEARS[idx - 1]
}

// Builds two polygons instead of one, so the map can show "water that was
// already here" separately from "water that just arrived this step":
//
// - established: the bulk of the flood zone, from the outer (seaward) edge
//   up to where the water already reached as of the previous slider step.
// - newlyFlooded: the thin leading edge between the previous step's
//   waterline and this year's waterline — the strip that just went under.
//
// At the first slider year there's no previous step to compare against,
// so newlyFlooded comes back empty and established is the whole zone.
export function buildTracedFloodBands(year) {
  const prevYear = previousSliderYear(year)

  const outerPoints = []
  const prevInnerPoints = []
  const innerPoints = []

  for (let i = 0; i <= SAMPLE_COUNT; i++) {
    const lng = MIN_LNG + (MAX_LNG - MIN_LNG) * (i / SAMPLE_COUNT)
    const { outer } = edgeAt(year, lng)
    const { inner: prevInner } = edgeAt(prevYear, lng)
    const { inner } = edgeAt(year, lng)
    outerPoints.push([outer, lng])
    prevInnerPoints.push([prevInner, lng])
    innerPoints.push([inner, lng])
  }

  const established = [...prevInnerPoints, ...outerPoints.slice().reverse()]
  const newlyFlooded = prevYear === year
    ? []
    : [...innerPoints, ...prevInnerPoints.slice().reverse()]

  return { established, newlyFlooded }
}