import { useReducer } from "react";
import PropTypes from "prop-types";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id,
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        // If the item already exists, update its amount
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1, // Increase the amount by 1
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // If the item doesn't exist, add it to the cart
        updatedItems = state.items.concat({ ...action.item, amount: 1 });
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price,
      };
    }

    case "REMOVE": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id,
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState,
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  // TODO: 나중에 동적으로 바꿀 예정
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export default CartProvider;
