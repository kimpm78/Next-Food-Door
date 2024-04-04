import { useContext } from "react";

import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";
import PropTypes from "prop-types";

import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toLocaleString("ja-JP")}円（税込）`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          image={item.image}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  Cart.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  return (
    <Modal onClose={props.onClose}>
      {hasItems ? cartItems : <p>カートが空いています。</p>}
      {hasItems && (
        <div className={classes.total}>
          <span>合計</span>
          <span>{totalAmount}</span>
        </div>
      )}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          戻る
        </button>
        {hasItems && <button className={classes.button}>注文</button>}
      </div>
    </Modal>
  );
};

export default Cart;
