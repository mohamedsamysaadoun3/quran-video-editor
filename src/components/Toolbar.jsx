import React from 'react'

export default function Toolbar({ name, onBack, onSave }) {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4">
      <button onClick={onBack}>← رجوع</button>
      <h1 className="text-lg font-semibold">{name}</h1>
      <button onClick={onSave}>💾 حفظ</button>
    </div>
  )
}
