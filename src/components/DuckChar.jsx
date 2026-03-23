/**
 * アプリのマスコットキャラクター：白衣アヒル
 * size prop: px単位の数値（デフォルト 80）
 */
export default function DuckChar({ size = 80, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* ── 影 ── */}
      <ellipse cx="100" cy="214" rx="46" ry="7" fill="#d6ccc4" opacity="0.5" />

      {/* ── 胴体 ── */}
      <ellipse cx="100" cy="168" rx="54" ry="46" fill="white" />
      <ellipse cx="100" cy="168" rx="54" ry="46" stroke="#3a2820" strokeWidth="3" strokeLinejoin="round" />

      {/* ── 頭 ── */}
      <circle cx="100" cy="86" r="54" fill="white" />
      <circle cx="100" cy="86" r="54" stroke="#3a2820" strokeWidth="3" />

      {/* ── 葉っぱ（メガネの右後ろ） ── */}
      <path
        d="M 124 44 C 148 28 162 44 148 58 C 162 40 138 30 124 44 Z"
        fill="#72b55a"
        stroke="#3a2820"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M 124 44 L 148 58" stroke="#3a2820" strokeWidth="1.5" strokeLinecap="round" />

      {/* ── メガネ（頭の上、額あたり） ── */}
      {/* 左レンズ */}
      <circle cx="84" cy="58" r="16" fill="white" fillOpacity="0.15" stroke="#3a2820" strokeWidth="3" />
      {/* 右レンズ */}
      <circle cx="114" cy="58" r="16" fill="white" fillOpacity="0.15" stroke="#3a2820" strokeWidth="3" />
      {/* ブリッジ */}
      <line x1="100" y1="58" x2="98" y2="58" stroke="#3a2820" strokeWidth="3" strokeLinecap="round" />
      {/* 左テンプル */}
      <line x1="68" y1="56" x2="56" y2="54" stroke="#3a2820" strokeWidth="2.5" strokeLinecap="round" />
      {/* 右テンプル */}
      <line x1="130" y1="56" x2="144" y2="54" stroke="#3a2820" strokeWidth="2.5" strokeLinecap="round" />

      {/* ── 目 ── */}
      <circle cx="86" cy="96" r="5.5" fill="#3a2820" />
      <circle cx="114" cy="96" r="5.5" fill="#3a2820" />
      {/* 目のハイライト */}
      <circle cx="88" cy="94" r="2" fill="white" />
      <circle cx="116" cy="94" r="2" fill="white" />

      {/* ── くちばし ── */}
      <path
        d="M 82 112 Q 100 128 118 112 L 116 120 Q 100 134 84 120 Z"
        fill="#e8a020"
        stroke="#3a2820"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 鼻の穴 */}
      <ellipse cx="96" cy="115" rx="2.5" ry="1.5" fill="#c88010" />

      {/* ── 白衣 ── */}
      {/* 白衣本体 */}
      <path
        d="M 50 148 L 46 205 L 154 205 L 150 148 Q 100 138 50 148 Z"
        fill="white"
        stroke="#3a2820"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* 左ラペル */}
      <path
        d="M 100 146 L 78 174 L 94 170 Z"
        fill="#f0ebe4"
        stroke="#3a2820"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 右ラペル */}
      <path
        d="M 100 146 L 122 174 L 106 170 Z"
        fill="#f0ebe4"
        stroke="#3a2820"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* ボタン */}
      <circle cx="100" cy="182" r="3" fill="none" stroke="#3a2820" strokeWidth="2" />
      <circle cx="100" cy="194" r="3" fill="none" stroke="#3a2820" strokeWidth="2" />
      {/* ポケット */}
      <rect x="112" y="172" width="20" height="14" rx="3" fill="none" stroke="#3a2820" strokeWidth="2" />

      {/* ── 翼（右） ── */}
      <path
        d="M 150 162 Q 170 166 166 182 Q 156 178 150 162 Z"
        fill="white"
        stroke="#3a2820"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* ── 足 ── */}
      {/* 左足 */}
      <path
        d="M 78 205 Q 64 208 60 218 Q 80 215 86 205 Z"
        fill="#e8a020"
        stroke="#3a2820"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 右足 */}
      <path
        d="M 122 205 Q 136 208 140 218 Q 120 215 114 205 Z"
        fill="#e8a020"
        stroke="#3a2820"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
