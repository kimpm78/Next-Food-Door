import PropTypes from "prop-types";
import classes from "./LandingPage.module.css";

function LandingPage({ onNavigate }) {
  const moveToStoresHandler = () => {
    onNavigate("/");

    window.setTimeout(() => {
      const storesSection = document.getElementById("stores-section");

      if (!storesSection) {
        return;
      }

      const targetPosition =
        storesSection.getBoundingClientRect().top + window.scrollY - 80;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }, 0);
  };

  return (
    <main className={classes.landing}>
      <section className={classes.hero}>
        <div className={classes.heroContent}>
          <p className={classes.badge}>Food Delivery Service</p>

          <h1>
            食べたい料理を、
            <br />
            もっと近くに。
          </h1>

          <p className={classes.description}>
            メシドアは、寿司、バーガー、中華、韓国料理、カレーなど、
            さまざまな料理を自宅やオフィスへ届けるフードデリバリーサービスです。
          </p>

          <div className={classes.actions}>
            <button type="button" onClick={moveToStoresHandler}>
              料理を探す
            </button>
            <button type="button" onClick={() => onNavigate("/map")}>
              店舗を見る
            </button>
          </div>
        </div>

        <div className={classes.heroCard}>
          <p className={classes.cardLabel}>おすすめ</p>
          <h2>メシドア 築地寿司店</h2>
          <p>新鮮な寿司と海鮮丼をすぐに注文できます。</p>
          <span>東京 / 築地</span>
        </div>
      </section>

      <section className={classes.features}>
        <article>
          <h2>簡単注文</h2>
          <p>食べたい商品を選んで、カートからすぐに注文できます。</p>
        </article>

        <article>
          <h2>店舗検索</h2>
          <p>地図ページから対応店舗の場所を確認できます。</p>
        </article>

        <article>
          <h2>安心サポート</h2>
          <p>注文・アカウント・お支払いに関する問い合わせに対応します。</p>
        </article>
      </section>
    </main>
  );
}

LandingPage.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default LandingPage;