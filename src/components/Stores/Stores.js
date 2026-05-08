import { useState } from "react";
import PropTypes from "prop-types";
import { CATEGORIES, STORES } from "../../data/catalog";
import classes from "./Stores.module.css";

const Stores = (props) => {
  const [activeCategory, setActiveCategory] = useState("");
  const normalizedSearchTerm = props.searchTerm.trim().toLowerCase();
  const categoryNameById = CATEGORIES.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  const filteredStores = STORES.filter((store) => {
    if (activeCategory && store.category !== activeCategory) {
      return false;
    }

    if (!normalizedSearchTerm) {
      return true;
    }

    const searchableText = [
      store.name,
      store.city,
      store.address,
      store.description,
      store.category,
      categoryNameById[store.category],
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedSearchTerm);
  });

  return (
    <section id="stores-section" className={classes.stores}>
      <div className={classes.header}>
        <div>
          <h2>料理を探す</h2>
          <p>地域とカテゴリから近くの店舗を探せます。</p>
        </div>
        <div className={classes.categories}>
          <button
            className={!activeCategory ? classes.activeCategory : ""}
            onClick={() => setActiveCategory("")}
            type="button"
          >
            すべて
          </button>
          {CATEGORIES.map((category) => (
            <button
              className={
                activeCategory === category.id ? classes.activeCategory : ""
              }
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              type="button"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className={classes.grid}>
        {filteredStores.length > 0 ? (
          filteredStores.map((store) => (
            <button
              className={`${classes.card} ${
                props.selectedStoreId === store.id ? classes.selected : ""
              }`}
              key={store.id}
              onClick={() => props.onSelectStore(store.id)}
              type="button"
            >
              <img src={store.image} alt={store.name} />
              <div className={classes.content}>
                <span className={classes.category}>
                  {categoryNameById[store.category]}
                </span>
                <h3>{store.name}</h3>
                <p>{store.description}</p>
                <div className={classes.meta}>
                  <strong>{store.city}</strong>
                  <span>{store.address}</span>
                </div>
              </div>
            </button>
          ))
        ) : (
          <p className={classes.empty}>店舗の検索結果がありません。</p>
        )}
      </div>
    </section>
  );
};

Stores.propTypes = {
  onSelectStore: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  selectedStoreId: PropTypes.string.isRequired,
};

export default Stores;
