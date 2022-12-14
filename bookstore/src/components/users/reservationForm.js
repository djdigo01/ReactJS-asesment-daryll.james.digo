import { useEffect, useState, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reserveHttp } from "../../lib/users";
import formValidation from "../../components/formInput";
import classes from "./reservation.module.css";

const ReservationFormComponent = (props) => {
  const bookQty = props.bookData;
  const param = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false);
  const [state, dispatch] = useReducer(formValidation, {
    errorMsg: null,
    error: null,
  });

  const [fullname, setFullname] = useState({});
  const [contactNo, setContactNo] = useState({});
  const [email, setEmail] = useState({});
  const [address, setAddress] = useState({});
  const [qty, setQty] = useState({ status: true });
  const [hasError, setHasError] = useState({ errorMsg: "" });

  const dataFromStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (dataFromStorage) {
      setFullname({ value: dataFromStorage.fullname, status: false });
      setContactNo({ value: dataFromStorage.contact, status: false });
      setEmail({ value: dataFromStorage.email, status: false });
      setAddress({ value: dataFromStorage.address, status: false });
    }
  }, [dataFromStorage]);

  const fullNameHandler = (e) => {
    dispatch({ type: "FULLNAME", data: e.target.value });
    setFullname({
      status: state.isError,
      errorMsg: state.errorMsg,
      value: e.target.value,
    });
  };

  const contactHandler = (e) => {
    dispatch({ type: "CONTACT_NO", data: e.target.value });
    setContactNo({
      status: state.isError,
      errorMsg: state.errorMsg,
      value: e.target.value,
    });
  };

  const emailHandler = (e) => {
    dispatch({ type: "EMAIL", data: e.target.value });
    setEmail({
      status: state.isError,
      errorMsg: state.errorMsg,
      value: e.target.value,
    });
  };

  const addressHandler = (e) => {
    dispatch({ type: "ADDRESS", data: e.target.value });
    setAddress({
      status: state.isError,
      errorMsg: state.errorMsg,
      value: e.target.value,
    });
  };

  const quantityHandler = (e) => {
    const qtyValidity = +e.target.value > +bookQty ? true : false;
    if (qtyValidity) {
      setQty({
        status: qtyValidity,
        errorMsg: `We only have "${bookQty}" available in our stock`,
        value: e.target.value,
      });
    } else {
      setQty({
        status: qtyValidity,
        errorMsg: "",
        value: e.target.value,
      });
    }
  };

  const reserveSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      _id: param.id,
      fullName: fullname.value,
      contact: contactNo.value,
      email: email.value,
      address: address.value,
      qty: qty.value,
      date: new Date(),
      updatedQty: +bookQty - +qty.value,
    };

    if (
      qty.status ||
      fullname.status ||
      contactNo.status ||
      email.status ||
      address.status
    ) {
      setHasError({ errorMsg: "Please complete the details" });
      return;
    } else {
      setHasError({ errorMsg: "" });
      const fetch = async () => {
        await reserveHttp(data);
        setNotification(true);
      };
      fetch();
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
        navigate("/");
      }, 3000);
    }
  };
  return (
    <form onSubmit={reserveSubmitHandler} className={classes.reservation_form}>
      {notification && (
        <div className={classes.notification}> Successfully Reserved </div>
      )}
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          value={fullname.value}
          onChange={fullNameHandler}
        ></input>
        <span className={classes.error}>{fullname.errorMsg}</span>
      </div>
      <div>
        <label>Contact No:</label>
        <input
          type="number"
          value={contactNo.value}
          onChange={contactHandler}
        ></input>
        <span className={classes.error}>{contactNo.errorMsg}</span>
      </div>
      <div>
        <label>Email Address:</label>
        <input type="email" value={email.value} onChange={emailHandler}></input>
        <span className={classes.error}>{email.errorMsg}</span>
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={address.value}
          onChange={addressHandler}
        ></input>
        <span className={classes.error}>{address.errorMsg}</span>
      </div>
      <div>
        <label>Qty of Book:</label>
        <input
          type="number"
          value={qty.value}
          onChange={quantityHandler}
        ></input>

        <span className={classes.error}>{qty.errorMsg}</span>
      </div>
      <div className={classes.error}>{hasError.errorMsg}</div>
      <div className={classes.submit}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ReservationFormComponent;
