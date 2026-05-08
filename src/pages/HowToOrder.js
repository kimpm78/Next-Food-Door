import styles from "./InfoPage.module.css";

function HowToOrder() {
  return (
    <main className={styles.container}>
      <h1>注文する</h1>

      <section>
        <h2>注文の流れ</h2>
        <ol>
          <li>食べたい料理やレストランを選択します。</li>
          <li>商品をカートに追加します。</li>
          <li>注文内容と配送先を確認します。</li>
          <li>注文を確定します。</li>
        </ol>
      </section>

      <section>
        <h2>注文前の確認事項</h2>
        <p>
          商品内容、数量、配送先、合計金額を確認してから注文を確定してください。
        </p>
      </section>
    </main>
  );
}

export default HowToOrder;