import React, { useState, useEffect } from 'react'

export default function AudioTextTool({ current, setCurrent, reciters, surahs }) {
  const [from, setFrom] = useState(1), [to, setTo] = useState(1), [surah, setSurah] = useState(1)

  useEffect(() => {
    if (current.verses.length) {
      Promise.all(current.verses.map(v =>
        fetch(`https://api.quran.com/api/v4/verses/by_key/${String(v.surah).padStart(3,'0')}${String(v.ayah).padStart(3,'0')}?language=ar`)
          .then(r=>r.json()).then(j=>j.verse.text))
      ).then(texts => {
        const vs = current.verses.map((v,i)=>({...v, text: texts[i]}))
        setCurrent({...current, verses: splitLong(vs)})
      })
    }
  }, [current.verses.length])

  function splitLong(verses) {
    return verses.flatMap(v => v.text.length > 50
      ? [{...v, text: v.text.slice(0, v.text.length/2)}, {...v, text: v.text.slice(v.text.length/2)}]
      : v
    )
  }

  const load = () => {
    const arr = []
    for (let i = from; i <= to; i++) arr.push({ surah, ayah: i, text: '' })
    setCurrent({ ...current, verses: arr })
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">إعداد الصوت والنص</h3>
      <select value={surah} onChange={e => setSurah(+e.target.value)} className="w-full mb-2 border px-2 py-1">
        {surahs.map(s => <option key={s.id} value={s.id}>{s.name_arabic}</option>)}
      </select>
      من آية <input type="number" min="1" value={from} onChange={e => setFrom(+e.target.value)} className="w-16 mx-2"/>
      إلى <input type="number" min="1" value={to} onChange={e => setTo(+e.target.value)} className="w-16 mx-2"/>
      <select value={current.settings.reciterId}
        onChange={e => setCurrent({...current, settings:{...current.settings, reciterId:+e.target.value}})}
        className="w-full my-2 border px-2 py-1"
      >
        <option value={0}>بدون صوت</option>
        {reciters.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
      </select>
      <label className="inline-flex items-center mb-2">
        <input type="checkbox" className="mr-2"
          checked={current.settings.autoSync}
          onChange={e => setCurrent({
            ...current,
            settings:{...current.settings, autoSync: e.target.checked}
          })}/>
        مزامنة تلقائية
      </label>
      <button onClick={load} className="bg-primary text-white px-4 py-2 rounded">تحميل المعاينة</button>
    </div>
