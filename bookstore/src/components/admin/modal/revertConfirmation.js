import ModalLayoutComponent from "./modalLayout";
import { updateHttp } from "../../../lib/admin";
import { useNavigate } from "react-router-dom";

const RevertConfirmationModal = (props) => {
  const navigate = useNavigate()
  const closeHandler = () => {
    props.onClose({ isShow: false, data: null });
  };

  const revertHandler = () => {
    const dataValue = {
      _id: props.data[0]._id,
      img: props.data[0].img,
      title: props.data[0].title,
      description: props.data[0].description,
      author: props.data[0].author,
      year: props.data[0].year,
      isbn: props.data[0].isbn,
      qty: props.data[0].qty,
      isDeleted: 0,
      date_created: props.data[0].date_created,
    };

    updateHttp(dataValue);
    navigate("/superadmin/home")
    closeHandler();
  };

  return (
    <ModalLayoutComponent title="Are you sure to revert this book?">
      <div>
        <ul>
          <li>Title: {props.data[0].title}</li>
          <li>Author: {props.data[0].author}</li>
          <li>Year/Vol: {props.data[0].year}</li>
        </ul>
      </div>
      <div className="action">
        <button onClick={closeHandler}>Close</button>
        <button onClick={revertHandler}>Revert</button>
      </div>
    </ModalLayoutComponent>
  );
};

export default RevertConfirmationModal;
