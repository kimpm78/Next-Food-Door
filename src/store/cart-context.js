import React from "react";

const CartContext = React.createContext({
  // カートに入ったアイテム
  items: [],
  // カートに入ったアイテムの総価格
  totalAmount: 0,
  // カートにアイテムを追加する関数
  addItem: () => {},
  // カートに入ったアイテムを削除する関数
  removeItem: () => {},
});

export default CartContext;
