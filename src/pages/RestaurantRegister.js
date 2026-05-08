import styles from "./InfoPage.module.css";

function RestaurantRegister() {
  return (
    <main className={styles.container}>
      <h1>加盟レストランとして登録する</h1>

      <section>
        <h2>メシドアに加盟しませんか？</h2>
        <p>
          メシドアでは、地域のお客様に料理を届けたいレストラン・飲食店を募集しています。
        </p>
      </section>

      <section>
        <h2>加盟のメリット</h2>
        <ul>
          <li>新しいお客様にお店を知ってもらえます。</li>
          <li>オンライン注文に対応できます。</li>
          <li>店舗の売上拡大につなげることができます。</li>
        </ul>
      </section>

      <section>
        <h2>登録の流れ</h2>
        <ol>
          <li>登録フォームから申請</li>
          <li>担当者による確認</li>
          <li>店舗情報の登録</li>
          <li>掲載開始</li>
        </ol>
      </section>
    </main>
  );
}

export default RestaurantRegister;