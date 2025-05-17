import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

export async function exportVideo(project) {
  const { verses, settings } = project
  const ffmpeg = createFFmpeg({ log: true })
  await ffmpeg.load()

  // 1) توليد Frames
  const canvases = document.querySelectorAll('canvas')
  for (let i = 0; i < canvases.length; i++) {
    const blob = await new Promise(r => canvases[i].toBlob(r))
    ffmpeg.FS('writeFile', `frame${i}.png`, await fetchFile(blob))
  }

  // 2) تحميل ودمج الصوت
  if (settings.reciterId) {
    const segments = []
    for (let v of verses) {
      const s = String(v.surah).padStart(3, '0')
      const a = String(v.ayah).padStart(3, '0')
      const url = `https://cdn.quran.com/api/v4/recitations/${settings.reciterId}/${s}${a}.mp3`
      const buf = await fetch(url).then(r => r.arrayBuffer())
      segments.push(new Uint8Array(buf))
    }
    ffmpeg.FS('writeFile', 'reciter.mp3', concatUint8Arrays(segments))
  }

  // 3) بناء الأوامر حسب الجودة
  const qmap = { '480p':'640x480','720p':'1280x720','1080p':'1920x1080','4K':'3840x2160' }
  const size = qmap[settings.quality] || '1280x720'
  const args = ['-framerate', String(1 / settings.duration), '-i','frame%d.png','-s',size]
  if (settings.reciterId) args.push('-i','reciter.mp3','-c:a','aac','-shortest')
  args.push('-c:v','libx264','out.mp4')
  await ffmpeg.run(...args)

  // 4) تنزيل الملف
  const data = ffmpeg.FS('readFile','out.mp4')
  const url = URL.createObjectURL(new Blob([data.buffer], { type:'video/mp4' }))
  const a = document.createElement('a')
  a.href = url; a.download = 'quran_video.mp4'; a.click()
}

// مساعدة لدمج Uint8Array
function concatUint8Arrays(arrs) {
  const total = arrs.reduce((sum,a)=>sum + a.length, 0)
  const res = new Uint8Array(total)
  let off = 0
  for (const a of arrs) { res.set(a, off); off += a.length }
  return res
}
