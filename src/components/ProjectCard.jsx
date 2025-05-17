import React from 'react'

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">{project.name}</h2>
      <p className="text-sm mb-4">
        {project.verses.length} آيات · {project.settings.reciterId ? 'بصوت قارئ' : 'بدون صوت'}
      </p>
      <div className="flex space-x-2">
        <button onClick={() => onEdit(project)} className="text-blue-600">✏️ تعديل</button>
        <button onClick={() => onDelete(project.id)} className="text-red-600">🗑️ حذف</button>
      </div>
    </div>
  )
}
