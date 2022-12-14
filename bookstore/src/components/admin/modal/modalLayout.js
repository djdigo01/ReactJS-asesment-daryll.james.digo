import { Fragment } from "react";
import classes from "./modal.module.css";

const ModalLayoutComponent = (props) => {
  const closeHandler = () => {
    const findCloseProps = props.children._owner.pendingProps
    findCloseProps.onClose({ isShow: false, data: null });
  };
  return (
    <Fragment>
      <div className={classes.backdrop} onClick={closeHandler}></div>
      <div className={classes.modal}>
        <div className={classes.modalTitle}> {props.title}</div>
        <div className={classes.content}>{props.children}</div>
      </div>
    </Fragment>
  );
};

export default ModalLayoutComponent;
