export const suggestions = [
  // 呼吸・体
  { id:  1, text: '深呼吸を1回する',                     category: '呼吸' },
  { id:  2, text: 'ゆっくり息を吐く',                    category: '呼吸' },
  { id:  3, text: '水をひとくち飲む',                    category: '体' },
  { id:  4, text: '5秒だけ背伸びする',                   category: '体' },
  { id:  5, text: '肩を1回まわす',                       category: '体' },
  { id:  6, text: '首をやさしく動かす',                  category: '体' },
  { id:  7, text: '手を洗う',                            category: '体' },
  { id:  8, text: '立ち上がって一歩だけ歩く',             category: '体' },
  { id:  9, text: 'イスに座り直す',                      category: '体' },
  { id: 10, text: '顔を上げる',                          category: '体' },
  { id: 11, text: '肩の力を抜く',                        category: '体' },
  { id: 12, text: '手のひらをひらく',                    category: '体' },
  { id: 13, text: '足の裏の感覚を10秒感じる',             category: '体' },
  { id: 14, text: '椅子から立ってまた座る',               category: '体' },
  { id: 15, text: 'コップに水を入れる',                  category: '体' },
  { id: 16, text: 'コーヒーやお茶をひとくち飲む',         category: '体' },
  { id: 17, text: '姿勢を少しだけ整える',                category: '体' },

  // 感覚・五感
  { id: 18, text: '外を10秒見る',                        category: '感覚' },
  { id: 19, text: '空を見上げる',                        category: '感覚' },
  { id: 20, text: '部屋の音を10秒聞く',                  category: '感覚' },
  { id: 21, text: '今ある音を3つ探す',                   category: '感覚' },
  { id: 22, text: '今いる場所の色を3つ見つける',          category: '感覚' },
  { id: 23, text: '目を閉じて5秒過ごす',                 category: '感覚' },
  { id: 24, text: 'ベランダや外の空気を感じる',           category: '感覚' },
  { id: 25, text: '窓の外の天気を確認する',              category: '感覚' },
  { id: 26, text: '鳥や虫や木など、生き物を探してみる',   category: '感覚' },

  // スマホから離れる
  { id: 27, text: 'スマホを伏せて置く',                  category: '離れる' },
  { id: 28, text: '通知を1分だけ見ない',                 category: '離れる' },
  { id: 29, text: '画面から目を離して遠くを見る',         category: '離れる' },
  { id: 30, text: 'スマホを閉じて10秒だけ何もしない',     category: '離れる' },
  { id: 31, text: '机の前から半歩だけ離れる',             category: '離れる' },

  // 環境・身の回り
  { id: 32, text: '窓を少し開ける',                      category: '環境' },
  { id: 33, text: '机の上を1か所だけ整える',              category: '環境' },
  { id: 34, text: 'コップを洗う',                        category: '環境' },
  { id: 35, text: '靴をそろえる',                        category: '環境' },
  { id: 36, text: 'カーテンを開ける',                    category: '環境' },
  { id: 37, text: 'カーテンを少し閉める',                category: '環境' },
  { id: 38, text: '机や棚を1回だけふく',                  category: '環境' },
  { id: 39, text: '散らかったものを1つ戻す',              category: '環境' },
  { id: 40, text: 'ドアを開けて別の部屋をのぞく',         category: '環境' },
  { id: 41, text: '玄関まで行く',                        category: '環境' },
  { id: 42, text: '靴下や服を少し整える',                category: '環境' },

  // 心・内省
  { id: 43, text: '好きなものを1つ思い出す',              category: '心' },
  { id: 44, text: '今の気分を一言で思い浮かべる',         category: '心' },
  { id: 45, text: '今日よかったことを1つ探す',            category: '心' },
  { id: 46, text: '今日やらないことを1つ決める',          category: '心' },

  // 学び・記録
  { id: 47, text: '本を1ページだけ開く',                  category: '学び' },
  { id: 48, text: 'メモを1行だけ書く',                   category: '学び' },
  { id: 49, text: '今日やることを1語だけ書く',            category: '学び' },
  { id: 50, text: 'お気に入りの本や物に触れる',           category: '学び' },
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
