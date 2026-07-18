import { useState } from 'react'
import { Waves, Search, ChevronDown, ChevronUp, Languages } from 'lucide-react'
import largeImg from '../assets/mapImages/large-2.png'
import map1 from '../assets/mapImages/1.png'
import map2 from '../assets/mapImages/2.png'
import map3 from '../assets/mapImages/3.png'
import map4 from '../assets/mapImages/4.png'
import map5 from '../assets/mapImages/5.png'
import map6 from '../assets/mapImages/6.png'
import map7 from '../assets/mapImages/7.png'
import map8 from '../assets/mapImages/8.png'
import overlay0 from '../assets/mapImages/Overlay-0.png'
import overlay1 from '../assets/mapImages/Overlay-1.png'
import overlay2 from '../assets/mapImages/Overlay-2.png'
import overlay3 from '../assets/mapImages/Overlay-3.png'
import overlay4 from '../assets/mapImages/Overlay-4.png'
import overlay5 from '../assets/mapImages/Overlay-5.png'

const MAP_IMAGES = [map1, map2, map3, map4, map5, map6, map7, map8]
const OVERLAY_IMAGES = [overlay1, overlay2, overlay3, overlay4, overlay5]
const YEARS = [2026, 2035, 2045, 2055, 2065, 2075, 2085, 2100]

const ADAPTATION_DETAILS = {
  2: [ // Mangrove Planting
    {
      name: 'Mangrove Restoration Program',
      description: 'Community-led mangrove planting and coastal protection',
      cost_estimate_usd: 4000,
      community_effort: 'high',
      effectiveness: 'high',
      implementation_time_months: 12,
      benefits: 'Prevents coastal erosion, provides storm surge protection, creates fish nursery habitat'
    },
    {
      name: 'Traditional Stone-Mangrove Barrier',
      description: 'Hybrid traditional stone wall integrated with mangrove restoration',
      cost_estimate_usd: 6000,
      community_effort: 'high',
      effectiveness: 'high',
      implementation_time_months: 8,
      benefits: 'Immediate protection while mangroves establish, culturally appropriate design'
    }
  ],
  3: [ // Deep-Rooted Plants (Vetiver)
    {
      name: 'Vetiver Grass Soil Stabilization',
      description: 'Plant deep-rooted vetiver grass on slopes and erosion-prone areas',
      cost_estimate_usd: 800,
      community_effort: 'medium',
      effectiveness: 'high',
      implementation_time_months: 4,
      benefits: 'Prevents landslides, stabilizes slopes, improves water retention, low maintenance'
    },
    {
      name: 'Multi-Layer Vegetation System',
      description: 'Combine vetiver with native shrubs and trees for comprehensive stabilization',
      cost_estimate_usd: 1500,
      community_effort: 'high',
      effectiveness: 'high',
      implementation_time_months: 6,
      benefits: 'Maximum soil stability, biodiversity enhancement, long-term resilience'
    }
  ],
  4: [ // Stilted Foundations
    {
      name: 'Stilted Foundation Rebuild',
      description: 'Elevate structure on hardwood stilts 2m above ground level',
      cost_estimate_usd: 4500,
      community_effort: 'high',
      effectiveness: 'high',
      implementation_time_months: 4,
      benefits: 'Traditional bure design preserved with modern flood-resistant foundation'
    },
    {
      name: 'Cyclone-Resistant Reinforcement',
      description: 'Add hurricane straps, storm shutters, and reinforced roof structure',
      cost_estimate_usd: 2000,
      community_effort: 'medium',
      effectiveness: 'medium',
      implementation_time_months: 2,
      benefits: 'Protects from wind damage, reduces repair costs, extends building lifespan'
    },
    {
      name: 'Managed Relocation Support',
      description: 'Gradual family relocation to higher-ground community land',
      cost_estimate_usd: 12000,
      community_effort: 'high',
      effectiveness: 'high',
      implementation_time_months: 18,
      benefits: 'Permanent safety from flooding, maintains community bonds, preserves cultural sites'
    }
  ]
}

// Additional adaptation recommendations without map overlays
const OTHER_ADAPTATIONS = [
  {
    category: 'Water Security',
    icon: '💧',
    methods: [
      {
        name: 'Rainwater Harvesting System',
        description: 'Install rooftop rainwater collection with 5000L community storage tanks',
        cost_estimate_usd: 1500,
        community_effort: 'medium',
        effectiveness: 'high',
        implementation_time_months: 3,
        benefits: 'Traditional well preserved as ceremonial site while modern collection provides drinking water'
      },
      {
        name: 'Elevated Well with Salt Barrier',
        description: 'Raise well opening 1.5m above ground with clay-lined salt barrier',
        cost_estimate_usd: 3000,
        community_effort: 'high',
        effectiveness: 'medium',
        implementation_time_months: 4,
        benefits: 'Community elders lead the traditional blessing before construction begins'
      },
      {
        name: 'Community Water Filtration',
        description: 'Solar-powered desalination unit for 45 households',
        cost_estimate_usd: 8000,
        community_effort: 'low',
        effectiveness: 'high',
        implementation_time_months: 6,
        benefits: 'Two villagers trained as maintainers, ensuring skills stay in community'
      }
    ]
  },
  {
    category: 'Agricultural Adaptation',
    icon: '🌾',
    methods: [
      {
        name: 'Salt-Tolerant Crop Varieties',
        description: 'Transition to salt-tolerant taro cultivars and traditional root crops',
        cost_estimate_usd: 800,
        community_effort: 'low',
        effectiveness: 'high',
        implementation_time_months: 6,
        benefits: 'Traditional planting practices preserved with new cultivar varieties'
      },
      {
        name: 'Raised Bed Farming System',
        description: 'Construct raised planting beds with drainage above flood level',
        cost_estimate_usd: 2500,
        community_effort: 'high',
        effectiveness: 'medium',
        implementation_time_months: 4,
        benefits: 'Community farming traditions maintained with new bed design'
      },
      {
        name: 'Aquaculture Transition',
        description: 'Convert flooded areas to fish farming ponds for food security',
        cost_estimate_usd: 5000,
        community_effort: 'medium',
        effectiveness: 'high',
        implementation_time_months: 8,
        benefits: 'Elder fishermen lead training in sustainable aquaculture practices'
      }
    ]
  },
  {
    category: 'Cultural Heritage',
    icon: '🏛️',
    methods: [
      {
        name: 'Digital Cultural Preservation',
        description: 'Document sacred sites with 3D scanning and oral history recording',
        cost_estimate_usd: 3000,
        community_effort: 'medium',
        effectiveness: 'high',
        implementation_time_months: 4,
        benefits: 'Elders lead the recording process ensuring cultural knowledge is preserved authentically'
      },
      {
        name: 'Protective Sea Wall',
        description: 'Traditional stone-and-mangrove barrier protecting sacred boundary',
        cost_estimate_usd: 6000,
        community_effort: 'high',
        effectiveness: 'medium',
        implementation_time_months: 8,
        benefits: 'Traditional Fijian stone-fitting techniques used, blessed by chief before construction'
      },
      {
        name: 'Managed Ceremonial Relocation',
        description: 'Community ceremony to establish new sacred site with continuous cultural connection',
        cost_estimate_usd: 4000,
        community_effort: 'high',
        effectiveness: 'high',
        implementation_time_months: 12,
        benefits: 'Full traditional protocol observed, elders and chief lead relocation ceremony'
      }
    ]
  },
  {
    category: 'Education & Community',
    icon: '🏫',
    methods: [
      {
        name: 'Storm-Shelter Upgrade',
        description: 'Reinforce school as community cyclone shelter with backup power',
        cost_estimate_usd: 5000,
        community_effort: 'medium',
        effectiveness: 'high',
        implementation_time_months: 6,
        benefits: 'Dual function preserves community gathering role of school'
      },
      {
        name: 'Elevated Classroom Extension',
        description: 'Add raised classroom block above flood level for continued education',
        cost_estimate_usd: 8000,
        community_effort: 'medium',
        effectiveness: 'high',
        implementation_time_months: 8,
        benefits: 'Local materials and craftsmanship prioritized in construction'
      },
      {
        name: 'Distance Learning Infrastructure',
        description: 'Solar-powered connectivity for online classes during closures',
        cost_estimate_usd: 3500,
        community_effort: 'low',
        effectiveness: 'medium',
        implementation_time_months: 3,
        benefits: 'Local teacher training ensures technology serves village needs'
      }
    ]
  },
  {
    category: 'Marine Resources',
    icon: '🐠',
    methods: [
      {
        name: 'Coral Restoration Program',
        description: 'Community-led coral fragment nursery and replanting initiative',
        cost_estimate_usd: 4000,
        community_effort: 'high',
        effectiveness: 'medium',
        implementation_time_months: 12,
        benefits: 'Traditional fishing knowledge combined with modern restoration techniques'
      },
      {
        name: 'Alternative Fishing Grounds',
        description: 'Community-managed marine protected area with rotational fishing zones',
        cost_estimate_usd: 1500,
        community_effort: 'medium',
        effectiveness: 'medium',
        implementation_time_months: 6,
        benefits: 'Traditional taboo (tabu) practices formalized for sustainable management'
      },
      {
        name: 'Aquaculture Development',
        description: 'Establish sustainable aquaculture for continued food security',
        cost_estimate_usd: 6000,
        community_effort: 'medium',
        effectiveness: 'high',
        implementation_time_months: 10,
        benefits: 'Elder fishermen guide species selection and cultural practices'
      }
    ]
  },
  {
    category: 'Infrastructure & Access',
    icon: '🛤️',
    methods: [
      {
        name: 'Elevated Road Reconstruction',
        description: 'Raise road bed 1m with improved drainage culverts',
        cost_estimate_usd: 7000,
        community_effort: 'medium',
        effectiveness: 'high',
        implementation_time_months: 6,
        benefits: 'Community labor prioritized, road path preserves cultural landmarks'
      },
      {
        name: 'Alternative Inland Route',
        description: 'New access route via higher-ground path connecting to district road',
        cost_estimate_usd: 5000,
        community_effort: 'high',
        effectiveness: 'medium',
        implementation_time_months: 8,
        benefits: 'Route negotiated through community land with elder consultation'
      }
    ]
  }
]

// Languages for Pacific islands
const LANGUAGES = [
  { code: 'en', native: 'English', flag: '🇬🇧' },
  { code: 'fj', native: 'Na Vosa Vakaviti', flag: '🇫🇯' },
  { code: 'sm', native: 'Gagana Samoa', flag: '🇼🇸' },
  { code: 'to', native: 'Lea Fakatonga', flag: '🇹🇴' },
  { code: 'tvl', native: 'Te Ggana Tuvalu', flag: '🇹🇻' },
  { code: 'gil', native: 'Taetae ni Kiribati', flag: '🇰🇮' },
  { code: 'bi', native: 'Bislama', flag: '🇻🇺' },
  { code: 'haw', native: 'ʻŌlelo Hawaiʻi', flag: '🇺🇸' },
]

const OVERLAY_SECTIONS = {
  development: {
    title: 'Future Development',
    description: 'Areas designated for new infrastructure and land use',
    overlays: [
      { name: 'Housing Development', description: 'Recommended safe zones for new housing construction' },
      { name: 'Farmland Allocation', description: 'Areas suitable for agricultural development and food security' },
    ]
  },
  adaptation: {
    title: 'Adaptation Methods',
    description: 'Climate resilience strategies for existing infrastructure',
    overlays: [
      { name: 'Mangrove Planting', description: 'Coastal mangrove restoration to prevent erosion and storm surge' },
      { name: 'Deep-Rooted Plants', description: 'Vetiver grass and soil stabilization zones' },
      { name: 'Stilted Foundations', description: 'Houses requiring elevation to avoid flood risk' },
    ]
  }
}

export default function Homepage({ onSelectVillage }) {
  const [hasSearched, setHasSearched] = useState(false)
  const [currentMapIndex, setCurrentMapIndex] = useState(0)
  const [activeOverlays, setActiveOverlays] = useState([false, false, false, false, false])
  const [searchText, setSearchText] = useState('')
  const [openSections, setOpenSections] = useState({ development: false, adaptation: false })
  const [expandedAdaptations, setExpandedAdaptations] = useState({})
  const [expandedOtherCategories, setExpandedOtherCategories] = useState({})
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const handleSearch = (e) => {
    e.preventDefault()
    if (!hasSearched) {
      setHasSearched(true)
    }
  }

  const toggleOverlay = (index) => {
    const newOverlays = [...activeOverlays]
    newOverlays[index] = !newOverlays[index]
    setActiveOverlays(newOverlays)
    
    // Auto-expand details when overlay is activated (for adaptation methods)
    if (newOverlays[index] && ADAPTATION_DETAILS[index]) {
      setExpandedAdaptations(prev => ({
        ...prev,
        [index]: true
      }))
    } else if (!newOverlays[index]) {
      // Auto-collapse when overlay is deactivated
      setExpandedAdaptations(prev => ({
        ...prev,
        [index]: false
      }))
    }
  }

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const currentImage = hasSearched ? MAP_IMAGES[currentMapIndex] : largeImg

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 overflow-hidden">
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Pacific Village Explorer</h1>
          
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-slate-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-slate-200
                         hover:border-slate-500 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.native}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex-shrink-0">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-lg p-3 flex-shrink-0">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold mb-1">Climate planning for Pacific villages</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Built for the <span className="text-blue-400 font-semibold">Tabwakea, Kiribati</span> — the village council — 
                  and community coordinators. See what climate change means for your village today, 
                  in 2050, in 2100. Plan adaptations your community can actually build.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative">
            <img 
              src={currentImage} 
              alt="Village map" 
              className="w-full h-full object-contain"
            />
            {hasSearched && activeOverlays.map((isActive, index) => (
              isActive && (
                <img
                  key={index}
                  src={OVERLAY_IMAGES[index]}
                  alt={`Overlay ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
              )
            ))}
            {/* Always display town name label on top */}
            {hasSearched && (
              <img
                src={overlay0}
                alt="Town label"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              />
            )}
          </div>

          {hasSearched && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex-shrink-0">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Sea Level Rise Timeline</label>
                  <div className="text-xl font-bold text-blue-400">
                    {YEARS[currentMapIndex]}
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={YEARS.length - 1}
                  step={1}
                  value={currentMapIndex}
                  onChange={(e) => setCurrentMapIndex(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between mt-2 text-xs">
                  {YEARS.map((year, index) => (
                    <span
                      key={year}
                      className={`cursor-pointer hover:text-blue-300 transition-colors ${
                        currentMapIndex === index ? 'text-blue-400 font-semibold' : 'text-slate-400'
                      }`}
                      onClick={() => setCurrentMapIndex(index)}
                    >
                      {year}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-80 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex-shrink-0">
            <h2 className="text-lg font-bold mb-3">Search Location</h2>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Enter village name..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pr-10 text-sm
                           focus:outline-none focus:border-blue-500 placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {hasSearched && (
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-sm font-semibold mb-3">Climate Planning Layers</h3>
              
              {/* Future Development Section */}
              <div className="mb-4">
                <button
                  onClick={() => toggleSection('development')}
                  className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-green-900/40 to-green-800/20 rounded-lg hover:from-green-900/50 hover:to-green-800/30 transition-all border-2 border-green-700/50"
                >
                  <div className="text-left">
                    <div className="font-semibold text-sm text-green-300">{OVERLAY_SECTIONS.development.title}</div>
                    <p className="text-xs text-green-400/70 mt-0.5">{OVERLAY_SECTIONS.development.description}</p>
                  </div>
                  {openSections.development ? (
                    <ChevronUp className="w-5 h-5 text-green-400 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-green-400 flex-shrink-0 ml-2" />
                  )}
                </button>
                
                {openSections.development && (
                  <div className="mt-2 space-y-2">
                    {OVERLAY_SECTIONS.development.overlays.map((overlay, idx) => {
                      const overlayIndex = idx;
                      // Housing Development = green (idx 0), Farmland Allocation = yellow (idx 1)
                      const isGreen = idx === 0;
                      const isYellow = idx === 1;
                      
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            activeOverlays[overlayIndex]
                              ? isGreen 
                                ? 'bg-green-900/30 border-green-500 shadow-lg shadow-green-500/20'
                                : isYellow
                                ? 'bg-yellow-900/30 border-yellow-500 shadow-lg shadow-yellow-500/20'
                                : 'bg-green-900/30 border-green-500 shadow-lg shadow-green-500/20'
                              : isGreen
                                ? 'bg-slate-800/50 border-slate-700 hover:border-green-600/50'
                                : isYellow
                                ? 'bg-slate-800/50 border-slate-700 hover:border-yellow-600/50'
                                : 'bg-slate-800/50 border-slate-700 hover:border-green-600/50'
                          }`}
                          onClick={() => toggleOverlay(overlayIndex)}
                        >
                          <div className="font-medium text-sm">{overlay.name}</div>
                          <p className="text-xs text-slate-400 mt-1">{overlay.description}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Adaptation Methods Section */}
              <div className="mb-4">
                <button
                  onClick={() => toggleSection('adaptation')}
                  className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-orange-900/40 to-orange-800/20 rounded-lg hover:from-orange-900/50 hover:to-orange-800/30 transition-all border-2 border-orange-700/50"
                >
                  <div className="text-left">
                    <div className="font-semibold text-sm text-orange-300">{OVERLAY_SECTIONS.adaptation.title}</div>
                    <p className="text-xs text-orange-400/70 mt-0.5">{OVERLAY_SECTIONS.adaptation.description}</p>
                  </div>
                  {openSections.adaptation ? (
                    <ChevronUp className="w-5 h-5 text-orange-400 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-orange-400 flex-shrink-0 ml-2" />
                  )}
                </button>
                
                {openSections.adaptation && (
                  <div className="mt-2 space-y-2">
                    {OVERLAY_SECTIONS.adaptation.overlays.map((overlay, idx) => {
                      const overlayIndex = idx + 2; // Start from index 2 (after development overlays)
                      const isActive = activeOverlays[overlayIndex];
                      const adaptationMethods = ADAPTATION_DETAILS[overlayIndex] || [];
                      
                      // Mangrove = orange (idx 0), Deep-rooted = red-pink (idx 1), Stilted = purple (idx 2)
                      const isOrange = idx === 0;
                      const isRedPink = idx === 1;
                      const isPurple = idx === 2;
                      
                      const activeColors = isOrange 
                        ? 'bg-orange-900/30 border-orange-500 shadow-lg shadow-orange-500/20'
                        : isRedPink
                        ? 'bg-rose-900/30 border-rose-500 shadow-lg shadow-rose-500/20'
                        : isPurple
                        ? 'bg-purple-900/30 border-purple-500 shadow-lg shadow-purple-500/20'
                        : 'bg-orange-900/30 border-orange-500 shadow-lg shadow-orange-500/20';
                      
                      const hoverColors = isOrange
                        ? 'bg-slate-800/50 border-slate-700 hover:border-orange-600/50'
                        : isRedPink
                        ? 'bg-slate-800/50 border-slate-700 hover:border-rose-600/50'
                        : isPurple
                        ? 'bg-slate-800/50 border-slate-700 hover:border-purple-600/50'
                        : 'bg-slate-800/50 border-slate-700 hover:border-orange-600/50';
                      
                      const borderColor = isOrange
                        ? 'border-orange-500/30'
                        : isRedPink
                        ? 'border-rose-500/30'
                        : isPurple
                        ? 'border-purple-500/30'
                        : 'border-orange-500/30';
                      
                      const textColor = isOrange
                        ? 'text-orange-300'
                        : isRedPink
                        ? 'text-rose-300'
                        : isPurple
                        ? 'text-purple-300'
                        : 'text-orange-300';
                      
                      return (
                        <div key={idx} className="space-y-1">
                          <div
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              isActive ? activeColors : hoverColors
                            }`}
                            onClick={() => toggleOverlay(overlayIndex)}
                          >
                            <div className="font-medium text-sm">{overlay.name}</div>
                            <p className="text-xs text-slate-400 mt-1">{overlay.description}</p>
                          </div>

                          {/* Auto-expanded Adaptation Methods when active */}
                          {isActive && adaptationMethods.length > 0 && (
                            <div className={`ml-3 space-y-2 border-l-2 ${borderColor} pl-3`}>
                              {adaptationMethods.map((method, methodIdx) => (
                                <div
                                  key={methodIdx}
                                  className={`p-3 bg-slate-900/50 rounded-lg border ${
                                    isOrange ? 'border-orange-700/50' : isRedPink ? 'border-rose-700/50' : 'border-purple-700/50'
                                  }`}
                                >
                                  <div className={`font-medium text-sm ${textColor} mb-1`}>
                                    {method.name}
                                  </div>
                                  <p className="text-xs text-slate-300 mb-2">
                                    {method.description}
                                  </p>
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                      <span className="text-slate-500">Cost:</span>{' '}
                                      <span className="text-slate-300">${method.cost_estimate_usd.toLocaleString()}</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Time:</span>{' '}
                                      <span className="text-slate-300">{method.implementation_time_months} months</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Effort:</span>{' '}
                                      <span className={`font-medium ${
                                        method.community_effort === 'high' ? 'text-orange-400' :
                                        method.community_effort === 'medium' ? 'text-yellow-400' :
                                        'text-green-400'
                                      }`}>
                                        {method.community_effort}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Impact:</span>{' '}
                                      <span className={`font-medium ${
                                        method.effectiveness === 'high' ? 'text-green-400' :
                                        method.effectiveness === 'medium' ? 'text-yellow-400' :
                                        'text-orange-400'
                                      }`}>
                                        {method.effectiveness}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mt-2 pt-2 border-t border-slate-700">
                                    <span className="text-slate-500 text-xs">Benefits:</span>
                                    <p className="text-xs text-slate-400 mt-1">{method.benefits}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Other Adaptation Recommendations */}
              {hasSearched && openSections.adaptation && (
                <div className="mt-4 pt-4 border-t-2 border-orange-700/30">
                  <h3 className="text-sm font-semibold text-orange-300 mb-3">Other Recommendations</h3>
                  <div className="space-y-3">
                    {OTHER_ADAPTATIONS.map((category, catIdx) => {
                      const isExpanded = expandedOtherCategories[catIdx];
                      
                      return (
                        <div key={catIdx}>
                          <div
                            className="p-3 rounded-lg border-2 border-slate-700 bg-slate-800/30 cursor-pointer hover:border-orange-600/50 transition-all"
                            onClick={() => setExpandedOtherCategories(prev => ({
                              ...prev,
                              [catIdx]: !prev[catIdx]
                            }))}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{category.icon}</span>
                                <div className="font-medium text-sm">{category.category}</div>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-slate-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="ml-3 mt-1 space-y-2 border-l-2 border-slate-600/30 pl-3">
                              {category.methods.map((method, methodIdx) => (
                                <div
                                  key={methodIdx}
                                  className="p-3 bg-slate-900/50 rounded-lg border border-slate-700"
                                >
                                  <div className="font-medium text-sm text-slate-300 mb-1">
                                    {method.name}
                                  </div>
                                  <p className="text-xs text-slate-400 mb-2">
                                    {method.description}
                                  </p>
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                      <span className="text-slate-500">Cost:</span>{' '}
                                      <span className="text-slate-300">${method.cost_estimate_usd.toLocaleString()}</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Time:</span>{' '}
                                      <span className="text-slate-300">{method.implementation_time_months} months</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Effort:</span>{' '}
                                      <span className={`font-medium ${
                                        method.community_effort === 'high' ? 'text-orange-400' :
                                        method.community_effort === 'medium' ? 'text-yellow-400' :
                                        'text-green-400'
                                      }`}>
                                        {method.community_effort}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Impact:</span>{' '}
                                      <span className={`font-medium ${
                                        method.effectiveness === 'high' ? 'text-green-400' :
                                        method.effectiveness === 'medium' ? 'text-yellow-400' :
                                        'text-orange-400'
                                      }`}>
                                        {method.effectiveness}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mt-2 pt-2 border-t border-slate-700">
                                    <span className="text-slate-500 text-xs">Benefits:</span>
                                    <p className="text-xs text-slate-400 mt-1">{method.benefits}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-semibold mb-2">About This Map</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Climate data from IPCC AR6 (SSP2-4.5), NASA sea level projections, and SPREP Pacific Climate Change Programme.
                </p>
              </div>
            </div>
          )}

          {!hasSearched && (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center text-slate-500">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Search for a village to view climate adaptation planning</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}