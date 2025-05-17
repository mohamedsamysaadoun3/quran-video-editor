import React, { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'

export default function BackgroundTool({ current, setCurrent }) {
  const [uploadPreview, setUploadPreview] = useState(null)

  const onFile = e => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setUploadPreview(url)
    setCurrent({...current, settings:{...current.settings, bgImage:url, bgType:'upload'}})
  }

  const genAI = async () => {
    const cli = new OpenAIApi(new Configuration({ apiKey: import.meta.env.VITE_OPENAI_API_KEY }))
    const prompt = `Islamic background for Surah ${current.verses[0]?.surah}`
    const res = await cli.createImage({ prompt, n:1, size:'1024x768' })
    setCurrent({...current, settings:{...current.settings, bgImage:res.data.data[0].url, bgType:'static'}})
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">الخلفية</h3>
      <select value={current.settings.bgType}
        onChange={e => setCurrent({
          ...current,
          settings:{...current.settings, bgType:e.target.value}
        })}
        className="w-full mb-2 border px-2 py-1"
      >
        <option value="static">ثابتة/AI</option>
        <option value="video">متحركة (Video/GIF)</option>
        <option value="upload">رفع من المعرض</option>
      </select>

      {current.settings.bgType === 'static' && (
        <button onClick={genAI}
          className="bg-indigo-600 text-white px-4 py-2 rounded mb-2 w-full">
          اقتراح AI
        </button>
      )}

      {current.settings.bgType === 'video' && (
        <input type="text" placeholder="رابط فيديو/GIF" className="w-full mb-2 border px-2 py-1"
          value={current.settings.bgImage||''}
          onChange={e => setCurrent({
            ...current, settings:{...current.settings, bgImage:e.target.value}
          })}
        />
      )}

      {current.settings.bgType === 'upload' && (
        <input type="file" accept="image/*,video/*,gif/*" onChange={onFile}
          className="w-full mb-2"/>
      )}

      {(uploadPreview || current.settings.bgImage) && (
        <div className="mb-2">
          {current.settings.bgType === 'video'
            ? <video src={current.settings.bgImage} width="100%" controls loop muted/>
            : <img src={uploadPreview||current.settings.bgImage} className="w-full rounded"/>
          }
        </div>
      )}
    </div>
