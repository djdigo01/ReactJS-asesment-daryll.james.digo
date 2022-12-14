import ModalLayoutComponent from "./modalLayout";
import classes from "./viewmodal.module.css";

const ViewModalComponent = (props) => {
  const closeHandler = () => {
    props.onClose({ isShow: false, data: null });
  };

  const stateValue = props.data[0];

  let dataFilter;
  if (props.page === "reserved") {
    dataFilter = stateValue.book_reserved.filter(
      (val) => val._id === stateValue.book_id
    );
  }

  return (
    <ModalLayoutComponent
      title={
        props.page === "home" || props.page === "deleted"
          ? "Book Details"
          : "Details of the Reservation"
      }
    >
      {(props.page === "home") | (props.page === "deleted") && (
        <div className={classes.viewModal}>
          <ul>
            <li className={classes.book}>
              <div className={classes.img_container}>
                <img src={stateValue.img} alt={stateValue.title} />
              </div>
              <div className={classes.book_detail}>
                <div>Title: {stateValue.title}</div>
                <div>Author: {stateValue.author}</div>
                <div>Year/Vol: {stateValue.year}</div>
                <div>ISBN: {stateValue.isbn}</div>
                <div>Qty: {stateValue.qty}</div>
              </div>
            </li>
            <li className={classes.book_description}>
              <div>Description: </div>
              {stateValue.description}
            </li>
          </ul>
        </div>
      )}

      {props.page === "reserved" && (
        <div>
          <ul>
            <li className={classes.book}>
              <div className={classes.img_container}>
                <img src={dataFilter[0].img} alt={dataFilter[0].title} />
              </div>
              <div className={classes.book_detail}>
                <div>Title: {dataFilter[0].title}</div>
                <div>Book ID No: {stateValue.book_id}</div>
                <div>Author: {dataFilter[0].author}</div>
                <div>Year/Vol: {dataFilter[0].year}</div>
                <div>ISBN: {dataFilter[0].isbn}</div>
                <div>Qty: {stateValue.qty}</div>
              </div>
            </li>
            <li className={classes.book_description}>
              <div>Description: </div>
              {dataFilter[0].description}
            </li>
            <li className={classes.book_description}>
              <div>BORROWER DETAILS: </div>
              <ul>
                <li>Borrower Name: {stateValue.fullname}</li>
                <li>Email: {stateValue.email}</li>
                <li>Address: {stateValue.address}</li>
                <li>Contact No: {stateValue.contact}</li>
                <li>Date Borrowed: {stateValue.date_created}</li>
              </ul>
            </li>
          </ul>
        </div>
      )}

      <div className="action">
        <button onClick={closeHandler}>Close</button>
      </div>
    </ModalLayoutComponent>
  );
};

export default ViewModalComponent;
