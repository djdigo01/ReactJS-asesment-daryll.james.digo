import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import { adminHttp } from "./../../lib/admin";
import bcrypt from "bcryptjs";

const SuperAdminLoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // CHECK IF LOGGED IN
  const isLoggedin = JSON.parse(localStorage.getItem("admin"));
  useEffect(() => {
    if (isLoggedin) {
      navigate("/superadmin/home");
    }
  }, [isLoggedin, navigate]);

  const emailValHandler = (val) => {
    setEmailValue(val.target.value);
  };

  const passwordValHandler = (val) => {
    setPassValue(val.target.value);
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    const fetch = async () => {
      const response = await adminHttp();
      response.filter((val) => {
        const pass = bcrypt.compareSync(passValue, val.password);
        if (val.email === emailValue && pass) {
          localStorage.setItem("admin", JSON.stringify(val));
          return navigate("/superadmin/home");
        } else {
          return setError("Wrong email and password");
        }
      });
    };
    fetch();
  };

  return (
    <div className={classes.login}>
      <div className={classes.title}>
        <h2>LOGIN AS ADMIN</h2>
      </div>
      <form onSubmit={loginSubmitHandler}>
        {error && <div className={classes.error}>{error}</div>}
        <div>
          <label>Admin Email: </label>
          <input type="email" onChange={emailValHandler}></input>
        </div>
        <div>
          <label>Admin Password: </label>
          <input type="password" onChange={passwordValHandler}></input>
        </div>
        <div className={classes.action}>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default SuperAdminLoginPage;
