import React, { useEffect, useRef, useState } from 'react'

export default function Preview({ project }) {
  const container = useRef()
  const [playing, setPlaying] = useState(false)
  const [frame, setFrame] = useState(0)
  let timer

  const play = () => {
    setPlaying(true)
    timer = setInterval(() => {
      setFrame(f => (f + 1) < project.verses.length ? f + 1 : (clearInterval(timer), f))
    }, project.settings.duration * 1000)
  }
  const pause = () => { setPlaying(false); clearInterval(timer) }

  useEffect(() => {
    const div = container.current
    div.innerHTML = ''
    project.verses.forEach((v, i) => {
      const c = document.createElement('canvas')
      c.width = 720; c.height = 480
      const ctx = c.getContext('2d')
      // رسم الخلفية حسب النوع
      if (project.settings.bgType === 'static' && project.settings.bgImage) {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = project.settings.bgImage
        img.onload = () => draw(ctx, v.text)
      } else draw(ctx, v.text)
      function draw(ctx, text) {
        ctx.fillStyle = project.settings.textColor
        ctx.font = `${project.settings.fontSize}px Amiri Quran`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(text.replace(/[\u0617-\u061A\u064B-\u0652]/g, ''),360,240)
        ctx.fillStyle = project.settings.tashkeelColor
        ctx.fillText(text,360,240)
      }
      c.style.display = i === frame ? 'block' : 'none'
      div.appendChild(c)
    })
  }, [project, frame])

  return (
    <div className="flex-1 bg-black flex flex-col items-center justify-center">
      <div ref={container} className="overflow-auto"/>
      <div className="mt-2 space-x-2">
        {playing
          ? <button onClick={pause} className="px-4 py-2 bg-red-600 text-white rounded">إيقاف</button>
          : <button onClick={play}  className="px-4 py-2 bg-green-600 text-white rounded">تشغيل</button>}
      </div>
    </div>
  )
}
