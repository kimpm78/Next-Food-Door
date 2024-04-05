import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import CartIcon from "../Cart/CartIcon";

import classes from "./CartButton.module.css";
import CartContext from "../../store/cart-context";

const CartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  // itemsの依存性を転送する
  const { items } = cartCtx;
  // curNumber: 現在数量
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    // 이펙트가 다시 실행될 떄 타이머를 지우도록 하는 로직
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const handleIconClick = () => {
    props.onClick(); // 親のコンポーネントにクリックイベントガンドラーを伝播
  };

  const handleIconKeyPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleIconClick();
    }
  };

  return (
    <div
      className={`${classes.cartButton} ${btnIsHighlighted ? classes.bump : ""}`} // btnIsHighlighted 상태에 따라 클래스를 조건적으로 추가
      role="button"
      onClick={handleIconClick}
      onKeyDown={handleIconKeyPress}
      tabIndex={0}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </div>
  );
};

CartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CartButton;
