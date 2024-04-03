import classes from "./MealsSummary.module.css";
import mealsImage from "../../assets/delivery01.png";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <div className={classes["summary-wrapper"]}>
        <h2>お腹が空いたら手軽に注文</h2>
        <p>お気に入りレストラン、カテゴリ、料理名を検索できます。</p>
      </div>
      <div className={classes["summary-img"]}>
        <img src={mealsImage} alt="Delicious food!" />
      </div>
    </section>
  );
};

export default MealsSummary;
