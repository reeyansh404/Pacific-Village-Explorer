export default function TimeSlider({ year, onChange }) {
  const years = [2026, 2030, 2035, 2040, 2045, 2050, 2060, 2075]
  const currentIndex = years.indexOf(year)

  const getYearLabel = (y) => {
    if (y === 2026) return 'Present day'
    if (y <= 2035) return 'Near future'
    if (y <= 2050) return 'Mid-century'
    return 'Late-century'
  }

  return (
    <div className="bg-slate-900 border-t border-slate-800 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <div
            className="text-4xl font-bold text-blue-400 transition-all duration-500"
            key={year}
          >
            {year}
          </div>
          <div className="text-sm text-slate-400 mt-1">
            {getYearLabel(year)}
          </div>
        </div>

        <div className="relative">
          <input
            type="range"
            min={0}
            max={years.length - 1}
            step={1}
            value={currentIndex}
            onChange={e => onChange(years[parseInt(e.target.value)])}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="flex justify-between mt-3 text-xs text-slate-400">
          {years.map(y => (
            <span
              key={y}
              className={`transition-all duration-300 cursor-pointer hover:text-blue-300 ${
                y === year ? 'text-blue-400 font-semibold text-base' : ''
              }`}
              onClick={() => onChange(y)}
            >
              {y}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}