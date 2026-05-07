import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Chip, Paper, Typography } from "@mui/material";

import { STORES } from "../data/catalog";
import { DUMMY_MEALS } from "../data/catalog";
import { getProducts } from "../utils/storage";
import { getCurrentUser, getOrdersByUserEmail } from "../utils/storage";
import classes from "./Pages.module.css";

const formatDate = (value) => {
  return new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const ProfilePage = ({ onNavigate }) => {
  const currentUser = getCurrentUser();
  const [selectedStoreId, setSelectedStoreId] = useState("");

  if (!currentUser) {
    return (
      <section className={classes.authPage}>
        <Box className={classes.panel}>
          <Typography variant="h4" component="h1">
            プロフィール
          </Typography>
          <Typography color="text.secondary">
            注文内容を見るにはログインしてください。
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => onNavigate("/login")}
          >
            ログイン
          </Button>
        </Box>
      </section>
    );
  }

  const orders = getOrdersByUserEmail(currentUser.email);
  const productStoreIdById = [...DUMMY_MEALS, ...getProducts()].reduce(
    (acc, product) => {
      acc[product.id] = product.storeId;
      return acc;
    },
    {}
  );
  const storeNameById = STORES.reduce((acc, store) => {
    acc[store.id] = store.name;
    return acc;
  }, {});
  const ordersByStore = STORES.map((store) => {
    const storeOrders = orders
      .map((order) => ({
        ...order,
        items: order.items.filter(
          (item) => (item.storeId || productStoreIdById[item.id]) === store.id
        ),
      }))
      .filter((order) => order.items.length > 0);
    const totalAmount = storeOrders.reduce((sum, order) => {
      return (
        sum +
        order.items.reduce(
          (itemSum, item) => itemSum + item.price * item.amount,
          0
        )
      );
    }, 0);

    return {
      ...store,
      orders: storeOrders,
      totalAmount,
    };
  }).filter((store) => store.orders.length > 0);
  const selectedStore = ordersByStore.find(
    (store) => store.id === selectedStoreId
  );

  return (
    <main className={classes.profilePage}>
      <Box className={classes.profileHeader}>
        <Box>
          <Typography variant="h4" component="h1">
            プロフィール
          </Typography>
          <Typography color="text.secondary">
            {currentUser.name} / {currentUser.email}
          </Typography>
        </Box>
        <Chip label={`${orders.length}件の注文`} />
      </Box>

      <Box className={classes.orderList}>
        {ordersByStore.length === 0 ? (
          <Paper className={classes.orderCard} elevation={2}>
            <Typography>注文履歴がありません。</Typography>
          </Paper>
        ) : !selectedStore ? (
          <>
            <Typography variant="h5" component="h2">
              注文した店舗
            </Typography>
            <Box className={classes.profileStoreGrid}>
              {ordersByStore.map((store) => (
                <button
                  className={classes.profileStoreCard}
                  key={store.id}
                  onClick={() => setSelectedStoreId(store.id)}
                  type="button"
                >
                  <img src={store.image} alt={store.name} />
                  <div>
                    <strong>{store.name}</strong>
                    <span>{store.orders.length}件の注文</span>
                    <span>{store.totalAmount.toLocaleString()}円</span>
                  </div>
                </button>
              ))}
            </Box>
          </>
        ) : (
          <>
            <Box className={classes.orderStoreHeader}>
              <Box>
                <Typography variant="h5" component="h2">
                  {selectedStore.name}
                </Typography>
                <Typography color="text.secondary">
                  {selectedStore.orders.length}件の注文
                </Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={() => setSelectedStoreId("")}
              >
                店舗一覧へ
              </Button>
            </Box>
            {selectedStore.orders.map((order) => (
            <Paper className={classes.orderCard} elevation={2} key={order.id}>
              <Box className={classes.orderTitle}>
                <Typography variant="h6" component="h2">
                  注文番号 {order.id.slice(0, 8)}
                </Typography>
                <Typography color="text.secondary">
                  {formatDate(order.createdAt)}
                </Typography>
              </Box>
              <ul className={classes.orderItems}>
                {order.items.map((item) => (
                  <li key={item.id}>
                    <span>
                      {item.name} x {item.amount}
                    </span>
                    <strong>
                      {(item.price * item.amount).toLocaleString()}円
                    </strong>
                  </li>
                ))}
              </ul>
              <Box className={classes.orderTotal}>
                <span>{storeNameById[selectedStore.id]} 小計</span>
                <strong>
                  {order.items
                    .reduce(
                      (sum, item) => sum + item.price * item.amount,
                      0
                    )
                    .toLocaleString()}
                  円
                </strong>
              </Box>
            </Paper>
            ))}
          </>
        )}
      </Box>
    </main>
  );
};

ProfilePage.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default ProfilePage;
