import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Layout/Header";
import Footer from "./components/UI/Footer/Footer";
import Cart from "./components/Cart/Cart";
import Meals from "./components/Meals/Meals";
import Banner from "./components/UI/Banner/Banner";
import CartProvider from "./store/CartProvider";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import {
  LoginPage,
  SignupCompletePage,
  SignupPage,
} from "./pages/AuthPages";
import { getCurrentUser } from "./utils/storage";
import { getUnreadNotifications } from "./utils/storage";

const publicUrl = process.env.PUBLIC_URL || "";

const toAppPath = (path) => {
  if (publicUrl && path.startsWith(publicUrl)) {
    return path.slice(publicUrl.length) || "/";
  }

  return path || "/";
};

const toBrowserPath = (path) => {
  if (!publicUrl) {
    return path;
  }

  return `${publicUrl}${path === "/" ? "" : path}`;
};

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [currentPath, setCurrentPath] = useState(
    toAppPath(window.location.pathname)
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [notificationVersion, setNotificationVersion] = useState(0);

  const unreadNotificationCount = currentUser
    ? getUnreadNotifications().filter(
        (notification) => notification.userEmail === currentUser.email
      ).length
    : 0;

  const navigateHandler = (path) => {
    window.history.pushState({}, "", toBrowserPath(path));
    setCurrentPath(path);
    setCartIsShown(false);
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  useEffect(() => {
    const popStateHandler = () => {
      setCurrentPath(toAppPath(window.location.pathname));
    };

    window.addEventListener("popstate", popStateHandler);
    return () => {
      window.removeEventListener("popstate", popStateHandler);
    };
  }, []);

  const selectedStoreMatch = currentPath.match(/^\/stores\/([^/]+)$/);
  const selectedStoreId = selectedStoreMatch ? selectedStoreMatch[1] : "";

  let pageContent = (
    <>
      <main>
        <Meals
          onClearStore={() => navigateHandler("/")}
          onSelectStore={(storeId) => navigateHandler(`/stores/${storeId}`)}
          searchTerm={searchTerm}
          selectedStoreId={selectedStoreId}
        />
      </main>
      <Banner />
    </>
  );

  if (currentPath === "/login") {
    pageContent = (
      <LoginPage
        onLogin={(user) => setCurrentUser(user)}
        onNavigate={navigateHandler}
      />
    );
  }

  if (currentPath === "/signup") {
    pageContent = <SignupPage onNavigate={navigateHandler} />;
  }

  if (currentPath === "/signup-complete") {
    pageContent = <SignupCompletePage onNavigate={navigateHandler} />;
  }

  if (currentPath === "/admin") {
    pageContent = <AdminPage />;
  }

  if (currentPath === "/profile") {
    pageContent = <ProfilePage onNavigate={navigateHandler} />;
  }

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart
          onClose={hideCartHandler}
          onNavigate={navigateHandler}
          onOrderComplete={() =>
            setNotificationVersion((version) => version + 1)
          }
        />
      )}
      <Header
        onShowCart={showCartHandler}
        currentPath={currentPath}
        currentUser={currentUser}
        notificationVersion={notificationVersion}
        onLogout={() => setCurrentUser(null)}
        onNavigate={navigateHandler}
        onNotificationsRead={() =>
          setNotificationVersion((version) => version + 1)
        }
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        unreadNotificationCount={unreadNotificationCount}
      />
      <ToastContainer position="top-center" limit={2} autoClose={1000} />
      {pageContent}
      <Footer />
    </CartProvider>
  );
}

export default App;
