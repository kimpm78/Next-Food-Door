import styles from "./InfoPage.module.css";

function About() {
  return (
    <main className={styles.container}>
      <h1>メシドアについて</h1>

      <section>
        <h2>サービス紹介</h2>
        <p>
          メシドアは、自宅やオフィスから簡単に料理を注文できる
          フードデリバリーサービスです。
        </p>
        <p>
          お客様が食べたい料理をすぐに見つけられるよう、
          分かりやすい画面とスムーズな注文体験を提供します。
        </p>
      </section>

      <section>
        <h2>メシドアの特徴</h2>
        <ul>
          <li>人気メニューを簡単に検索できます。</li>
          <li>カートに商品を追加してまとめて注文できます。</li>
          <li>注文内容を分かりやすく確認できます。</li>
        </ul>
      </section>
    </main>
  );
}

export default About;