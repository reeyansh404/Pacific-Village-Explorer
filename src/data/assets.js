export const assets = [
  // NAKAWAQA - Coastal houses on west bank land
  {
    id: 'nakawaqa-house-01',
    villageId: 'nakawaqa',
    type: 'house',
    name: 'Vunivalu Family Compound',
    description: 'Home to 8 people across three generations, near the shore',
    coordinates: [-18.159801, 178.439166],
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
    coordinates: [-18.158801, 178.438866],
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
    coordinates: [-18.157501, 178.437366],
    elevationM: 4.2,
    culturalSignificance: 'high',
    states: {
      2026: { status: 'safe', note: 'Stable, well-maintained' },
      2035: { status: 'safe', note: 'Stable' },
      2050: { status: 'safe', note: 'Some cyclone damage' },
      2075: { status: 'at_risk', note: 'Elevation offers protection but increasing risk' }
    }
  },
  {
    id: 'nakawaqa-well-01',
    villageId: 'nakawaqa',
    type: 'water',
    name: 'Main Freshwater Well',
    description: 'Primary water source serving 45 households',
    coordinates: [-18.159101, 178.437566],
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
    coordinates: [-18.158301, 178.439266],
    elevationM: 3.5,
    culturalSignificance: 'medium',
    states: {
      2026: { status: 'safe', note: 'Reliable freshwater' },
      2035: { status: 'safe', note: 'Occasional saltwater during extreme events' },
      2050: { status: 'at_risk', note: 'Regular saline contamination during dry season' },
      2075: { status: 'compromised', note: 'Only usable during wet season' }
    }
  },
  {
    id: 'nakawaqa-farm-01',
    villageId: 'nakawaqa',
    type: 'farm',
    name: 'Community Taro Fields',
    description: 'Traditional taro cultivation feeding 60 people daily',
    coordinates: [-18.159301, 178.439566],
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
    coordinates: [-18.158601, 178.436966],
    elevationM: 3.2,
    culturalSignificance: 'medium',
    states: {
      2026: { status: 'safe', note: 'Healthy grove producing well' },
      2035: { status: 'safe', note: 'Minor cyclone damage risk' },
      2050: { status: 'at_risk', note: 'Frequent cyclone damage, replanting needed' },
      2075: { status: 'compromised', note: 'Partial replanting unable to keep pace' }
    }
  },
  {
    id: 'nakawaqa-sacred-01',
    villageId: 'nakawaqa',
    type: 'sacred',
    name: 'Ancestral Burial Ground',
    description: 'Sacred burial site for 12 generations of village ancestors',
    coordinates: [-18.160101, 178.437666],
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
    coordinates: [-18.158101, 178.437866],
    elevationM: 3.5,
    culturalSignificance: 'critical',
    states: {
      2026: { status: 'safe', note: 'Active use for ceremonies' },
      2035: { status: 'safe', note: 'Structurally sound' },
      2050: { status: 'at_risk', note: 'Cyclone damage requiring frequent repairs' },
      2075: { status: 'compromised', note: 'Repeated damage threatens tradition' }
    }
  },
  {
    id: 'nakawaqa-school-01',
    villageId: 'nakawaqa',
    type: 'school',
    name: 'Muanikau Village School',
    description: 'Primary school serving 45 children from surrounding villages',
    coordinates: [-18.157801, 178.439066],
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
    coordinates: [-18.160801, 178.438466],
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
    coordinates: [-18.159601, 178.437166],
    elevationM: 2.5,
    culturalSignificance: 'medium',
    states: {
      2026: { status: 'safe', note: 'Passable year-round' },
      2035: { status: 'at_risk', note: 'Storm damage requiring repairs' },
      2050: { status: 'compromised', note: 'Impassable during high tides and storms' },
      2075: { status: 'destroyed', note: 'Permanent inland rerouting required' }
    }
  },

  // HOSPITALS / HEALTH
  {
    id: 'nakawaqa-hospital-01',
    villageId: 'nakawaqa',
    type: 'hospital',
    name: 'Muanikau Health Post',
    description: 'Village nursing station serving 300 people plus surrounding settlements',
    coordinates: [-18.157901, 178.438566],
    elevationM: 3.6,
    culturalSignificance: 'high',
    states: {
      2026: { status: 'safe', note: 'Open daily, stocked and staffed' },
      2035: { status: 'at_risk', note: 'Access road floods during king tides, delaying patients' },
      2050: { status: 'compromised', note: 'Regular closures during storms, medicine supply disrupted' },
      2075: { status: 'destroyed', note: 'No longer viable, nearest care is hours inland' }
    }
  },
  {
    id: 'nakawaqa-hospital-02',
    villageId: 'nakawaqa',
    type: 'hospital',
    name: 'Community Pharmacy & First Aid',
    description: 'Small dispensary and emergency first-aid point',
    coordinates: [-18.158201, 178.437766],
    elevationM: 3.4,
    culturalSignificance: 'medium',
    states: {
      2026: { status: 'safe', note: 'Operational' },
      2035: { status: 'safe', note: 'Occasional supply delays' },
      2050: { status: 'at_risk', note: 'Flood damage to storage, medicines spoiling' },
      2075: { status: 'compromised', note: 'Reduced to emergency-only during dry months' }
    }
  },

  // FISHERS / FISHING GROUNDS
  {
    id: 'nakawaqa-fishing-01',
    villageId: 'nakawaqa',
    type: 'fishing',
    name: 'Inshore Fishing Grounds',
    description: 'Shallow reef flats where families fish daily for food and income',
    coordinates: [-18.160501, 178.439066],
    elevationM: -1.0,
    culturalSignificance: 'high',
    states: {
      2026: { status: 'safe', note: 'Healthy catch, feeds 40 families and sells at market' },
      2035: { status: 'at_risk', note: 'Warming water shrinking fish numbers, longer trips needed' },
      2050: { status: 'compromised', note: 'Catch down 50%, young people leaving fishing' },
      2075: { status: 'destroyed', note: 'Reef collapse, traditional fishing no longer sustains families' }
    }
  },
  {
    id: 'nakawaqa-fishing-02',
    villageId: 'nakawaqa',
    type: 'fishing',
    name: 'Boat Landing & Fish Market',
    description: 'Where boats come in and the daily catch is sold and shared',
    coordinates: [-18.160101, 178.438966],
    elevationM: 1.2,
    culturalSignificance: 'high',
    states: {
      2026: { status: 'safe', note: 'Busy landing, active local fish market' },
      2035: { status: 'at_risk', note: 'Higher tides flooding the landing at times' },
      2050: { status: 'compromised', note: 'Landing often underwater, market days cut short' },
      2075: { status: 'destroyed', note: 'Landing lost to the sea, market closed' }
    }
  },

  // FARMERS / FARMLAND
  {
    id: 'nakawaqa-farm-03',
    villageId: 'nakawaqa',
    type: 'farm',
    name: 'Cassava & Vegetable Plots',
    description: 'Household food gardens growing cassava, greens and root crops',
    coordinates: [-18.159301, 178.438966],
    elevationM: 2.9,
    culturalSignificance: 'medium',
    states: {
      2026: { status: 'safe', note: 'Productive gardens, year-round food' },
      2035: { status: 'at_risk', note: 'Salt spray and occasional flooding reducing yields' },
      2050: { status: 'compromised', note: 'Soil salinity cutting harvests, families buying more food' },
      2075: { status: 'destroyed', note: 'Ground too saline to farm, gardens abandoned' }
    }
  },
  {
    id: 'nakawaqa-farm-04',
    villageId: 'nakawaqa',
    type: 'farm',
    name: 'Banana & Breadfruit Grove',
    description: 'Mixed fruit trees for food and small income',
    coordinates: [-18.158601, 178.437366],
    elevationM: 3.3,
    culturalSignificance: 'medium',
    states: {
      2026: { status: 'safe', note: 'Healthy trees, reliable harvest' },
      2035: { status: 'safe', note: 'Cyclone damage risk rising' },
      2050: { status: 'at_risk', note: 'Repeated storm damage, slower recovery' },
      2075: { status: 'compromised', note: 'Frequent losses, replanting cannot keep pace' }
    }
  }
]