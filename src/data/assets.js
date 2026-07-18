export const assets = [
  // NAKAWAQA - Houses
  {
    id: 'nakawaqa-house-01',
    villageId: 'nakawaqa',
    type: 'house',
    name: 'Vunivalu Family Compound',
    description: 'Home to 8 people across three generations, near the coastline',
    coordinates: [-18.1412, 178.4425],
    elevationM: 2.3,
    culturalSignificance: 'medium',
    states: {
      2026: { status: 'safe', note: 'Present day, stable structure' },
      2035: { status: 'safe', note: 'Minor coastal erosion nearby' },
      2050: { status: 'at_risk', note: 'Frequent flooding during king tides' },
      2075: { status: 'destroyed', note: 'Permanently submerged' }
    }
  },
  {
    id: 'nakawaqa-house-02',
    villageId: 'nakawaqa',
    type: 'house',
    name: 'Naidu Family Home',
    description: 'Traditional bure home for family of 6',
    coordinates: [-18.1418, 178.4420],
    elevationM: 3.1,
    culturalSignificance: 'low',
    states: {
      2026: { status: 'safe', note: 'Stable' },
      2035: { status: 'safe', note: 'Minor storm damage risk' },
      2050: { status: 'at_risk', note: 'Cyclone damage frequency doubling' },
      2075: { status: 'compromised', note: 'Major structural damage from repeated cyclones' }
    }
  },
  {
    id: 'nakawaqa-house-03',
    villageId: 'nakawaqa',
    type: 'house',
    name: "Chief's Residence",
    description: 'Traditional home of the village chief, community gathering point',
    coordinates: [-18.1420, 178.4418],
    elevationM: 4.2,
    culturalSignificance: 'high',
    states: {
      2026: { status: 'safe', note: 'Stable, well-maintained' },
      2035: { status: 'safe', note: 'Stable' },
      2050: { status: 'safe', note: 'Some cyclone damage' },
      2075: { status: 'at_risk', note: 'Elevation offers protection but increasing risk' }
    }
  },
  // NAKAWAQA - Water sources
  {
    id: 'nakawaqa-well-01',
    villageId: 'nakawaqa',
    type: 'water',
    name: 'Main Freshwater Well',
    description: 'Primary water source serving 45 households, community gathering site',
    coordinates: [-18.1415, 178.4415],
    elevationM: 3.0,
    culturalSignificance: 'high',
    states: {
      2026: { status: 'safe', note: 'Clean freshwater available year-round' },
      2035: { status: 'at_risk', note: 'Saltwater intrusion detected during king tides' },
      2050: { status: 'compromised', note: 'Undrinkable during 4-month dry season' },
      2075: { status: 'destroyed', note: 'Fully saline, abandoned' }
    }
  },
  {
    id: 'nakawaqa-well-02',
    villageId: 'nakawaqa',
    type: 'water',
    name: 'Secondary Community Well',
    description: 'Backup water source for 20 households',
    coordinates: [-18.1422, 178.4422],
    elevationM: 3.5,
    culturalSignificance: 'medium',
    states: {
      2026: { status: 'safe', note: 'Reliable freshwater' },
      2035: { status: 'safe', note: 'Occasional saltwater during extreme events' },
      2050: { status: 'at_risk', note: 'Regular saline contamination during dry season' },
      2075: { status: 'compromised', note: 'Only usable during wet season' }
    }
  },
  // NAKAWAQA - Farms
  {
    id: 'nakawaqa-farm-01',
    villageId: 'nakawaqa',
    type: 'farm',
    name: 'Community Taro Fields',
    description: 'Traditional taro cultivation feeding 60 people daily',
    coordinates: [-18.1425, 178.4415],
    elevationM: 2.8,
    culturalSignificance: 'high',
    states: {
      2026: { status: 'safe', note: 'Productive taro cultivation' },
      2035: { status: 'at_risk', note: 'Salt intrusion affecting yield in dry months' },
      2050: { status: 'compromised', note: 'Yield reduced 40% due to salinity' },
      2075: { status: 'destroyed', note: 'No longer viable for traditional crops' }
    }
  },
  {
    id: 'nakawaqa-farm-02',
    villageId: 'nakawaqa',
    type: 'farm',
    name: 'Coconut Grove',
    description: 'Community coconut palms for food, oil, and income',
    coordinates: [-18.1430, 178.4420],
    elevationM: 3.2,
    culturalSignificance: 'medium',
    states: {
      2026: { status: 'safe', note: 'Healthy grove producing well' },
      2035: { status: 'safe', note: 'Minor cyclone damage risk' },
      2050: { status: 'at_risk', note: 'Frequent cyclone damage, replanting needed' },
      2075: { status: 'compromised', note: 'Partial replanting unable to keep pace' }
    }
  },
  // NAKAWAQA - Sacred sites
  {
    id: 'nakawaqa-sacred-01',
    villageId: 'nakawaqa',
    type: 'sacred',
    name: 'Ancestral Burial Ground',
    description: 'Sacred burial site for 12 generations of village ancestors',
    coordinates: [-18.1410, 178.4428],
    elevationM: 1.8,
    culturalSignificance: 'critical',
    states: {
      2026: { status: 'safe', note: 'Preserved and maintained' },
      2035: { status: 'at_risk', note: 'Occasional flooding during storm surge' },
      2050: { status: 'compromised', note: 'Regular inundation, graves being lost' },
      2075: { status: 'destroyed', note: 'Permanently submerged, ancestral memory at risk' }
    }
  },
  {
    id: 'nakawaqa-sacred-02',
    villageId: 'nakawaqa',
    type: 'sacred',
    name: 'Community Meeting House (Bure Kalou)',
    description: 'Traditional spiritual and ceremonial gathering place',
    coordinates: [-18.1418, 178.4423],
    elevationM: 3.5,
    culturalSignificance: 'critical',
    states: {
      2026: { status: 'safe', note: 'Active use for ceremonies' },
      2035: { status: 'safe', note: 'Structurally sound' },
      2050: { status: 'at_risk', note: 'Cyclone damage requiring frequent repairs' },
      2075: { status: 'compromised', note: 'Repeated damage threatens tradition' }
    }
  },
  // NAKAWAQA - Community infrastructure
  {
    id: 'nakawaqa-school-01',
    villageId: 'nakawaqa',
    type: 'school',
    name: 'Nakawaqa Village School',
    description: 'Primary school serving 45 children from surrounding villages',
    coordinates: [-18.1416, 178.4412],
    elevationM: 3.8,
    culturalSignificance: 'high',
    states: {
      2026: { status: 'safe', note: 'Fully operational' },
      2035: { status: 'safe', note: 'Storm shelter capacity concerns' },
      2050: { status: 'at_risk', note: 'Frequent closure during extreme weather' },
      2075: { status: 'compromised', note: 'Consolidation with inland school needed' }
    }
  },
  {
    id: 'nakawaqa-reef-01',
    villageId: 'nakawaqa',
    type: 'reef',
    name: 'Community Fishing Reef',
    description: 'Traditional fishing grounds supporting food security',
    coordinates: [-18.1408, 178.4435],
    elevationM: -2.0,
    culturalSignificance: 'high',
    states: {
      2026: { status: 'at_risk', note: 'Early bleaching signs observed' },
      2035: { status: 'compromised', note: 'Significant bleaching, fish stocks declining' },
      2050: { status: 'destroyed', note: 'Reef ecosystem collapse, fishing unsustainable' },
      2075: { status: 'destroyed', note: 'Dead reef structure only' }
    }
  },
  {
    id: 'nakawaqa-road-01',
    villageId: 'nakawaqa',
    type: 'road',
    name: 'Coastal Access Road',
    description: 'Main access road connecting village to district centre',
    coordinates: [-18.1413, 178.4419],
    elevationM: 2.5,
    culturalSignificance: 'medium',
    states: {
      2026: { status: 'safe', note: 'Passable year-round' },
      2035: { status: 'at_risk', note: 'Storm damage requiring repairs' },
      2050: { status: 'compromised', note: 'Impassable during high tides and storms' },
      2075: { status: 'destroyed', note: 'Permanent inland rerouting required' }
    }
  }
]