import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'

export default function Dashboard({ onNew, onEdit }) {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    setProjects(JSON.parse(localStorage.getItem('mqv_projects') || '[]'))
  }, [])

  const remove = id => {
    const filt = projects.filter(p => p.id !== id)
    localStorage.setItem('mqv_projects', JSON.stringify(filt))
    setProjects(filt)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">مشاريعي</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} onEdit={onEdit} onDelete={remove}/>
        ))}
      </div>
      <button
        onClick={onNew}
        className="fixed bottom-8 right-8 bg-primary text-white px-8 py-4 rounded-full shadow-lg text-lg"
      >
        إنشاء فيديو جديد
      </button>
    </div>
  )
}
