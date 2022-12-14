import { useRef, useState, useReducer } from "react";
import ModalLayout from "./modal";
import { userHttp } from "./../../../lib/users";
import bcrypt from "bcryptjs";
// import { useJwt } from "react-jwt";
import classes from "./login.module.css";
import formValidation from "../../formInput";

const LoginComponent = (props) => {
  const [emailError, setEmailError] = useState({
    status: null,
    errorMsg: "",
  });
  const [passwordError, setPasswordError] = useState({
    status: null,
    errorMsg: "",
  });
  const [checkAuth, setCheckAuth] = useState({
    status: false,
    errorMsg: "",
  });

  const email = useRef("");
  const password = useRef("");

  const [state, dispatch] = useReducer(formValidation, {
    errorMsg: null,
    error: null,
  });

  const emailValidation = (e) => {
    dispatch({ type: "EMAIL", data: e.target.value });
    setEmailError({ status: state.isError, errorMsg: state.errorMsg });
  };

  const passwordValidation = (e) => {
    dispatch({ type: "PASSWORD", data: e.target.value });
    setPasswordError({ status: state.isError, errorMsg: state.errorMsg });
  };

  const loginHandler = (e) => {
    e.preventDefault();

    if (email.current.value === "" && password.current.value === "") {
      setEmailError({ status: true, errorMsg: "Email is Empty" });
      setPasswordError({ status: true, errorMsg: "Passsword is Empty" });
      return;
    }

    const fetch = async () => {
      const response = await userHttp();
      response.filter((val) => {
        const pass = bcrypt.compareSync(password.current.value, val.password);
        if (val.email === email.current.value && pass) {
          localStorage.setItem("user", JSON.stringify(val));
          return props.onClose(false); //-- Close Modal
        } else {
          return setCheckAuth({ status: true, errorMsg: "Wrong Email And Password" });
        }
      });
    };
    fetch();
  };

  const showRegisterFormHandler = () => {
    props.showRegister(true);
  };

  return (
    <ModalLayout title="Login">
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" ref={email} onChange={emailValidation}></input>
          <span className={classes.error}>{emailError.errorMsg}</span>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            ref={password}
            onChange={passwordValidation}
          ></input>
          <span className={classes.error}>{passwordError.errorMsg}</span>
        </div>
        <span className={classes.error}>{checkAuth.errorMsg}</span>
        <div>
          <button type="submit" className={classes.login_button}>
            Login
          </button>
        </div>
      </form>
      <div className={classes.gotoLink}>
        <button type="button" onClick={showRegisterFormHandler}>
          Not yet registered? Signup here...
        </button>
      </div>
    </ModalLayout>
  );
};

export default LoginComponent;
