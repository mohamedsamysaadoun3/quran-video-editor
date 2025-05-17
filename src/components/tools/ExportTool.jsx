import React, { useState } from 'react'
import { exportVideo } from '../../utils/ffmpegUtil'

export default function ExportTool({ current }) {
  const [quality, setQuality] = useState(current.settings.quality)
  const [format, setFormat] = useState(current.settings.format)

  const doExport = () => {
    current.settings.quality = quality
    current.settings.format = format
    exportVideo(current)
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">تصدير الفيديو</h3>
      <label>الجودة</label>
      <select value={quality}
        onChange={e => setQuality(e.target.value)}
        className="w-full mb-2 border px-2 py-1">
        {['480p','720p','1080p','4K'].map(q => <option key={q} value={q}>{q}</option>)}
      </select>
      <label>الصيغة</label>
      <select value={format}
        onChange={e => setFormat(e.target.value)}
        className="w-full mb-2 border px-2 py-1">
        <option value="mp4">MP4</option>
        <option value="gif">GIF</option>
        <option value="webm">WebM</option>
      </select>
      <button onClick={doExport}
        className="bg-green-600 text-white px-4 py-2 rounded w-full">
        تصدير وتنزيل
      </button>
    </div>
  )
}
