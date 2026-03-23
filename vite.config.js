import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages では /kyou-no-1mm/ 、Vercel/Netlify では /
const base = process.env.VITE_BASE_URL || '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png', 'screenshots/*.png'],
      manifest: {
        name: '今日の1ミリ',
        short_name: '1ミリ',
        description: '毎日ほんの少しだけ、自分のために動く',
        lang: 'ja',
        theme_color: '#f5f0eb',
        background_color: '#f5f0eb',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui'],
        orientation: 'portrait',
        dir: 'ltr',
        start_url: base,
        scope: base,
        id: base,
        categories: ['health', 'lifestyle', 'productivity'],
        screenshots: [
          {
            src: 'screenshots/home.png',
            sizes: '1080x2400',
            type: 'image/png',
            form_factor: 'narrow',
            label: '今日の1ミリ提案画面'
          },
          {
            src: 'screenshots/done.png',
            sizes: '1080x2400',
            type: 'image/png',
            form_factor: 'narrow',
            label: '完了後のメッセージ画面'
          },
          {
            src: 'screenshots/history.png',
            sizes: '1080x2400',
            type: 'image/png',
            form_factor: 'narrow',
            label: '記録・ストリーク画面'
          }
        ],
        shortcuts: [
          {
            name: '今日の1ミリを見る',
            short_name: 'ホーム',
            url: base,
            icons: [{ src: 'icons/icon-192.png', sizes: '192x192' }]
          }
        ],
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // SPA: オフライン時もindex.htmlを返す
        navigateFallback: `${base}index.html`,
        navigateFallbackDenylist: [/^\/api/],
        // キャッシュ戦略: アプリシェルは即キャッシュ
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\./,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          }
        ]
      },
      // devでもSW動作を確認したい場合は true に
      devOptions: {
        enabled: false
      }
    })
  ]
})
