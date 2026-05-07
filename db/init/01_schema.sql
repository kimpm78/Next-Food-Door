CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(30) NOT NULL,
  terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name VARCHAR(100) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stores (
  id VARCHAR(20) PRIMARY KEY,
  category_id BIGINT REFERENCES categories(id),
  name VARCHAR(160) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  store_id VARCHAR(20) REFERENCES stores(id),
  category_id BIGINT NOT NULL REFERENCES categories(id),
  name VARCHAR(160) NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  image_url TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO admin_users (email, password_hash, name)
VALUES (
  'admin@nextfooddoor.com',
  crypt('admin1234', gen_salt('bf')),
  'メシドア管理者'
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO categories (name, slug)
VALUES
  ('Sushi', 'sushi'),
  ('Burger', 'burger'),
  ('Chinese', 'chinese'),
  ('Korean', 'korean'),
  ('Noodles', 'noodles'),
  ('Curry', 'curry')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO stores (id, category_id, name, city, address, description, image_url)
SELECT 's1', id, 'メシドア 築地寿司店', '東京', '東京都中央区築地 4-10-5', '新鮮な寿司と海鮮丼を扱う店舗', '/assets/maguro.png'
FROM categories WHERE slug = 'sushi'
ON CONFLICT (id) DO NOTHING;

INSERT INTO stores (id, category_id, name, city, address, description, image_url)
SELECT 's2', id, 'メシドア 渋谷バーガー', '東京', '東京都渋谷区宇田川町 21-1', 'ボリュームのあるバーガー専門店', '/assets/barbecue_burger.png'
FROM categories WHERE slug = 'burger'
ON CONFLICT (id) DO NOTHING;

INSERT INTO stores (id, category_id, name, city, address, description, image_url)
SELECT 's3', id, 'メシドア 横浜中華', '横浜', '神奈川県横浜市中区山下町 80', '中華料理と麺料理を楽しめる店舗', '/assets/food13.png'
FROM categories WHERE slug = 'chinese'
ON CONFLICT (id) DO NOTHING;

INSERT INTO stores (id, category_id, name, city, address, description, image_url)
SELECT 's4', id, 'メシドア 新大久保韓国食堂', '東京', '東京都新宿区百人町 1-8-11', 'ビビンバ、トッポギなどの韓国料理', '/assets/food11.png'
FROM categories WHERE slug = 'korean'
ON CONFLICT (id) DO NOTHING;

INSERT INTO stores (id, category_id, name, city, address, description, image_url)
SELECT 's5', id, 'メシドア 大阪麺屋', '大阪', '大阪府大阪市北区梅田 3-1-1', '焼きそばとうどんを中心にした麺料理', '/assets/food14.png'
FROM categories WHERE slug = 'noodles'
ON CONFLICT (id) DO NOTHING;

INSERT INTO stores (id, category_id, name, city, address, description, image_url)
SELECT 's6', id, 'メシドア 福岡カレー', '福岡', '福岡県福岡市博多区博多駅中央街 1-1', 'スパイス香るカレーを届ける店舗', '/assets/food12.png'
FROM categories WHERE slug = 'curry'
ON CONFLICT (id) DO NOTHING;
