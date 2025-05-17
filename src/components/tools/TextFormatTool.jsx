import React from 'react'

export default function TextFormatTool({ current, setCurrent }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">تنسيق النص</h3>
      <label>حجم الخط: {current.settings.fontSize}px</label>
      <input type="range" min="24" max="100"
        value={current.settings.fontSize}
        onChange={e => setCurrent({
          ...current,
          settings:{...current.settings, fontSize:+e.target.value}
        })}
        className="w-full mb-2"/>
      <label>لون النص</label>
      <input type="color" value={current.settings.textColor}
        onChange={e => setCurrent({
          ...current,
          settings:{...current.settings, textColor:e.target.value}
        })}
        className="w-full mb-2"/>
      <label>لون التشكيل</label>
      <input type="color" value={current.settings.tashkeelColor}
        onChange={e => setCurrent({
          ...current,
          settings:{...current.settings, tashkeelColor:e.target.value}
        })}
        className="w-full"/>
    </div>
