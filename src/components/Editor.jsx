import React, { useState, useEffect } from 'react'
import Toolbar from './Toolbar'
import Preview from './Preview'
import AudioTextTool from './tools/AudioTextTool'
import BackgroundTool from './tools/BackgroundTool'
import TextFormatTool from './tools/TextFormatTool'
import TransitionsTool from './tools/TransitionsTool'
import ExportTool from './tools/ExportTool'
import { v4 as uuid } from 'uuid'

export default function Editor({ project, reciters, surahs, onSave, onBack }) {
  const [current, setCurrent] = useState(() => project || {
    id: uuid(),
    name: `Quran Video Editor – ${new Date().toLocaleString()}`,
    verses: [],
    settings: {
      fontSize: 48, textColor: '#fff', tashkeelColor: '#fff',
      bgImage: null, bgType: 'static',
      reciterId: 0, duration: 3,
      transitions: 'fade', quality: '720p',
      autoSync: false, format: 'mp4'
    }
  })

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('mqv_projects') || '[]')
    const others = all.filter(p => p.id !== current.id)
    localStorage.setItem('mqv_projects', JSON.stringify([current, ...others]))
  }, [current])

  return (
    <div className="flex flex-col h-screen">
      <Toolbar name={current.name} onBack={onBack} onSave={() => onSave(current)}/>
      <div className="flex flex-1 overflow-hidden">
        <Preview project={current}/>
        <div className="w-80 bg-white overflow-auto p-4 space-y-4">
          <AudioTextTool current={current} setCurrent={setCurrent} reciters={reciters} surahs={surahs}/>
          <BackgroundTool current={current} setCurrent={setCurrent}/>
          <TextFormatTool current={current} setCurrent={setCurrent}/>
          <TransitionsTool current={current} setCurrent={setCurrent}/>
          <ExportTool current={current}/>
        </div>
      </div>
    </div>
  )
}
