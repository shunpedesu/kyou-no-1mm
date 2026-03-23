/**
 * duck-source.png の白背景を透過化して src/assets/duck.png に保存
 * フラッドフィルで画像の四隅から連続する白系ピクセルだけを透明にする
 * （キャラクター内部の白い部分は保持される）
 * 実行: node scripts/remove-bg.mjs
 */
import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcFile = join(__dirname, '../public/icons/duck-source.png')
const outFile = join(__dirname, '../src/assets/duck.png')

const { data, info } = await sharp(srcFile)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height } = info
const visited = new Uint8Array(width * height)
const queue = []

function enqueue(x, y) {
  if (x < 0 || x >= width || y < 0 || y >= height) return
  const idx = y * width + x
  if (visited[idx]) return
  visited[idx] = 1
  queue.push(x, y)
}

// 4辺すべてのピクセルをキューに追加
for (let x = 0; x < width; x++) { enqueue(x, 0); enqueue(x, height - 1) }
for (let y = 0; y < height; y++) { enqueue(0, y); enqueue(width - 1, y) }

const THRESHOLD = 240  // 240以上のRGBを「背景の白」と判定

let qi = 0
while (qi < queue.length) {
  const x = queue[qi++]
  const y = queue[qi++]
  const px = (y * width + x) * 4
  const r = data[px], g = data[px + 1], b = data[px + 2]

  if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
    data[px + 3] = 0  // 透明化
    enqueue(x - 1, y); enqueue(x + 1, y)
    enqueue(x, y - 1); enqueue(x, y + 1)
  }
}

await sharp(Buffer.from(data), { raw: { width, height, channels: 4 } })
  .png()
  .toFile(outFile)

console.log(`✓ duck.png (${width}x${height}) — 白背景を透過化`)
