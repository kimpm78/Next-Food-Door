import { Fragment } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CartButton from "./CartButton";
import mealsImage from "../../assets/top01.png";

import classes from "./Header.module.css";
import HeaderCartInput from "./SearchInput";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <MenuIcon className={classes.menu} />
        <h1>
          <a href="/">Next Food Door</a>
        </h1>
        <HeaderCartInput />
        <CartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
