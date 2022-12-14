import { Fragment, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoginComponent from "../../components/users/modal/login";
import RegisterComponent from "../../components/users/modal/createAccount";
import classes from "./index.module.css";

const UsersLayout = (props) => {
  const [logoutNotif, setLogoutNotif] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const navigate = useNavigate();
  const param = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const showLoginHandler = () => {
    setLoginModal(true);
    setRegisterModal(false);
  };

  const showRegisterHandler = (props) => {
    setRegisterModal(props);
    setLoginModal(false);
  };

  const closeModalHandler = () => {
    setLoginModal(false);
    setRegisterModal(false);
  };

  const logOutHandler = () => {
    localStorage.removeItem("user");
    setLogoutNotif(true);
    setTimeout(() => {
      setLogoutNotif(false);
      navigate("/");
    }, 3000);
    if (Object.keys(param).length === 1) {
      navigate("/");
    }
  };

  return (
    <Fragment>
      {loginModal && (
        <LoginComponent
          showRegister={showRegisterHandler}
          onClose={closeModalHandler}
        ></LoginComponent>
      )}
      {registerModal && (
        <RegisterComponent
          onShowLogin={showLoginHandler}
          onClose={closeModalHandler}
        ></RegisterComponent>
      )}

      <header className={classes.header}>
        <div className={classes.header__content}>
          <div className={classes.header__home}>
            <Link to="/">Home</Link>
          </div>
          <div className={classes.header__login}>
            {!user && (
              <button type="button" onClick={showLoginHandler}>
                Login
              </button>
            )}
            {user && (
              <div>
                <Link to={"/profile"}>
                  <span>Hi, {user ? user.fullname : ""} </span>
                </Link>{" "}
                <button
                  type="button"
                  className={classes.logout}
                  onClick={logOutHandler}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main>
        <div className={classes.content}>
          {logoutNotif && (
            <div className={classes.logoutNotif}>
              You Successfully Logged out
            </div>
          )}
          {props.children}
        </div>
      </main>
    </Fragment>
  );
};

export default UsersLayout;
