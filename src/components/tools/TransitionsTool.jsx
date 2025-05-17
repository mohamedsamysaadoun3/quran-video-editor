import React from 'react'

export default function TransitionsTool({ current, setCurrent }) {
  const opts = ['none','fade','slide','zoom']
  return (
    <div>
      <h3 className="font-semibold mb-2">انتقالات بين الآيات</h3>
      <select value={current.settings.transitions}
        onChange={e => setCurrent({
          ...current,
          settings:{...current.settings, transitions:e.target.value}
        })}
        className="w-full border px-2 py-1"
      >
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
