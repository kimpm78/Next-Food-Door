import styles from "./InfoPage.module.css";

function AppDownload() {
  return (
    <main className={styles.container}>
      <h1>アプリダウンロード</h1>

      <section>
        <h2>メシドアをもっと便利に</h2>
        <p>
          メシドアのアプリを利用すると、料理の検索、注文、配達状況の確認を
          よりスムーズに行うことができます。
        </p>
      </section>

      <section>
        <h2>主な機能</h2>
        <ul>
          <li>お気に入りレストランの確認</li>
          <li>注文履歴の確認</li>
          <li>配達状況の確認</li>
          <li>お知らせの受信</li>
        </ul>
      </section>

      <section>
        <h2>ダウンロード</h2>
        <p>現在、アプリダウンロードページを準備中です。</p>
      </section>
    </main>
  );
}

export default AppDownload;