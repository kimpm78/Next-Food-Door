import { Fragment } from "react";
import PropTypes from "prop-types";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import Stores from "../Stores/Stores";

const Meals = (props) => {
  if (props.selectedStoreId) {
    return (
      <AvailableMeals
        onClearStore={props.onClearStore}
        searchTerm={props.searchTerm}
        selectedStoreId={props.selectedStoreId}
      />
    );
  }

  return (
    <Fragment>
      <MealsSummary />
      <Stores
        onSelectStore={props.onSelectStore}
        searchTerm={props.searchTerm}
        selectedStoreId={props.selectedStoreId}
      />
    </Fragment>
  );
};

Meals.propTypes = {
  onClearStore: PropTypes.func.isRequired,
  onSelectStore: PropTypes.func.isRequired,
  selectedStoreId: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default Meals;
