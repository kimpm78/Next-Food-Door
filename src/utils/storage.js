const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const isLocalRuntime = ["localhost", "127.0.0.1"].includes(
  window.location.hostname
);
const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL ||
  (isLocalRuntime ? "http://localhost:4000/api" : "");
const demoAdmin = {
  id: "demo-admin",
  email: "admin@nextfooddoor.com",
  name: "メシドア管理者",
};

const authenticateDemoAdmin = (email, password) => {
  if (email === demoAdmin.email && password === "admin1234") {
    return demoAdmin;
  }

  return null;
};

export const getUsers = () => readJson("nfd_users", []);

export const saveUser = (user) => {
  const users = getUsers();
  const exists = users.some((item) => item.email === user.email);

  if (exists) {
    throw new Error("すでに同じメールアドレスのユーザーが存在しています。");
  }

  const nextUser = {
    ...user,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  writeJson("nfd_users", [...users, nextUser]);
  return nextUser;
};

export const authenticateUser = (email, password) => {
  return getUsers().find(
    (user) => user.email === email && user.password === password
  );
};

export const getCurrentUser = () => readJson("nfd_current_user", null);

export const authenticateAdmin = async (email, password) => {
  if (!apiBaseUrl) {
    return authenticateDemoAdmin(email, password);
  }

  try {
    const response = await fetch(`${apiBaseUrl}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.ok ? result.admin : null;
  } catch (error) {
    return authenticateDemoAdmin(email, password);
  }
};

export const getProducts = () => readJson("nfd_products", []);

export const getActiveProducts = () => {
  return getProducts().filter((product) => product.active !== false);
};

export const saveProduct = (product) => {
  const products = getProducts();
  const nextProduct = {
    ...product,
    id: crypto.randomUUID(),
    price: Number(product.price),
    createdAt: new Date().toISOString(),
  };

  writeJson("nfd_products", [nextProduct, ...products]);
  return nextProduct;
};

export const getHiddenDefaultProductIds = () =>
  readJson("nfd_hidden_default_product_ids", []);

export const hideDefaultProduct = (productId) => {
  const hiddenIds = getHiddenDefaultProductIds();

  if (!hiddenIds.includes(productId)) {
    writeJson("nfd_hidden_default_product_ids", [...hiddenIds, productId]);
  }
};

export const logicallyDeleteProduct = (productId) => {
  const products = getProducts();
  writeJson(
    "nfd_products",
    products.map((product) =>
      product.id === productId
        ? { ...product, active: false, deletedAt: new Date().toISOString() }
        : product
    )
  );
};

export const getOrderCounts = () => readJson("nfd_order_counts", {});

export const getOrderCount = (productId) => {
  const orderCounts = getOrderCounts();
  return orderCounts[productId] || 0;
};

export const recordOrderItems = (items) => {
  const orderCounts = getOrderCounts();

  items.forEach((item) => {
    orderCounts[item.id] = (orderCounts[item.id] || 0) + item.amount;
  });

  writeJson("nfd_order_counts", orderCounts);
  return orderCounts;
};

export const getOrders = () => readJson("nfd_orders", []);

export const getOrdersByUserEmail = (email) => {
  return getOrders().filter((order) => order.userEmail === email);
};

export const saveOrder = ({ user, items, totalAmount }) => {
  const orders = getOrders();
  const nextOrder = {
    id: crypto.randomUUID(),
    userEmail: user.email,
    userName: user.name,
    totalAmount,
    items: items.map((item) => ({
      id: item.id,
      storeId: item.storeId,
      name: item.name,
      amount: item.amount,
      price: item.price,
    })),
    createdAt: new Date().toISOString(),
  };

  writeJson("nfd_orders", [nextOrder, ...orders]);
  return nextOrder;
};

export const getNotifications = () => readJson("nfd_notifications", []);

export const getUnreadNotifications = () => {
  return getNotifications().filter((notification) => !notification.read);
};

export const addNotification = ({ userEmail, message }) => {
  const notifications = getNotifications();
  const nextNotification = {
    id: crypto.randomUUID(),
    userEmail,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  };

  writeJson("nfd_notifications", [nextNotification, ...notifications]);
  return nextNotification;
};

export const markNotificationsAsRead = (userEmail) => {
  const notifications = getNotifications();
  writeJson(
    "nfd_notifications",
    notifications.map((notification) =>
      notification.userEmail === userEmail
        ? { ...notification, read: true }
        : notification
    )
  );
};
