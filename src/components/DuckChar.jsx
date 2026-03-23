import duckImg from '../assets/duck.png'

/**
 * アプリのマスコットキャラクター
 * size prop: px単位の数値（デフォルト 80）
 */
export default function DuckChar({ size = 80, className = '' }) {
  return (
    <img
      src={duckImg}
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      style={{ objectFit: 'contain' }}
    />
  )
}
