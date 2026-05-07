import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Chip,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { CATEGORIES, DUMMY_MEALS, STORES } from "../data/catalog";
import { authenticateAdmin, getProducts, saveProduct } from "../utils/storage";
import {
  getOrderCount,
  getHiddenDefaultProductIds,
  hideDefaultProduct,
  logicallyDeleteProduct,
} from "../utils/storage";
import classes from "./Pages.module.css";

const AdminLogin = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const submitHandler = async (event) => {
    event.preventDefault();

    const admin = await authenticateAdmin(form.email.trim(), form.password);

    if (admin) {
      sessionStorage.setItem("nfd_admin_logged_in", "true");
      onLogin();
      return;
    }

    toast.error("管理者アカウントを確認してください。");
  };

  return (
    <section className={classes.authPage}>
      <form className={classes.panel} onSubmit={submitHandler}>
        <Typography variant="h4" component="h1">
          管理者ログイン
        </Typography>
        <TextField
          label="管理者メールアドレス"
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
          required
          fullWidth
        />
        <TextField
          label="パスワード"
          type="password"
          value={form.password}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, password: event.target.value }))
          }
          required
          fullWidth
        />
        <Button type="submit" variant="contained" size="large">
          管理者ログイン
        </Button>
      </form>
    </section>
  );
};

AdminLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("nfd_admin_logged_in") === "true"
  );
  const [products, setProducts] = useState(getProducts);
  const [hiddenDefaultProductIds, setHiddenDefaultProductIds] = useState(
    getHiddenDefaultProductIds
  );
  const [form, setForm] = useState({
    storeId: STORES[0].id,
    category: CATEGORIES[0].id,
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const categoryNameById = useMemo(() => {
    return CATEGORIES.reduce((acc, category) => {
      acc[category.id] = category.name;
      return acc;
    }, {});
  }, []);

  const productsByStore = useMemo(() => {
    const defaultProducts = DUMMY_MEALS.filter(
      (meal) => !hiddenDefaultProductIds.includes(meal.id)
    ).map((meal) => ({
      ...meal,
      source: "default",
    }));
    const activeAdminProducts = products
      .filter((product) => product.active !== false)
      .map((product) => ({
        ...product,
        source: "admin",
      }));
    const visibleProducts = [...defaultProducts, ...activeAdminProducts];

    return STORES.map((store) => ({
      ...store,
      products: visibleProducts.filter((product) => product.storeId === store.id),
    }));
  }, [hiddenDefaultProductIds, products]);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const nextProduct = saveProduct({
      storeId: form.storeId,
      category: form.category,
      name: form.name.trim(),
      description: form.description.trim(),
      price: form.price,
      imageUrl: form.imageUrl.trim(),
      active: true,
    });

    setProducts((prev) => [nextProduct, ...prev]);
    setForm((prev) => ({
      ...prev,
      name: "",
      description: "",
      price: "",
      imageUrl: "",
    }));
    toast.success("商品が登録されました。");
  };

  const deleteProductHandler = (product) => {
    if (product.source === "default") {
      hideDefaultProduct(product.id);
      setHiddenDefaultProductIds(getHiddenDefaultProductIds());
    } else {
      logicallyDeleteProduct(product.id);
      setProducts(getProducts());
    }

    toast.success("商品を論理削除しました。");
  };

  return (
    <main className={classes.adminPage}>
      <Box className={classes.adminHeader}>
        <Box>
          <Typography variant="h4" component="h1">
            メニュー管理
          </Typography>
          <Typography color="text.secondary">
            商品を登録して確認できます。
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={() => {
            sessionStorage.removeItem("nfd_admin_logged_in");
            setIsLoggedIn(false);
          }}
        >
          ログアウト
        </Button>
      </Box>

      <Box className={classes.adminGrid}>
        <Paper className={classes.adminPanel} elevation={2}>
          <Typography variant="h5" component="h2">
            商品登録
          </Typography>
          <form className={classes.formStack} onSubmit={submitHandler}>
            <TextField
              select
              label="店舗"
              value={form.storeId}
              onChange={(event) => updateField("storeId", event.target.value)}
              fullWidth
            >
              {STORES.map((store) => (
                <MenuItem key={store.id} value={store.id}>
                  {store.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="カテゴリー"
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
              fullWidth
            >
              {CATEGORIES.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="商品名"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              required
              fullWidth
            />
            <TextField
              label="商品説明"
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              required
              multiline
              minRows={3}
              fullWidth
            />
            <TextField
              label="価格"
              type="number"
              value={form.price}
              onChange={(event) => updateField("price", event.target.value)}
              inputProps={{ min: 0 }}
              required
              fullWidth
            />
            <TextField
              label="画像 URL"
              value={form.imageUrl}
              onChange={(event) => updateField("imageUrl", event.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" size="large">
              商品登録
            </Button>
          </form>
        </Paper>

        <Paper className={classes.adminPanel} elevation={2}>
          <Typography variant="h5" component="h2">
            登録商品
          </Typography>
          {productsByStore.map((store) => (
            <Box key={store.id} className={classes.categoryBlock}>
              <Box className={classes.categoryTitle}>
                <Typography variant="h6" component="h3">
                  {store.name}
                </Typography>
                <Chip label={`${store.products.length}個`} size="small" />
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>カテゴリー</TableCell>
                    <TableCell>商品名</TableCell>
                    <TableCell>説明</TableCell>
                    <TableCell align="right">注文数</TableCell>
                    <TableCell align="right">価格</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {store.products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6}>表示する商品がありません。</TableCell>
                    </TableRow>
                  ) : (
                    store.products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          {categoryNameById[product.category] ||
                            product.category}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell align="right">
                          {getOrderCount(product.id).toLocaleString()}回
                        </TableCell>
                        <TableCell align="right">
                          {product.price.toLocaleString()}円
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            color="error"
                            size="small"
                            variant="outlined"
                            onClick={() => deleteProductHandler(product)}
                          >
                            削除
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Box>
          ))}
        </Paper>
      </Box>
    </main>
  );
};

export default AdminPage;
