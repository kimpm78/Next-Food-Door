import React from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import PropTypes from "prop-types";
import { CATEGORIES, DUMMY_MEALS, STORES } from "../../data/catalog";
import {
  getActiveProducts,
  getHiddenDefaultProductIds,
  getOrderCount,
} from "../../utils/storage";

const AvailableMeals = (props) => {
  const normalizedSearchTerm = props.searchTerm.trim().toLowerCase();
  const selectedStore = STORES.find((store) => store.id === props.selectedStoreId);
  const categoryNameById = CATEGORIES.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  const hiddenDefaultProductIds = getHiddenDefaultProductIds();
  const defaultMeals = DUMMY_MEALS.filter(
    (meal) => !hiddenDefaultProductIds.includes(meal.id)
  );
  const adminProducts = getActiveProducts().map((product) => ({
    id: product.id,
    storeId: product.storeId,
    category: product.category,
    name: product.name,
    description: product.description,
    price: product.price,
    badge: getOrderCount(product.id) >= 5 ? "BEST" : "NEW",
    url:
      product.imageUrl ||
      STORES.find((store) => store.id === product.storeId)?.image ||
      process.env.PUBLIC_URL + "/assets/food4.png",
  }));
  const allMeals = [...defaultMeals, ...adminProducts];

  const filteredMeals = allMeals.filter((meal) => {
    if (meal.storeId !== props.selectedStoreId) {
      return false;
    }

    if (!normalizedSearchTerm) {
      return true;
    }

    const searchableText = [
      meal.name,
      meal.description,
      meal.category,
      categoryNameById[meal.category],
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedSearchTerm);
  });

  const mealsList = filteredMeals.map((meal) => (
    <MealItem
      id={meal.id}
      image={meal.url}
      key={meal.id}
      storeId={meal.storeId}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      badge={getOrderCount(meal.id) >= 5 ? "BEST" : meal.badge || ""}
    />
  ));

  return (
    <section className={classes.section}>
      {selectedStore && (
        <div className={classes.storeHero}>
          <img src={selectedStore.image} alt={selectedStore.name} />
          <div>
            <span>{categoryNameById[selectedStore.category]}</span>
            <h1>{selectedStore.name}</h1>
            <p>{selectedStore.description}</p>
            <strong>
              {selectedStore.city} · {selectedStore.address}
            </strong>
          </div>
        </div>
      )}
      <div className={classes.header}>
        <div>
          <h2>メニュー</h2>
          <p>
            {selectedStore
              ? `${selectedStore.name} のメニュー`
              : "カテゴリや料理名でメニューを探せます。"}
          </p>
        </div>
        <button className={classes.backButton} onClick={props.onClearStore}>
          店舗一覧へ
        </button>
      </div>
      <div className={classes.meals}>
        {mealsList.length > 0 ? (
          mealsList
        ) : (
          <p className={classes.empty}>メニューの検索結果がありません。</p>
        )}
      </div>
    </section>
  );
};

AvailableMeals.propTypes = {
  onClearStore: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  selectedStoreId: PropTypes.string.isRequired,
};

export default AvailableMeals;
