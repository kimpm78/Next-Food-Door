import { createContext } from "react";
import PropTypes from "prop-types";
// TODO: Think Context API Clean Code
const CartContext = createContext();
const Context = (props) => {
  return <CartContext.Provider>{props.children}</CartContext.Provider>;
};

Context.propTypes = {
  children: PropTypes.node,
};

export default Context;
