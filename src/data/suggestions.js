export const suggestions = [
  // 呼吸・体
  { id: 1,  text: '深呼吸を3回する',                   category: '呼吸' },
  { id: 2,  text: '肩の力を抜いてみる',                 category: '体' },
  { id: 3,  text: '水を一杯ゆっくり飲む',               category: '体' },
  { id: 4,  text: '背筋をすっと伸ばす',                 category: '体' },
  { id: 5,  text: '手をゆっくりほぐす',                 category: '体' },
  { id: 6,  text: '顔を洗ってリフレッシュする',          category: '体' },
  { id: 7,  text: 'ストレッチを1つだけやる',             category: '体' },
  { id: 8,  text: 'ゆっくり首を左右に傾ける',            category: '体' },
  { id: 9,  text: '足の指をぎゅっと握って、ゆっくり開く', category: '体' },

  // 感覚・五感
  { id: 10, text: '今この瞬間の音に耳を澄ます',          category: '感覚' },
  { id: 11, text: '好きな香りを一度嗅ぐ',               category: '感覚' },
  { id: 12, text: '少し遠くの景色にピントを合わせる',    category: '感覚' },
  { id: 13, text: '目を閉じて、10秒だけ暗闇にいる',     category: '感覚' },
  { id: 14, text: '触れているものの感触を感じてみる',    category: '感覚' },

  // スマホから離れる
  { id: 15, text: 'スマホを伏せて、1分だけ目を閉じる',   category: '離れる' },
  { id: 16, text: 'スマホを置いて、窓の外を1分眺める',   category: '離れる' },
  { id: 17, text: 'スマホを別の部屋に置いてくる',        category: '離れる' },
  { id: 18, text: '今日、通知をすべてオフにして5分過ごす', category: '離れる' },
  { id: 19, text: '紙に今の気分をひとことだけ書く',      category: '離れる' },
  { id: 20, text: '外に出て、空を見上げる',              category: '離れる' },
  { id: 21, text: '5分だけ外の空気を吸う',               category: '離れる' },
  { id: 22, text: '好きな曲を1曲だけ、画面を見ずに聴く', category: '離れる' },
  { id: 23, text: '何も見ずに、ただ座る時間を2分とる',   category: '離れる' },

  // 心・内省
  { id: 24, text: '今日感謝できることを一つ思う',        category: '心' },
  { id: 25, text: '「よくやっている」と自分に言う',       category: '心' },
  { id: 26, text: '今日うまくいったことを一つ思い出す',   category: '心' },
  { id: 27, text: '今日の気分を言葉にしてみる',          category: '心' },
  { id: 28, text: 'いちばん気になっていることを一つ書く', category: '心' },
  { id: 29, text: '誰かに小さな「ありがとう」を伝える',   category: '心' },
  { id: 30, text: '連絡できていなかった人に一言送る',     category: '心' },
  { id: 31, text: '「今日はこれで十分だった」と思う',     category: '心' },

  // 環境・身の回り
  { id: 32, text: 'デスクの上を少しだけ整える',          category: '環境' },
  { id: 33, text: '靴を揃えて置く',                     category: '環境' },
  { id: 34, text: '不要なアプリを1つ削除する',            category: '環境' },
  { id: 35, text: '読みかけの本を1ページだけ読む',        category: '学び' },
  { id: 36, text: '気になっていたことを一つメモする',     category: '学び' },
]

export function getRandomSuggestion(excludeId = null) {
  const pool = excludeId
    ? suggestions.filter(s => s.id !== excludeId)
    : suggestions
  return pool[Math.floor(Math.random() * pool.length)]
}

export function getTodaySuggestion() {
  const today = new Date().toDateString()
  const seed = today.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return suggestions[seed % suggestions.length]
}
