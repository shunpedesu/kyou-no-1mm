import { useStorage } from '../hooks/useStorage'
import DuckChar from './DuckChar'

export default function History({ onBack }) {
  const { getStats, getLast7Records } = useStorage()
  const { totalDone, totalWatched, streak } = getStats()
  const last7 = getLast7Records()

  return (
    <div className="screen history">
      <header className="history-header">
        <button className="icon-btn" onClick={onBack} aria-label="戻る">
          ←
        </button>
        <h2 className="history-title">記録</h2>
        <span />
      </header>

      <div className="stats-row">
        <Stat label="できた" value={totalDone} unit="回" />
        <div className="stats-divider" />
        <Stat label="見た" value={totalWatched} unit="回" />
        <div className="stats-divider" />
        <Stat label="続いてる" value={streak} unit="日" />
      </div>

      <section className="week-section">
        <p className="week-label">直近7日</p>
        <div className="week-dots">
          {last7.map(({ date, record }) => (
            <WeekDot key={date.toDateString()} date={date} record={record} />
          ))}
        </div>
      </section>

      <section className="record-section">
        {last7.every(d => !d.record) ? (
          <div className="empty-state">
            <DuckChar size={56} className="empty-duck" />
            <p>まだ記録がありません</p>
            <p className="empty-sub">今日の1ミリからはじめよう</p>
          </div>
        ) : (
          <ul className="record-list">
            {last7.filter(d => d.record).map(({ record }) => (
              <li key={record.id} className="record-item">
                <div className="record-meta">
                  <span className="record-date">{formatDate(new Date(record.date))}</span>
                  <span className={`record-badge ${record.action === 'done' ? 'badge--done' : 'badge--watched'}`}>
                    {record.action === 'done' ? 'できた' : '見た'}
                  </span>
                </div>
                <p className="record-text">{record.suggestionText}</p>
                {record.memo ? (
                  <p className="record-memo">{record.memo}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function Stat({ label, value, unit }) {
  return (
    <div className="stat-item">
      <span className="stat-value">{value}<span className="stat-unit">{unit}</span></span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

function WeekDot({ date, record }) {
  const isToday = date.toDateString() === new Date().toDateString()
  const day = date.toLocaleDateString('ja-JP', { weekday: 'short' })
  let state = 'empty'
  if (record?.action === 'done') state = 'done'
  else if (record?.action === 'watched') state = 'watched'

  return (
    <div className="week-dot-wrap">
      <div className={`week-dot week-dot--${state} ${isToday ? 'week-dot--today' : ''}`} />
      <span className="week-day">{day}</span>
    </div>
  )
}

function formatDate(date) {
  return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric', weekday: 'short' })
}
