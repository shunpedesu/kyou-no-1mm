import { useState } from 'react'
import { getTodaySuggestion, getRandomSuggestion } from '../data/suggestions'
import { doneMessages, seenMessages, helperCopies, pickRandom } from '../data/messages'
import { useStorage } from '../hooks/useStorage'
import DuckChar from './DuckChar'

export default function Home({ onNavigateHistory }) {
  const { saveRecord, getTodayRecord } = useStorage()
  const todayRecord = getTodayRecord()

  const [suggestion, setSuggestion] = useState(() => getTodaySuggestion())
  const [done, setDone] = useState(todayRecord)
  const [justSaved, setJustSaved] = useState(false)
  const [memo, setMemo] = useState('')
  const [resultMsg] = useState(() => ({ done: pickRandom(doneMessages), seen: pickRandom(seenMessages) }))
  const [helperMsg] = useState(() => pickRandom(helperCopies))

  function handleAction(action) {
    saveRecord({
      suggestionId: suggestion.id,
      suggestionText: suggestion.text,
      action,
      memo,
    })
    setDone({ action })
    setJustSaved(true)
  }

  function handleAnother() {
    setSuggestion(prev => getRandomSuggestion(prev.id))
    setMemo('')
  }

  // 完了直後
  if (done && justSaved) {
    const msg = done.action === 'done' ? resultMsg.done : resultMsg.seen
    return (
      <div className="screen home home--result">
        <div className="result-card">
          <DuckChar size={72} className="result-duck" />
          <p className="result-main">{msg}</p>
          {done.action === 'done' && (
            <p className="result-sub">スマホを閉じていいよ。</p>
          )}
        </div>
        <button className="btn btn--ghost history-link" onClick={onNavigateHistory}>
          記録を見る
        </button>
      </div>
    )
  }

  // 今日記録済みで再訪
  if (done && !justSaved) {
    return (
      <div className="screen home home--result">
        <div className="result-card">
          <DuckChar size={64} className="result-duck result-duck--dim" />
          <p className="result-main">今日はもう動いた。</p>
          <p className="result-sub">スマホを置いてゆっくりしよう。</p>
        </div>
        <button className="btn btn--ghost history-link" onClick={onNavigateHistory}>
          記録を見る
        </button>
      </div>
    )
  }

  return (
    <div className="screen home">
      <header className="home-header">
        <span className="home-date">{formatDate(new Date())}</span>
        <button className="icon-btn" onClick={onNavigateHistory} aria-label="記録">
          ☰
        </button>
      </header>

      <div className="suggestion-card">
        <DuckChar size={52} className="card-duck" />
        <span className="category-tag">{suggestion.category}</span>
        <p className="suggestion-text">{suggestion.text}</p>
      </div>

      <div className="memo-area">
        <textarea
          className="memo-input"
          value={memo}
          onChange={e => setMemo(e.target.value)}
          placeholder="ひとことだけ（省略OK）"
          rows={2}
          maxLength={100}
        />
      </div>

      <div className="action-buttons">
        <button className="btn btn--primary" onClick={() => handleAction('done')}>
          できた
        </button>
        <button className="btn btn--secondary" onClick={() => handleAction('watched')}>
          見ただけ
        </button>
        <button className="btn btn--ghost" onClick={handleAnother}>
          別の1ミリにする
        </button>
      </div>

      <p className="helper-copy">{helperMsg}</p>
    </div>
  )
}

function formatDate(date) {
  return date.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' })
}
