/**
 * duck-source.png → icon-192.png / icon-512.png を生成
 * 実行: node scripts/gen-icons.mjs
 */
import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = join(__dirname, '../public/icons/duck-source.png')
const outDir = join(__dirname, '../public/icons')

// アプリの背景色 #f5f0eb をベージュ背景として合成
const bg = { r: 245, g: 240, b: 235, alpha: 1 }

async function generate(size, filename) {
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: bg,
    }
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

await generate(192, 'icon-192.png')
await generate(512, 'icon-512.png')

console.log('\nアイコン生成完了')
