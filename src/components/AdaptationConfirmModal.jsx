import { useEffect } from 'react'
import { X } from 'lucide-react'

const AUTO_DISMISS_MS = 4500

export default function AdaptationConfirmModal({ mode, assetName, adaptationName, onClose }) {
  useEffect(() => {
    if (!mode) return
    const timer = setTimeout(onClose, AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [mode, onClose])

  if (!mode) return null

  const isApplied = mode === 'applied'

  return (
    <div className="fixed bottom-6 right-6 z-[1000] w-[calc(100%-3rem)] max-w-sm toast-slide-in">
      <div className="bg-slate-900 border border-blue-600 rounded-xl shadow-2xl p-3.5 flex items-start gap-3">
        <div className="text-2xl flex-shrink-0 leading-none">{isApplied ? '🎉' : '↩️'}</div>

        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold mb-0.5">
            {isApplied ? 'Nice work!' : 'Protection removed'}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isApplied ? (
              <>
                <span className="font-semibold text-white">{assetName}</span> is protected now
                {adaptationName ? <> by <span className="font-semibold text-white">{adaptationName}</span></> : null}.
                It just turned <span className="font-semibold text-green-400">green</span> on the map.
              </>
            ) : (
              <>
                <span className="font-semibold text-white">{assetName}</span> is no longer protected — the
                map now shows what really happens to it over time.
              </>
            )}
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 text-slate-500 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}