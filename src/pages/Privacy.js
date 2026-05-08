import styles from "./InfoPage.module.css";

function Privacy() {
  return (
    <main className={styles.container}>
      <h1>個人情報保護方針</h1>

      <section>
        <h2>1. 個人情報の取得について</h2>
        <p>
          メシドアでは、注文受付、配送、問い合わせ対応のために、
          氏名、住所、電話番号、メールアドレスなどの情報を取得する場合があります。
        </p>
      </section>

      <section>
        <h2>2. 個人情報の利用目的</h2>
        <p>
          取得した個人情報は、注文処理、配送対応、サービス改善、
          お問い合わせへの回答のために利用します。
        </p>
      </section>

      <section>
        <h2>3. 第三者提供について</h2>
        <p>
          法令に基づく場合を除き、本人の同意なく第三者へ個人情報を提供することはありません。
        </p>
      </section>

      <section>
        <h2>4. 個人情報の管理</h2>
        <p>
          個人情報の漏えい、紛失、改ざんを防ぐため、適切な安全管理を行います。
        </p>
      </section>
    </main>
  );
}

export default Privacy;