# メシドア

- 前回のプロジェクト（Food Eats）のリニューアル。

- メシドアは食べ物を届ける配達サービスのプロジェクトです。

## 開発言語 /フレームワーク

- JavaScript
- React ver.18
- emotion

## ライブラリ

- Eslint
- prettier
- mui

## 開発環境

- node.js

## バージョン管理

- GitHub

## 進捗管理

- Google spread sheet

## 画面設計

- Figma

## dev実行

- npm run dev

Dockerを使用して、フロントエンド、PostgreSQL、pgAdminをまとめて起動できます。

```bash
docker compose up -d
```

- Frontend: `http://localhost:3000/Next-Food-Door`
- Admin API: `http://localhost:4000/api`
- PostgreSQL: `localhost:5433`
- pgAdmin: `http://localhost:5050`

## PostgreSQL / pgAdmin

Docker Composeを実行すると、PostgreSQLとpgAdminも同時に起動します。

```bash
docker compose up -d
```

- PostgreSQL: `localhost:5433`
- Database: `next_food_door`
- User: `next_food_door`
- Password: `next_food_door_password`
- pgAdmin: `http://localhost:5050`
- pgAdmin Login: `admin@nextfooddoor.com` / `admin1234`

pgAdminでサーバーを追加する際は、HostにDocker内部のサービス名である `postgres`、Portに `5432` を指定してください。

管理者ログインはAdmin APIがPostgreSQLの `admin_users` テーブルを確認します。
会員情報や商品登録データは、現時点ではReact画面で `localStorage` に一時保存しています。

## 화면

- `/login`: ログイン
- `/signup`: 会員登録
- `/signup-complete`: 会員登録完了
- `/admin`: 管理者ログインおよびカテゴリ別の商品登録

管理者テストアカウントは `admin@nextfooddoor.com` / `admin1234` です。
