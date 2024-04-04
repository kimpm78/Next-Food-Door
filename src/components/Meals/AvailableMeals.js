import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "まぐろ（寿司）",
    description: "最高級の魚と野菜",
    price: 110,
    image: "https://dancyu.jp/images/kizushi165_2300x1906.jpg",
  },
  {
    id: "m2",
    name: "シュニッツェル",
    description: "ドイツの名物",
    price: 699,
    image:
      "https://world-nobulife.com/wp-content/uploads/2022/02/IMG_0320-1024x768.jpg",
  },
  {
    id: "m3",
    name: "バーベキューバーガー",
    description: "アメリカ産、生、肉質",
    price: 1380,
    image:
      "https://delivery-ibaraki.jp/html/upload/save_image/1007192338_615ecaaaf021b.jpg",
  },
  {
    id: "m4",
    name: "四川風冷奴",
    description: "中華料理",
    price: 420,
    image: "https://dancyu.jp/images/kizushi165_2300x1906.jpg",
  },
  {
    id: "m5",
    name: "グリーンボウル",
    description: "中華料理",
    price: 450,
    image: "https://dancyu.jp/images/kizushi165_2300x1906.jpg",
  },
  {
    id: "m6",
    name: "スタミナニンニク唐揚げ",
    description: "中華料理",
    price: 300,
    image: "https://dancyu.jp/images/kizushi165_2300x1906.jpg",
  },
  {
    id: "m7",
    name: "イカとセロリ和え",
    description: "中華料理",
    price: 680,
    image: "https://dancyu.jp/images/kizushi165_2300x1906.jpg",
  },
  {
    id: "m8",
    name: "中華風クレープ巻き",
    description: "中華料理",
    price: 420,
    image: "https://dancyu.jp/images/kizushi165_2300x1906.jpg",
  },
  {
    id: "m9",
    name: "グリーンボウル",
    description: "中華料理",
    price: 450,
    image: "https://dancyu.jp/images/kizushi165_2300x1906.jpg",
  },
  {
    id: "m10",
    name: "トッポギ",
    description: "韓国料理",
    price: 250,
    image: "https://dancyu.jp/images/kizushi165_2300x1906.jpg",
  },
  {
    id: "m11",
    name: "ビビンバ",
    description: "韓国料理",
    price: 680,
    image: "https://dancyu.jp/images/kizushi165_2300x1906.jpg",
  },
  {
    id: "m12",
    name: "レッドカレー",
    description: "インド料理",
    price: 680,
    image: "https://dancyu.jp/images/kizushi165_2300x1906.jpg",
  },
  {
    id: "m13",
    name: "担々麺",
    description: "中華料理",
    price: 680,
    image: "https://dancyu.jp/images/kizushi165_2300x1906.jpg",
  },
  {
    id: "m14",
    name: "焼きそば",
    description: "麺料理",
    price: 680,
    image: "https://dancyu.jp/images/kizushi165_2300x1906.jpg",
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      image={meal.image}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return <section className={classes.meals}>{mealsList}</section>;
};

export default AvailableMeals;
