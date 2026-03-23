import { useState } from 'react'
import DuckChar from './DuckChar'

const steps = [
  {
    duck: true,
    title: '今日の1ミリ',
    body: '毎日ほんの少しだけ、\n自分のために動く。\nそれだけでいい。',
  },
  {
    emoji: '⏱',
    title: '使う時間は短いほどいい',
    body: '見たらすぐ閉じる。\n考えすぎない。\nできなくても大丈夫。',
  },
  {
    emoji: '✓',
    title: 'はじめよう',
    body: '今日の1ミリを\n受け取ってください。',
  },
]

export default function Onboarding({ onFinish }) {
  const [step, setStep] = useState(0)
  const current = steps[step]
  const isLast = step === steps.length - 1

  return (
    <div className="screen onboarding">
      <div className="onboarding-card">
        {current.duck ? (
          <DuckChar size={100} className="onboarding-duck" />
        ) : (
          <div className="onboarding-emoji">{current.emoji}</div>
        )}
        <h1 className="onboarding-title">{current.title}</h1>
        <p className="onboarding-body">{current.body}</p>
      </div>

      <div className="onboarding-footer">
        <div className="dots">
          {steps.map((_, i) => (
            <span key={i} className={`dot ${i === step ? 'dot--active' : ''}`} />
          ))}
        </div>

        <button
          className="btn btn--primary"
          onClick={() => isLast ? onFinish() : setStep(s => s + 1)}
        >
          {isLast ? 'はじめる' : 'つぎへ'}
        </button>
      </div>
    </div>
  )
}
