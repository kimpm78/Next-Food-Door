import styles from "./InfoPage.module.css";

function BusinessRegister() {
  return (
    <main className={styles.container}>
      <h1>ビジネス用アカウントを作成する</h1>

      <section>
        <h2>法人・団体向けサービス</h2>
        <p>
          メシドアのビジネス用アカウントでは、会社やチームでの食事注文を便利に管理できます。
        </p>
      </section>

      <section>
        <h2>利用シーン</h2>
        <ul>
          <li>会議用の食事注文</li>
          <li>社内イベント用のまとめ注文</li>
          <li>チーム単位でのランチ注文</li>
        </ul>
      </section>

      <section>
        <h2>登録の流れ</h2>
        <ol>
          <li>会社情報を登録</li>
          <li>担当者情報を入力</li>
          <li>利用内容を確認</li>
          <li>アカウント作成完了</li>
        </ol>
      </section>
    </main>
  );
}

export default BusinessRegister;