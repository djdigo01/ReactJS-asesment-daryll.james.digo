import { useState, useRef, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import ModalLayout from "./modal";
import { createAccountHttp } from "./../../../lib/users";
import formValidation from "../../formInput";
import bcrypt from "bcryptjs";
import classes from "./createAccount.module.css";

const RegisterComponent = (props) => {
  const fullname = useRef("");
  const address = useRef("");
  const email = useRef("");
  const contact = useRef("");
  const password = useRef("");
  const conf_password = useRef("");

  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);

  const [fullnameError, setFullNameError] = useState({
    status: null,
    errorMsg: "",
  });
  const [addressError, setAddressError] = useState({
    status: null,
    errorMsg: "",
  });
  const [contactError, setContactError] = useState({
    status: null,
    errorMsg: "",
  });
  const [emailError, setEmailError] = useState({
    status: null,
    errorMsg: "",
  });
  const [passwordError, setPasswordError] = useState({
    status: null,
    errorMsg: "",
  });
  const [confirmPasswordError, setconfirmPasswordError] = useState({
    status: null,
    errorMsg: "",
  });
  const [isEmpty, setIsEmpty] = useState({
    status: null,
    errorMsg: "",
  });

  const salt = bcrypt.genSaltSync(10);

  const [state, dispatch] = useReducer(formValidation, {
    errorMsg: null,
    error: null,
  });

  const fullNameHandler = (e) => {
    dispatch({ type: "FULLNAME", data: e.target.value });
    setFullNameError({ status: state.isError, errorMsg: state.errorMsg });
  };
  const addressHandler = (e) => {
    dispatch({ type: "ADDRESS", data: e.target.value });
    setAddressError({ status: state.isError, errorMsg: state.errorMsg });
  };
  const contactHandler = (e) => {
    dispatch({ type: "CONTACT_NO", data: e.target.value });
    setContactError({ status: state.isError, errorMsg: state.errorMsg });
  };
  const emailHandler = (e) => {
    dispatch({ type: "EMAIL", data: e.target.value });
    setEmailError({ status: state.isError, errorMsg: state.errorMsg });
  };
  const passwordHandler = (e) => {
    dispatch({ type: "PASSWORD", data: e.target.value });
    setPasswordError({ status: state.isError, errorMsg: state.errorMsg });
  };
  const confirmPasswordHandler = (e) => {
    const pass = password.current.value;
    if (pass !== e.target.value) {
      setconfirmPasswordError({
        status: true,
        errorMsg: "Password not match",
      });
    } else {
      setconfirmPasswordError({
        status: false,
        errorMsg: "",
      });
    }
  };

  const registerHandler = (e) => {
    e.preventDefault();
    if (
      fullname.current.value.trim() === "" &&
      address.current.value.trim() === "" &&
      email.current.value.trim() === "" &&
      contact.current.value.trim() === "" &&
      password.current.value.trim() === "" &&
      conf_password.current.value.trim() === ""
    ) {
      setIsEmpty({ status: true, errorMsg: "Please Complete the form" });
      return 
    }

    const data = {
      fullname: fullname.current.value,
      address: address.current.value,
      email: email.current.value,
      contact: contact.current.value,
      password: bcrypt.hashSync(password.current.value, salt),
    };
    const fetch = async () => {
      await createAccountHttp(data);
      setShowNotif(true)
      setTimeout(() => {
        setShowNotif(false)
        navigate("/");
        props.onClose()
      }, 3000)
    };
    fetch();
  };

  const showLoginModal = () => {
    props.onShowLogin(true);
  };

  return (
    <ModalLayout title="Register Here">
      {showNotif && (
        <div className={classes.notification}>
          Successfully Created a Account
        </div>
      )}
      <form onSubmit={registerHandler}>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            ref={fullname}
            value={fullname.current.value}
            onChange={fullNameHandler}
          ></input>
          <span className={classes.error}>{fullnameError.errorMsg}</span>
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            ref={address}
            value={address.current.value}
            onChange={addressHandler}
          ></input>
          <span className={classes.error}>{addressError.errorMsg}</span>
        </div>
        <div>
          <label htmlFor="contact">Contact No.</label>
          <input
            type="number"
            ref={contact}
            value={contact.current.value}
            onChange={contactHandler}
          ></input>
          <span className={classes.error}>{contactError.errorMsg}</span>
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            ref={email}
            value={email.current.value}
            onChange={emailHandler}
          ></input>
          <span className={classes.error}>{emailError.errorMsg}</span>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            ref={password}
            value={password.current.value}
            onChange={passwordHandler}
          ></input>
          <span className={classes.error}>{passwordError.errorMsg}</span>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            ref={conf_password}
            value={conf_password.current.value}
            onChange={confirmPasswordHandler}
          ></input>
          <span className={classes.error}>{confirmPasswordError.errorMsg}</span>
        </div>
        <div className={classes.error}>{isEmpty.errorMsg}</div>
        <div className={classes.button}>
          <button type="submit">Register</button>
        </div>
      </form>
      <div className={classes.goto}>
        <button type="button" onClick={showLoginModal}>
          Already a member? Login here...
        </button>
      </div>
    </ModalLayout>
  );
};

export default RegisterComponent;
