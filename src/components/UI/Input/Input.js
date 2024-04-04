import React from "react";
import classes from "./Input.module.css";
import PropTypes from "prop-types";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
