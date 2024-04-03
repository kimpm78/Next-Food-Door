import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "まぐろ（寿司）",
    description: "最高級の魚と野菜",
    price: 110,
  },
  {
    id: "m2",
    name: "シュニッツェル",
    description: "ドイツの名物",
    price: 699,
  },
  {
    id: "m3",
    name: "バーベキューバーガー",
    description: "アメリカ産、生、肉質",
    price: 1380,
  },
  {
    id: "m4",
    name: "四川風冷奴",
    description: "中華料理",
    price: 420,
  },
  {
    id: "m5",
    name: "グリーンボウル",
    description: "中華料理",
    price: 450,
  },
  {
    id: "m6",
    name: "スタミナニンニク唐揚げ",
    description: "中華料理",
    price: 300,
  },
  {
    id: "m7",
    name: "イカとセロリ和え",
    description: "中華料理",
    price: 680,
  },
  {
    id: "m8",
    name: "中華風クレープ巻き",
    description: "中華料理",
    price: 420,
  },
  {
    id: "m9",
    name: "グリーンボウル",
    description: "中華料理",
    price: 450,
  },
  {
    id: "m10",
    name: "トッポギ",
    description: "韓国料理",
    price: 250,
  },
  {
    id: "m11",
    name: "ビビンバ",
    description: "韓国料理",
    price: 680,
  },
  {
    id: "m12",
    name: "レッドカレー",
    description: "インド料理",
    price: 680,
  },
  {
    id: "m13",
    name: "担々麺",
    description: "中華料理",
    price: 680,
  },
  {
    id: "m14",
    name: "焼きそば",
    description: "麺料理",
    price: 680,
  },
];
// MealItem Props를 가져와서 마크업
const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
