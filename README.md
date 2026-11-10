# MTMworkポートフォリオ

MTMwork（サイト・LP制作／ショート動画／バナー・SNS画像）のポートフォリオサイト。静的ファイルのみで構成され、ビルドは不要です。

## 構成
- `index.html` — ページ本体
- `assets/mtmwork-assets/` — 動画3本（MP4）・画像9点

## GitHubへの置き方
```bash
# GitHubで空のリポジトリ（例：mtmwork）を作成してから
git remote add origin https://github.com/<アカウント名>/mtmwork.git
git push -u origin main
```

## Cloudflare Pagesへの公開（Git連携）
1. Cloudflareダッシュボード → Workers & Pages → Create → Pages → Connect to Git
2. このリポジトリを選択
3. ビルド設定：フレームワーク プリセット「None」／ビルドコマンド 空欄／ビルド出力ディレクトリ `/`（ルート）
4. Save and Deploy → `https://mtmwork.pages.dev` のようなURLが発行される

以降は、ファイルを更新して `git push` するだけで自動で再公開されます。

## 更新のしかた
- 文言や画像を差し替えたら、同じファイル名で上書きして commit / push するだけです
- 動画を差し替える場合は H.264・yuv420p（BT.709）形式のMP4にしてください（再生互換性のため）
