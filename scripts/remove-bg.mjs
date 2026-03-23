import sharp from 'sharp'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { renameSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = resolve(__dirname, '../src/assets/duck.png')
const tmp = src + '.tmp.png'

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const threshold = 235 // 235以上のRGBを白とみなす

for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2]
  if (r >= threshold && g >= threshold && b >= threshold) {
    data[i + 3] = 0 // 透明化
  }
}

await sharp(Buffer.from(data), {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(tmp)

renameSync(tmp, src)
console.log(`Done: ${info.width}x${info.height} → white background removed`)
