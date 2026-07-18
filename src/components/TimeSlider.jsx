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
    <div className="bg-slate-900 border-t border-slate-800 p-4">
      <div className="max-w-5xl mx-auto flex items-center gap-5">
        <div className="flex-shrink-0 w-32">
          <div className="text-xl font-bold text-blue-400 leading-tight" key={year}>
            {year}
          </div>
          <div className="text-xs text-slate-400 leading-tight">
            {getYearLabel(year)}
          </div>
        </div>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={years.length - 1}
            step={1}
            value={currentIndex}
            onChange={e => onChange(years[parseInt(e.target.value)])}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />

          <div className="flex justify-between mt-1.5 text-xs text-slate-500">
            {years.map(y => (
              <span
                key={y}
                className={`transition-colors duration-300 cursor-pointer hover:text-blue-300 ${
                  y === year ? 'text-blue-400 font-semibold' : ''
                }`}
                onClick={() => onChange(y)}
              >
                {y}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}