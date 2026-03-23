const KEYS = {
  ONBOARDED: '1mm_onboarded',
  RECORDS: '1mm_records',
}

export function useStorage() {
  function isOnboarded() {
    return localStorage.getItem(KEYS.ONBOARDED) === 'true'
  }

  function setOnboarded() {
    localStorage.setItem(KEYS.ONBOARDED, 'true')
  }

  function getRecords() {
    try {
      return JSON.parse(localStorage.getItem(KEYS.RECORDS) || '[]')
    } catch {
      return []
    }
  }

  function saveRecord({ suggestionId, suggestionText, action, memo = '' }) {
    const records = getRecords()
    const record = {
      id: Date.now(),
      date: new Date().toISOString(),
      suggestionId,
      suggestionText,
      action, // 'done' | 'watched'
      memo: memo.trim(),
    }
    records.unshift(record)
    localStorage.setItem(KEYS.RECORDS, JSON.stringify(records.slice(0, 365)))
    return record
  }

  function getTodayRecord() {
    const today = new Date().toDateString()
    return getRecords().find(r => new Date(r.date).toDateString() === today) || null
  }

  function getStats() {
    const records = getRecords()
    const totalDone = records.filter(r => r.action === 'done').length
    const totalWatched = records.filter(r => r.action === 'watched').length
    const streak = calcStreak(records)
    return { totalDone, totalWatched, streak }
  }

  function getLast7Records() {
    const records = getRecords()
    const result = []
    for (let i = 0; i < 7; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toDateString()
      const rec = records.find(r => new Date(r.date).toDateString() === dateStr)
      result.push({ date: d, record: rec || null })
    }
    return result
  }

  return { isOnboarded, setOnboarded, getRecords, saveRecord, getTodayRecord, getStats, getLast7Records }
}

function calcStreak(records) {
  if (records.length === 0) return 0
  const days = new Set(records.map(r => new Date(r.date).toDateString()))
  let streak = 0
  const cur = new Date()
  if (!days.has(cur.toDateString())) {
    cur.setDate(cur.getDate() - 1)
  }
  while (days.has(cur.toDateString())) {
    streak++
    cur.setDate(cur.getDate() - 1)
  }
  return streak
}
