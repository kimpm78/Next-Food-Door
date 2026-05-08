import styles from "./InfoPage.module.css";

function Terms() {
  return (
    <main className={styles.container}>
      <h1>利用規約</h1>

      <section>
        <h2>1. 本規約について</h2>
        <p>
          本規約は、メシドアが提供するフードデリバリーサービスの利用条件を定めるものです。
        </p>
      </section>

      <section>
        <h2>2. サービス内容</h2>
        <p>
          本サービスでは、利用者が商品を選択し、注文および配送依頼を行うことができます。
        </p>
      </section>

      <section>
        <h2>3. 注文について</h2>
        <p>
          利用者は、注文内容、配送先、金額を確認したうえで注文を確定するものとします。
        </p>
      </section>

      <section>
        <h2>4. キャンセルについて</h2>
        <p>
          注文確定後のキャンセル可否は、店舗または配送状況により異なる場合があります。
        </p>
      </section>

      <section>
        <h2>5. 禁止事項</h2>
        <ul>
          <li>虚偽情報による注文</li>
          <li>他人になりすましての利用</li>
          <li>サービス運営を妨害する行為</li>
        </ul>
      </section>
    </main>
  );
}

export default Terms;