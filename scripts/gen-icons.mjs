/**
 * SVGからPWAアイコン（192×192, 512×512）を生成するスクリプト
 * 実行: node scripts/gen-icons.mjs
 */
import { Resvg } from '@resvg/resvg-js'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../public/icons')
mkdirSync(outDir, { recursive: true })

// ベージュ背景付きアヒルSVG
const svgSource = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- 背景（アプリのbg色） -->
  <rect width="512" height="512" rx="112" fill="#f5f0eb"/>

  <!-- 影 -->
  <ellipse cx="256" cy="488" rx="110" ry="16" fill="#d6ccc4" opacity="0.5"/>

  <!-- 胴体 -->
  <ellipse cx="256" cy="376" rx="128" ry="108" fill="white"/>
  <ellipse cx="256" cy="376" rx="128" ry="108" stroke="#3a2820" stroke-width="7"/>

  <!-- 頭 -->
  <circle cx="256" cy="192" r="128" fill="white"/>
  <circle cx="256" cy="192" r="128" stroke="#3a2820" stroke-width="7"/>

  <!-- 葉っぱ -->
  <path d="M 318 100 C 378 64 410 104 378 136 C 410 92 350 72 318 100 Z" fill="#72b55a" stroke="#3a2820" stroke-width="5"/>
  <path d="M 318 100 L 378 136" stroke="#3a2820" stroke-width="4" stroke-linecap="round"/>

  <!-- 左メガネ -->
  <circle cx="214" cy="130" r="38" fill="white" fill-opacity="0.1" stroke="#3a2820" stroke-width="7"/>
  <!-- 右メガネ -->
  <circle cx="292" cy="130" r="38" fill="white" fill-opacity="0.1" stroke="#3a2820" stroke-width="7"/>
  <!-- ブリッジ -->
  <line x1="252" y1="130" x2="254" y2="130" stroke="#3a2820" stroke-width="7" stroke-linecap="round"/>
  <!-- 左テンプル -->
  <line x1="176" y1="126" x2="146" y2="122" stroke="#3a2820" stroke-width="6" stroke-linecap="round"/>
  <!-- 右テンプル -->
  <line x1="330" y1="126" x2="360" y2="122" stroke="#3a2820" stroke-width="6" stroke-linecap="round"/>

  <!-- 目 -->
  <circle cx="218" cy="216" r="13" fill="#3a2820"/>
  <circle cx="294" cy="216" r="13" fill="#3a2820"/>
  <circle cx="223" cy="210" r="5" fill="white"/>
  <circle cx="299" cy="210" r="5" fill="white"/>

  <!-- くちばし -->
  <path d="M 204 256 Q 256 300 308 256 L 304 272 Q 256 314 208 272 Z" fill="#e8a020" stroke="#3a2820" stroke-width="5"/>
  <ellipse cx="246" cy="262" rx="6" ry="4" fill="#c88010"/>

  <!-- 白衣本体 -->
  <path d="M 134 330 L 124 480 L 388 480 L 378 330 Q 256 308 134 330 Z" fill="white" stroke="#3a2820" stroke-width="7"/>
  <!-- 左ラペル -->
  <path d="M 256 326 L 200 400 L 238 392 Z" fill="#f0ebe4" stroke="#3a2820" stroke-width="5"/>
  <!-- 右ラペル -->
  <path d="M 256 326 L 312 400 L 274 392 Z" fill="#f0ebe4" stroke="#3a2820" stroke-width="5"/>
  <!-- ボタン -->
  <circle cx="256" cy="416" r="7" fill="none" stroke="#3a2820" stroke-width="5"/>
  <circle cx="256" cy="446" r="7" fill="none" stroke="#3a2820" stroke-width="5"/>
  <!-- ポケット -->
  <rect x="288" y="394" width="48" height="34" rx="7" fill="none" stroke="#3a2820" stroke-width="5"/>

  <!-- 翼（右） -->
  <path d="M 378 362 Q 422 372 414 408 Q 392 398 378 362 Z" fill="white" stroke="#3a2820" stroke-width="5"/>

  <!-- 左足 -->
  <path d="M 200 480 Q 160 490 152 512 Q 200 506 216 480 Z" fill="#e8a020" stroke="#3a2820" stroke-width="5"/>
  <!-- 右足 -->
  <path d="M 312 480 Q 352 490 360 512 Q 312 506 296 480 Z" fill="#e8a020" stroke="#3a2820" stroke-width="5"/>
</svg>`

function generate(svgStr, size, filename) {
  const resvg = new Resvg(svgStr, {
    fitTo: { mode: 'width', value: size },
  })
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()
  writeFileSync(join(outDir, filename), pngBuffer)
  console.log(`✓ ${filename} (${size}×${size})`)
}

generate(svgSource, 192, 'icon-192.png')
generate(svgSource, 512, 'icon-512.png')

console.log('\nアイコン生成完了 → public/icons/')
