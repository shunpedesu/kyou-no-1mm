/**
 * duck-source.png → icon-192.png / icon-512.png / ogp.png を生成
 * 実行: node scripts/gen-icons.mjs
 */
import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = join(__dirname, '../public/icons/duck-source.png')
const outDir = join(__dirname, '../public/icons')

// アプリの背景色 #f5f0eb
const bg = { r: 245, g: 240, b: 235, alpha: 1 }

// 白背景をフラッドフィルで透過化したバッファを返す
async function makeTransparent(inputPath) {
  const { data, info } = await sharp(inputPath)
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

  for (let x = 0; x < width; x++) { enqueue(x, 0); enqueue(x, height - 1) }
  for (let y = 0; y < height; y++) { enqueue(0, y); enqueue(width - 1, y) }

  const THRESHOLD = 240
  let qi = 0
  while (qi < queue.length) {
    const x = queue[qi++]
    const y = queue[qi++]
    const px = (y * width + x) * 4
    const r = data[px], g = data[px + 1], b = data[px + 2]
    if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
      data[px + 3] = 0
      enqueue(x - 1, y); enqueue(x + 1, y)
      enqueue(x, y - 1); enqueue(x, y + 1)
    }
  }

  return sharp(Buffer.from(data), { raw: { width, height, channels: 4 } }).png().toBuffer()
}

// 正方形アイコン生成
async function generateIcon(size, filename) {
  await sharp({
    create: { width: size, height: size, channels: 4, background: bg }
  })
  .composite([{
    input: await sharp(src)
      .resize(Math.round(size * 0.82), Math.round(size * 0.82), {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer(),
    gravity: 'center',
  }])
  .png()
  .toFile(join(outDir, filename))
  console.log(`✓ ${filename} (${size}×${size})`)
}

// OGP画像生成 (1200×630)
async function generateOgp() {
  const duckBuf = await makeTransparent(src)
  const duckSize = 380

  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: bg }
  })
  .composite([{
    input: await sharp(duckBuf)
      .resize(duckSize, duckSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer(),
    gravity: 'center',
  }])
  .flatten({ background: { r: 245, g: 240, b: 235 } })
  .png()
  .toFile(join(outDir, 'ogp.png'))
  console.log('✓ ogp.png (1200×630)')
}

await generateIcon(192, 'icon-192.png')
await generateIcon(512, 'icon-512.png')
await generateOgp()

console.log('\nアイコン生成完了')
