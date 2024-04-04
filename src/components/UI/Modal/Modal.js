import { Fragment } from "react";
import ReactDOM from "react-dom";

import PropTypes from "prop-types";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      props.onClose();
    }
  };

  return (
    <div
      className={classes.backdrop}
      role="button"
      onClick={props.onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    ></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

// ポータルを通じてモーダルを追加
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement,
      )}
    </Fragment>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};

Backdrop.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
