import { Routes, Route } from "react-router-dom";
import SuperAdminLoginPage from "./../pages/superadmin/login";
import SuperAdminHomePage from "./../pages/superadmin/home";
import SuperAdminAddPage from "./../pages/superadmin/add";
import SuperAdminDeletedPage from "./../pages/superadmin/deleted";
import SuperAdminReservedPage from "./../pages/superadmin/reserved";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* SUPERADMIN */}
      <Route path="/superadmin" exact element={<SuperAdminLoginPage />} />
      <Route path="/superadmin/home" element={<SuperAdminHomePage />} />
      <Route path="/superadmin/add/book" element={<SuperAdminAddPage />} />
      <Route path="/superadmin/deleted" element={<SuperAdminDeletedPage />} />
      <Route path="/superadmin/reserved" element={<SuperAdminReservedPage />} />
    </Routes>
  );
};

export default AdminRoutes;
