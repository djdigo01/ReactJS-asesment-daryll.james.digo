import ModalLayoutComponent from "./modalLayout";
import { updateHttp } from "../../../lib/admin";
import { useState } from "react";

const ConfirmationModal = (props) => {
  const [notif, setNotif] = useState(false)
  const closeHandler = () => {
    props.onClose({ isShow: false, data: null });
  };

  const removeHandler = () => {
    const dataValue = {
      _id: props.data[0]._id,
      img: props.data[0].img,
      title: props.data[0].title,
      description: props.data[0].description,
      author: props.data[0].author,
      year: props.data[0].year,
      isbn: props.data[0].isbn,
      qty: props.data[0].qty,
      isDeleted: 1,
      date_created: props.data[0].date_created,
    };

    
    updateHttp(dataValue);
    setNotif(true);
    setTimeout(() => {
      setNotif(false);
      closeHandler();
    }, 2000)
  };

  return (
    <ModalLayoutComponent title="Are you sure to delete this book?">
      <div>
        {notif && <div className="notification">Succesfully Deleted the Item</div>}
        <ul>
          <li>Title: {props.data[0].title}</li>
          <li>Author: {props.data[0].author}</li>
          <li>Year/Vol: {props.data[0].year}</li>
        </ul>
      </div>
      <div className="action">
        <button onClick={closeHandler}>Close</button>
        <button onClick={removeHandler}>Remove</button>
      </div>
    </ModalLayoutComponent>
  );
};

export default ConfirmationModal;
