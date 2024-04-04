import PropTypes from "prop-types";

const Card = (props) => {
  return <div>{props.children}</div>;
};

Card.propTypes = {
  children: PropTypes.node,
};

export default Card;
