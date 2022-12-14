import { Routes, Route } from "react-router-dom";
import UsersHomePage from "./../pages/users/home";
import UsersProfilePage from "./../pages/users/profile";
import UsersReservationPage from "./../pages/users/reservation";
import BookDetailPage from "./../pages/users/detail"

const UsersRoutes = () => {
  return (
    <Routes>
      {/* USERS PAGES */}
      <Route path="/" exact element={<UsersHomePage />} />
      <Route path="/detail/:id" exact element={<BookDetailPage />} />
      <Route path="/profile" element={<UsersProfilePage />} />
      <Route path="/reservation/:id" element={<UsersReservationPage />} />
    </Routes>
  );
};

export default UsersRoutes;
