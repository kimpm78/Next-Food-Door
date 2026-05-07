import React, { useContext } from "react";
import PropTypes from "prop-types";

import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import {
  AppBar,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Toolbar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import InputBase from "@mui/material/InputBase";
import { toast } from "react-toastify";
import CartContext from "../../store/cart-context";
import {
  getNotifications,
  markNotificationsAsRead,
} from "../../utils/storage";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "25ch",
    },
  },
}));

const Header = (props) => {
  const cartCtx = useContext(CartContext);
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const cartQuantity = cartCtx.items.reduce((sum, item) => {
    return sum + item.amount;
  }, 0);

  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (e) => {
    setMobileMoreAnchorEl(e.currentTarget);
  };

  const handleChange = (e) => {
    props.onSearch(e.target.value);
    if (props.currentPath !== "/" && !props.currentPath.startsWith("/stores/")) {
      props.onNavigate("/");
    }
  };

  const orderHistoryHandler = () => {
    handleProfileMenuClose();
    handleMobileMenuClose();
    props.onNavigate("/profile");
  };

  const logoutHandler = () => {
    localStorage.removeItem("nfd_current_user");
    props.onLogout();
    handleProfileMenuClose();
    handleMobileMenuClose();
    props.onNavigate("/");
    toast.success("ログアウトしました。");
  };

  const userNotifications = props.currentUser
    ? getNotifications().filter(
        (notification) => notification.userEmail === props.currentUser.email
      )
    : [];

  const notificationClickHandler = (event) => {
    handleNotificationMenuOpen(event);

    if (props.currentUser) {
      markNotificationsAsRead(props.currentUser.email);
      props.onNotificationsRead();
    }
  };

  const profileMenuId = "profile-menu";
  const renderProfileMenu = (
    <Menu
      anchorEl={profileAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={orderHistoryHandler}>注文履歴</MenuItem>
      <MenuItem onClick={logoutHandler}>ログアウト</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const notificationMenuId = "notification-menu";
  const renderNotificationMenu = (
    <Menu
      anchorEl={notificationAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={notificationMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isNotificationMenuOpen}
      onClose={handleNotificationMenuClose}
    >
      {userNotifications.length === 0 ? (
        <MenuItem onClick={handleNotificationMenuClose}>通知はありません</MenuItem>
      ) : (
        userNotifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleNotificationMenuClose}>
            {notification.message}
          </MenuItem>
        ))
      )}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMobileMenuClose();
          props.onShowCart();
        }}
      >
        <IconButton size="large" aria-label="open cart" color="inherit">
          <Badge badgeContent={cartQuantity} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>카트</p>
      </MenuItem>
      <MenuItem
        onClick={(event) => {
          handleMobileMenuClose();
          notificationClickHandler(event);
        }}
      >
        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
        >
          <Badge badgeContent={props.unreadNotificationCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>通知</p>
      </MenuItem>
      {props.currentUser ? (
        [
          <MenuItem key="profile" onClick={orderHistoryHandler}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>プロフィール</p>
          </MenuItem>,
          <MenuItem key="logout" onClick={logoutHandler}>
            ログアウト
          </MenuItem>,
        ]
      ) : (
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            props.onNavigate("/login");
          }}
        >
          ログイン
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: "#8A2B06" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              vertical="h6"
              noWrap
              component="div"
              onClick={() => props.onNavigate("/")}
              sx={{
                alignItems: "center",
                cursor: "pointer",
                display: { xs: "none", sm: "flex" },
                fontWeight: 700,
                gap: 1,
              }}
            >
              <Box
                component="img"
                src={process.env.PUBLIC_URL + "/meshidoor_logo.png"}
                alt="メシドア"
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "6px",
                  height: 36,
                  objectFit: "contain",
                  p: "2px",
                  width: 36,
                }}
              />
              メシドア
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="メシドアを検索"
                inputProps={{ "aria-label": "search" }}
                onChange={handleChange}
                value={props.searchTerm}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="open cart"
                color="inherit"
                onClick={props.onShowCart}
              >
                <Badge badgeContent={cartQuantity} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show notifications"
                color="inherit"
                aria-controls={notificationMenuId}
                aria-haspopup="true"
                onClick={notificationClickHandler}
              >
                <Badge badgeContent={props.unreadNotificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              {props.currentUser ? (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls={profileMenuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  onMouseEnter={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              ) : (
                <Button color="inherit" onClick={() => props.onNavigate("/login")}>
                  ログイン
                </Button>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderProfileMenu}
        {renderNotificationMenu}
      </Box>
    </React.Fragment>
  );
};

Header.propTypes = {
  onShowCart: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
  currentUser: PropTypes.object,
  notificationVersion: PropTypes.number.isRequired,
  onLogout: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onNotificationsRead: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  unreadNotificationCount: PropTypes.number.isRequired,
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
