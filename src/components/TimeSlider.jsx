export default function TimeSlider({ year, onChange }) {
  const years = [2026, 2035, 2050, 2075]
  const currentIndex = years.indexOf(year)

  return (
    <div className="bg-slate-900 border-t border-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-blue-400">{year}</div>
          <div className="text-sm text-slate-400 mt-1">
            {year === 2026 ? 'Present day' :
             year === 2035 ? 'Near future' :
             year === 2050 ? 'Mid-century projections' :
             'Late-century projections'}
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={3}
          step={1}
          value={currentIndex}
          onChange={e => onChange(years[parseInt(e.target.value)])}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />

        <div className="flex justify-between mt-2 text-sm text-slate-400">
          {years.map(y => (
            <span
              key={y}
              className={y === year ? 'text-blue-400 font-semibold' : ''}
            >
              {y}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}