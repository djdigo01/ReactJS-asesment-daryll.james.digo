import AdminNavigationComponent from "../../components/admin/navigation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import classes from "./index.module.css";

const AdminLayout = (props) => {
  const navigate = useNavigate();

  // CHECK IF LOGGED IN
  const isLoggedin = JSON.parse(localStorage.getItem("admin"));
  useEffect(() => {
    if (!isLoggedin) {
      navigate("/superadmin");
    }
  }, [isLoggedin, navigate]);

  return (
    <div className={classes.admin}>
      <aside className={classes.sidebar}>
        <AdminNavigationComponent></AdminNavigationComponent>
      </aside>
      <div className={classes.content}>
        <div className={classes.pageTitle}>
          <h3>
            {props.title} {props.count}
          </h3>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
