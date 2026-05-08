import { useState } from "react";
import styles from "./InfoPage.module.css";

const stores = [
  {
    id: 1,
    category: "寿司",
    name: "メシドア 築地寿司店",
    description: "新鮮な寿司と海鮮丼を扱う店舗",
    city: "東京",
    address: "東京都中央区築地 4-10-5",
  },
  {
    id: 2,
    category: "バーガー",
    name: "メシドア 渋谷バーガー",
    description: "ボリュームのあるバーガー専門店",
    city: "東京",
    address: "東京都渋谷区宇田川町 21-1",
  },
  {
    id: 3,
    category: "中華料理",
    name: "メシドア 横浜中華",
    description: "中華料理と麺料理を楽しめる店舗",
    city: "横浜",
    address: "神奈川県横浜市中区山下町 80",
  },
  {
    id: 4,
    category: "韓国料理",
    name: "メシドア 新大久保韓国食堂",
    description: "ビビンバ、トッポギなどの韓国料理",
    city: "東京",
    address: "東京都新宿区百人町 1-8-11",
  },
  {
    id: 5,
    category: "麺料理",
    name: "メシドア 大阪麺屋",
    description: "焼きそばとうどんを中心にした麺料理",
    city: "大阪",
    address: "大阪府大阪市北区梅田 3-1-1",
  },
  {
    id: 6,
    category: "カレー",
    name: "メシドア 福岡カレー",
    description: "スパイス香るカレーを届ける店舗",
    city: "福岡",
    address: "福岡県福岡市博多区博多駅中央街 1-1",
  },
];

const cities = ["全ての都市", "東京", "横浜", "大阪", "福岡"];

function MapPage() {
  const [selectedCity, setSelectedCity] = useState("全ての都市");

  const filteredStores =
    selectedCity === "全ての都市"
      ? stores
      : stores.filter((store) => store.city === selectedCity);

  const openGoogleMap = (address) => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;

    window.open(mapUrl, "_blank", "noreferrer");
  };

  return (
    <main className={styles.container}>
      <h1>地図</h1>

      <section className={styles.mapSearchSection}>
        <h2>店舗を探す</h2>
        <p>都市を選択すると、対象エリアの店舗だけを表示できます。</p>

        <div className={styles.cityButtonList}>
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              className={`${styles.cityButton} ${
                selectedCity === city ? styles.cityButtonActive : ""
              }`}
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.storeListSection}>
        <div className={styles.sectionTitleRow}>
          <h2>{selectedCity}</h2>
          <span>{filteredStores.length}件</span>
        </div>

        <div className={styles.storeGrid}>
          {filteredStores.map((store) => (
            <article key={store.id} className={styles.storeCard}>
              <p className={styles.storeCategory}>{store.category}</p>
              <h3>{store.name}</h3>
              <p className={styles.storeDescription}>{store.description}</p>
              <p className={styles.storeCity}>{store.city}</p>
              <p className={styles.storeAddress}>{store.address}</p>

              <button
                type="button"
                className={styles.mapButton}
                onClick={() => openGoogleMap(store.address)}
              >
                店舗を見る
              </button>
            </article>
          ))}
        </div>

        <p className={styles.noticeText}>
          ※ 本住所は実在する店舗情報ではありません。
        </p>
      </section>
    </main>
  );
}

export default MapPage;