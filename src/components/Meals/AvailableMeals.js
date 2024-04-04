import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import PropTypes from "prop-types";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "まぐろ（寿司）",
    description: "最高級の魚と野菜",
    price: 110,
    url: process.env.PUBLIC_URL + "/assets/maguro.png",
  },
  {
    id: "m2",
    name: "シュニッツェル",
    description: "ドイツの名物",
    price: 699,
    url: process.env.PUBLIC_URL + "/assets/schnitzel.png",
  },
  {
    id: "m3",
    name: "バーベキューバーガー",
    description: "たっぷりなビーフ",
    price: 1380,
    url: process.env.PUBLIC_URL + "/assets/barbecue_burger.png",
  },
  {
    id: "m4",
    name: "四川風冷奴",
    description: "中華料理",
    price: 420,
    url: process.env.PUBLIC_URL + "/assets/food4.png",
  },
  {
    id: "m5",
    name: "グリーンボウル",
    description: "中華料理",
    price: 450,
    url: process.env.PUBLIC_URL + "/assets/green_bowl.png",
  },
  {
    id: "m6",
    name: "スタミナニンニク唐揚げ",
    description: "中華料理",
    price: 550,
    url: process.env.PUBLIC_URL + "/assets/fried_stamina_garlic.png",
  },
  {
    id: "m7",
    name: "イカとセロリ和え",
    description: "中華料理",
    price: 680,
    url: process.env.PUBLIC_URL + "/assets/food7.png",
  },
  {
    id: "m8",
    name: "中華風クレープ巻き",
    description: "中華料理",
    price: 420,
    url: process.env.PUBLIC_URL + "/assets/food8.png",
  },
  {
    id: "m9",
    name: "もやしナムル",
    description: "韓国料理",
    price: 300,
    url: process.env.PUBLIC_URL + "/assets/food9.png",
  },
  {
    id: "m10",
    name: "トッポギ",
    description: "韓国料理",
    price: 340,
    url: process.env.PUBLIC_URL + "/assets/food10.png",
  },
  {
    id: "m11",
    name: "ビビンバ",
    description: "韓国料理",
    price: 860,
    url: process.env.PUBLIC_URL + "/assets/food11.png",
  },
  {
    id: "m12",
    name: "レッドカレー",
    description: "インド料理",
    price: 900,
    url: process.env.PUBLIC_URL + "/assets/food12.png",
  },
  {
    id: "m13",
    name: "担々麺",
    description: "中華料理",
    price: 980,
    url: process.env.PUBLIC_URL + "/assets/food13.png",
  },
  {
    id: "m14",
    name: "焼きそば",
    description: "麺料理",
    price: 480,
    url: process.env.PUBLIC_URL + "/assets/food14.png",
  },
  {
    id: "m15",
    name: "大判きつねのおうどん",
    description: "麺料理",
    price: 480,
    url: process.env.PUBLIC_URL + "/assets/food15.png",
  },
];

const AvailableMeals = () => {
  const cartCtx = useContext(CartContext);

  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      image={meal.url}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      onAddToCart={() => {
        cartCtx.updateCartQuantity(cartCtx.cartQuantity + 1);
      }}
    />
  ));

  return <section className={classes.meals}>{mealsList}</section>;
};

AvailableMeals.propTypes = {
  onUpdateCartQuantity: PropTypes.func.isRequired,
};

export default AvailableMeals;
