import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
import Header from "./components/Layout/Header";
import Footer from "./components/UI/Footer/Footer";
import Cart from "./components/Cart/Cart";
import Meals from "./components/Meals/Meals";
import Banner from "./components/UI/Banner/Banner";
import CartProvider from "./store/CartProvider";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import RestaurantRegister from "./pages/RestaurantRegister";
import DeliveryPartnerRegister from "./pages/DeliveryPartnerRegister";
import BusinessRegister from "./pages/BusinessRegister";
import HowToOrder from "./pages/HowToOrder";
import DeliveryGuide from "./pages/DeliveryGuide";
import AppDownload from "./pages/AppDownload";
import ContactPage from "./pages/ContactPage";
import MapPage from "./pages/MapPage";

import {
  LoginPage,
  SignupCompletePage,
  SignupPage,
} from "./pages/AuthPages";
import { getCurrentUser } from "./utils/storage";
import { getUnreadNotifications } from "./utils/storage";

const deploymentPublicUrl = process.env.PUBLIC_URL || "";
const isLocalHost = ["localhost", "127.0.0.1", ""].includes(
  window.location.hostname
);
const publicUrl = isLocalHost ? "" : deploymentPublicUrl;

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

const staticPageMap = {
  "/admin": <AdminPage />,
  "/about": <About />,
  "/privacy": <Privacy />,
  "/terms": <Terms />,
  "/restaurant-register": <RestaurantRegister />,
  "/delivery-partner-register": <DeliveryPartnerRegister />,
  "/business-register": <BusinessRegister />,
  "/how-to-order": <HowToOrder />,
  "/delivery": <DeliveryGuide />,
  "/app-download": <AppDownload />,
  "/contact/order": <ContactPage type="order" />,
  "/contact/account-payment": <ContactPage type="account-payment" />,
  "/contact/membership": <ContactPage type="membership" />,
  "/map": <MapPage />,
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
      {!searchTerm && !selectedStoreId && (
        <LandingPage onNavigate={navigateHandler} />
      )}

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

  const staticPage = staticPageMap[currentPath];

  if (staticPage) {
    pageContent = staticPage;
  }

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
      <Footer onNavigate={navigateHandler} />
    </CartProvider>
  );
}

export default App;
