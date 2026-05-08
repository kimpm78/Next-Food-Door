import styles from "./InfoPage.module.css";

function DeliveryPartnerRegister() {
  return (
    <main className={styles.container}>
      <h1>配達パートナーとして登録する</h1>

      <section>
        <h2>配達パートナー募集</h2>
        <p>
          メシドアでは、料理をお客様のもとへ届ける配達パートナーを募集しています。
        </p>
      </section>

      <section>
        <h2>働き方</h2>
        <ul>
          <li>空いている時間を活用できます。</li>
          <li>自分のペースで配達できます。</li>
          <li>地域の飲食店とお客様をつなぐ仕事です。</li>
        </ul>
      </section>

      <section>
        <h2>登録の流れ</h2>
        <ol>
          <li>登録申請</li>
          <li>本人確認</li>
          <li>配達方法の確認</li>
          <li>配達開始</li>
        </ol>
      </section>
    </main>
  );
}

export default DeliveryPartnerRegister;