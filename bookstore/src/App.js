import "./App.css";
import { Fragment } from "react";
import AdminRoutes from "./routes/admin";
import UsersRoutes from "./routes/users";
import { Provider } from "react-redux";
import adminStore from "./store/admin/admin";
import userStore from "./store/users/users";

const App = () => {
  return (
    <Fragment>
      <Provider store={adminStore}>
        <AdminRoutes ></AdminRoutes>
      </Provider>
      <Provider store={userStore}>
        <UsersRoutes ></UsersRoutes>
      </Provider>
    </Fragment>
  );
};

export default App;
