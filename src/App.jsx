import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Editor from './components/Editor'
import { fetchReciters, fetchSurahs } from './utils/api'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [project, setProject] = useState(null)
  const [reciters, setReciters] = useState([])
  const [surahs, setSurahs] = useState([])

  useEffect(() => {
    fetchReciters().then(setReciters)
    fetchSurahs().then(setSurahs)
  }, [])

  return (
    <>
      {page === 'dashboard' && (
        <Dashboard
          onNew={() => { setProject(null); setPage('editor') }}
          onEdit={p => { setProject(p); setPage('editor') }}
        />
      )}
      {page === 'editor' && (
        <Editor
          project={project}
          reciters={reciters}
          surahs={surahs}
          onSave={p => { setProject(p); setPage('dashboard') }}
          onBack={() => setPage('dashboard')}
        />
      )}
    </>
  )
}
