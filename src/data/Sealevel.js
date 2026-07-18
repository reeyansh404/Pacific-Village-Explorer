// PATH: src/data/seaLevel.js  (NEW FILE)
//
// Sea-level rise for Nakawaqa, Fiji.
// Source: IPCC AR6 SSP2-4.5 (moderate emissions) via the NASA Sea Level
// Projection Tool at grid point lat -19 lon 178, adjacent to Nakawaqa.
// Reported in IMF Selected Issues Paper 2025/085 "Climate Change and Sea
// Level Rise: Fiji" (end-century rise ~0.60 m relative to 2000).
// Values below are metres of rise relative to the year-2000 level.
// 2050 and 2100 are anchored to the source; 2026/2035/2075 are interpolated
// along the SSP2-4.5 curve between those anchors.
export const SEA_LEVEL = {
  2026: 0.11,
  2035: 0.17,
  2050: 0.27,
  2075: 0.44,
};

// The average sea rising 0.27 m does not flood a 3 m village. The damage comes
// from king tides + storm surge sitting ON TOP of the raised baseline, and this
// worst-day reach grows as cyclones intensify. This surge allowance is our
// transparent model (a decision aid), not measured data. Tune here to make the
// timeline land: 2026 mostly safe, 2050 real damage, 2075 severe.
export const SURGE = {
  2026: 1.35,
  2035: 1.55,
  2050: 1.95,
  2075: 2.55,
};

// the worst-day water reach for a given year (sea baseline + surge)
export function floodReach(year) {
  const sea = SEA_LEVEL[year] ?? 0;
  const surge = SURGE[year] ?? 0;
  return sea + surge;
}