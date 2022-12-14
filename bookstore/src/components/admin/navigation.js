import { NavLink, useNavigate } from "react-router-dom";
import classes from "./navigation.module.css";

const AdminNavigationComponent = () => {
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.removeItem("admin");
    navigate("/superadmin")
  }
  return (
    <nav className={classes.navigation}>
      <ul>
        <li className={classes.item}>
          <NavLink to="/superadmin/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/superadmin/reserved">Reserved</NavLink>
        </li>
        <li>
          <NavLink to="/superadmin/add/book">Add Books</NavLink>
        </li>
        <li>
          <NavLink to="/superadmin/deleted">Deleted Books</NavLink>
        </li>
        <li>
          <button className={classes.logout} onClick={logOutHandler}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigationComponent;
