import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

const GRADIENT_ID = 'flood-depth-gradient'

export default function FloodDepthGradientDefs() {
  const map = useMap()

  useEffect(() => {
    const svg = map.getPanes().overlayPane.querySelector('svg')
    if (!svg || svg.querySelector(`#${GRADIENT_ID}`)) return

    const ns = 'http://www.w3.org/2000/svg'
    let defs = svg.querySelector('defs')
    if (!defs) {
      defs = document.createElementNS(ns, 'defs')
      svg.insertBefore(defs, svg.firstChild)
    }

    // objectBoundingBox coordinates (0,0 = top-left of the shape's own
    // bounding box, 1,1 = bottom-right) — this tracks the polygon's own
    // rendered shape regardless of zoom or pan, no geographic coordinates
    // needed. Top of the ribbon is the inland/coast edge (lighter,
    // shallower); bottom is furthest out to sea (darker, deeper).
    const gradient = document.createElementNS(ns, 'linearGradient')
    gradient.setAttribute('id', GRADIENT_ID)
    gradient.setAttribute('x1', '0')
    gradient.setAttribute('y1', '0')
    gradient.setAttribute('x2', '0')
    gradient.setAttribute('y2', '1')

    const stops = [
      { offset: '0%', color: '#60a5fa', opacity: '0.45' },
      { offset: '45%', color: '#3b82f6', opacity: '0.55' },
      { offset: '100%', color: '#1e3a8a', opacity: '0.75' }
    ]

    for (const s of stops) {
      const stop = document.createElementNS(ns, 'stop')
      stop.setAttribute('offset', s.offset)
      stop.setAttribute('stop-color', s.color)
      stop.setAttribute('stop-opacity', s.opacity)
      gradient.appendChild(stop)
    }

    defs.appendChild(gradient)
  }, [map])

  return null
}

export const FLOOD_DEPTH_GRADIENT = `url(#${GRADIENT_ID})`