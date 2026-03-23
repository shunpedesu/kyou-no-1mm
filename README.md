# 今日の1ミリ

> 使う時間が短いほどよいアプリ

毎日ほんの少しだけ、自分のために動く。
見たらすぐ閉じる。それだけでいい。

---

## 思想

- **開いたらすぐ閉じる** — 操作は最小限。考えさせない。
- **できなくても大丈夫** — 「見ただけ」でも記録になる。
- **数字で煽らない** — 統計はあるが、プレッシャーを与えない。
- **依存させない** — ご褒美設計をしない。習慣ではなく、今日一日のための道具。

---

## 機能

| 機能 | 説明 |
|------|------|
| 1ミリ提案 | 毎日1つ、日付シードでランダム表示（36種） |
| できた / 見ただけ | 2段階の記録。どちらでも十分 |
| メモ | 省略可能な1行メモ（100文字以内） |
| 記録画面 | 直近7日のドット + 累計統計（回数・連続日数） |
| オフライン対応 | Service Worker でキャッシュ。ネット不要で動作 |
| PWA | ホーム画面に追加可能（iOS / Android） |

---

## 技術スタック

- **React 18** + **Vite 5**
- **vite-plugin-pwa** — Service Worker / Web App Manifest 自動生成
- **Workbox** — キャッシュ戦略（CacheFirst / navigateFallback）
- **localStorage** — 外部APIなし・完全オフライン動作
- CSS Custom Properties — デザイントークン管理

---

## ファイル構成

```
kyou-no-1mm/
├── public/
│   ├── icons/
│   │   ├── icon-192.png   ← 要作成（PWAアイコン）
│   │   └── icon-512.png   ← 要作成（maskable対応推奨）
│   └── _redirects         ← Netlify SPA用
├── src/
│   ├── components/
│   │   ├── Onboarding.jsx  初回3ステップ説明
│   │   ├── Home.jsx        メイン画面（提案 + 3ボタン + メモ）
│   │   └── History.jsx     記録一覧（統計 + 週次ドット + 7日分）
│   ├── data/
│   │   └── suggestions.js  提案リスト36件 + 取得関数
│   ├── hooks/
│   │   └── useStorage.js   localStorage操作・統計計算
│   ├── App.jsx             画面ルーティング（state管理のみ）
│   ├── main.jsx
│   └── index.css           スマホファーストCSS
├── index.html              OGP・iOS PWA メタタグ
├── vite.config.js          PWA・Workbox設定
├── vercel.json             Vercel SPA用リダイレクト
└── package.json
```

---

## ローカル起動

```bash
# 依存インストール
npm install

# 開発サーバー起動（http://localhost:5173）
npm run dev

# 本番ビルド
npm run build

# ビルド確認（Service Worker も動作）
npm run preview
```

> **注意**: Service Worker は `npm run preview` のHTTPS相当環境でないと完全には動作しません。
> 開発中は `vite.config.js` の `devOptions.enabled` を `true` にすると dev でも確認できます。

---

## PWAアイコンの作成

`public/icons/` に以下の2ファイルが必要です。

| ファイル名 | サイズ | 用途 |
|------------|--------|------|
| `icon-192.png` | 192×192px | Android ホーム画面 |
| `icon-512.png` | 512×512px | スプラッシュ・高解像度 |

**無料で作る方法:**

1. [Favicon.io](https://favicon.io/) や [RealFaviconGenerator](https://realfavicongenerator.net/) で生成
2. Figma や Canva で正方形の画像を作って書き出し
3. `icon-512.png` は maskable 対応のため、重要なデザインを中央80%以内に収める

---

## 公開手順

### Vercel（推奨・無料）

1. [github.com](https://github.com) にリポジトリを作成してプッシュ
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_NAME/kyou-no-1mm.git
   git push -u origin main
   ```

2. [vercel.com](https://vercel.com) にアクセスして GitHub でサインイン

3. 「New Project」→ リポジトリを選択

4. 設定はデフォルトのままで「Deploy」をクリック
   - Framework: **Vite** が自動検出されます
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. 数分でURLが発行されます（例: `https://kyou-no-1mm.vercel.app`）

---

### Netlify（代替・無料）

1. GitHubにリポジトリをプッシュ（上記と同じ）

2. [netlify.com](https://netlify.com) にアクセスして「Import from Git」

3. リポジトリを選択 → 設定:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

4. 「Deploy site」をクリック

> `public/_redirects` が含まれているので SPA ルーティングは自動で動作します。

---

## スマホのホーム画面に追加する方法

### iPhone（Safari）

1. Safari でアプリのURLを開く
2. 画面下部の **共有ボタン（四角に矢印）** をタップ
3. 「**ホーム画面に追加**」をタップ
4. 名前を確認して「追加」

→ ホーム画面にアイコンが追加され、フルスクリーンで起動します。

### Android（Chrome）

1. Chrome でURLを開く
2. 右上のメニュー（⋮）→「**ホーム画面に追加**」
3. または、アドレスバー近くに自動で「インストール」バナーが表示される場合あり

---

## 初回公開後に確認すべきポイント

- [ ] スマホ実機のSafari/Chromeで開いて表示が崩れないか確認
- [ ] iOSのホーム画面追加 → フルスクリーンで起動するか確認
- [ ] ホーム画面から起動後、機内モードにしてもアプリが動くか（オフライン確認）
- [ ] 「できた」を押したあとにスムーズに完了画面に遷移するか
- [ ] メモを入力したとき、iOSキーボードで画面がズームインしないか確認
- [ ] ホーム画面の提案テキストが端末の幅で折り返されすぎていないか
- [ ] Chrome DevTools の Lighthouse でPWAスコアを確認（目標: 90以上）

---

## 将来の改善案

### 1. 朝のプッシュ通知
Web Push API を使って毎朝「今日の1ミリ」をプッシュ通知。
Service Workerがあるため技術的な土台は揃っている。
通知はあくまでやさしい問いかけ、リマインダーではなく「届いたら嬉しい」程度に設計する。

### 2. 提案のカスタマイズ
「自分だけの1ミリ」をユーザーが追加・編集できる機能。
既存の提案は残しつつ、マイ提案を優先表示するオプション。
データはlocalStorageで完結するため、外部サービス不要。

### 3. 週単位のふりかえり
毎週月曜日に「先週の自分へ」的な簡単な振り返りメモを書けるスペース。
分析ではなく、記録。グラフや数字は出さない。
「先週は3回できた」ではなく「先週どんな感じだったか」を一言で残す場所。

---

## ライセンス

MIT
