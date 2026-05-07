import { useContext, useState } from "react";

import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";
import PropTypes from "prop-types";

import CartContext from "../../store/cart-context";
import {
  addNotification,
  getCurrentUser,
  recordOrderItems,
  saveOrder,
} from "../../utils/storage";
import { toast } from "react-toastify";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [loginRequired, setLoginRequired] = useState(!getCurrentUser());

  const totalAmount = `${cartCtx.totalAmount.toLocaleString("ja-JP")}円（税込）`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  //TODO:注文を完了するハンドラーこれによって注文リストが初期化される
  const orderHandler = () => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      setLoginRequired(true);
      return;
    }

    recordOrderItems(cartCtx.items);
    saveOrder({
      user: currentUser,
      items: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
    });
    addNotification({
      userEmail: currentUser.email,
      message: "配送中です。しばらくお待ちください。",
    });
    props.onOrderComplete();
    cartCtx.clearCart();
    toast.success("注文が完了しました。しばらくお待ちください");
    props.onClose();
  };

  const loginMoveHandler = () => {
    props.onClose();
    props.onNavigate("/login");
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
    onNavigate: PropTypes.func.isRequired,
    onOrderComplete: PropTypes.func.isRequired,
  };

  return (
    <Modal onClose={props.onClose}>
      {loginRequired ? (
        <div className={classes.loginRequired}>
          <h2>ログインが必要です</h2>
          <p>購入するにはログインページへ移動してください。</p>
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.onClose}
            >
              戻る
            </button>
            <button className={classes.button} onClick={loginMoveHandler}>
              ログイン
            </button>
          </div>
        </div>
      ) : (
        <>
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
            {hasItems && (
              <button className={classes.button} onClick={orderHandler}>
                注文
              </button>
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
