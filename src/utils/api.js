export async function fetchReciters() {
  const res = await fetch('https://api.quran.com/api/v4/resources/recitations?language=ar')
  const { recitations } = await res.json()
  return recitations
}

export async function fetchSurahs() {
  const res = await fetch('https://api.quran.com/api/v4/chapters')
  const { chapters } = await res.json()
  return chapters
}
