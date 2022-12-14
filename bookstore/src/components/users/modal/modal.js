import classes from "./modal.module.css";
import { Fragment } from "react";

const ModalLayout = (props) => {

  const closeModal = () => {
    props.onClose(false)
  }
  return (
    <Fragment>
      <div className={classes.backdrop} onClick={closeModal}></div>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h3>{props.title}</h3>
        </div>
        <div className={classes.content}>
          {props.children}
        </div>
      </div>
    </Fragment>
  );
};

export default ModalLayout;
