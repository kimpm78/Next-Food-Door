import styles from "./InfoPage.module.css";

function DeliveryGuide() {
  return (
    <main className={styles.container}>
      <h1>配達</h1>

      <section>
        <h2>配達について</h2>
        <p>メシドアでは、注文された料理を指定された住所までお届けします。</p>
      </section>

      <section>
        <h2>配達時間</h2>
        <p>
          配達時間は、店舗の準備状況、配達エリア、交通状況により変動する場合があります。
        </p>
      </section>

      <section>
        <h2>注意事項</h2>
        <ul>
          <li>配送先住所に誤りがないかご確認ください。</li>
          <li>受け取り可能な時間帯にご注文ください。</li>
          <li>天候や混雑状況により遅れる場合があります。</li>
        </ul>
      </section>
    </main>
  );
}

export default DeliveryGuide;