import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookDetail } from "../../lib/users";
import UsersLayout from "../../layout/users/index";
import ReservationFormComponent from "../../components/users/reservationForm";
import classes from "./reservation.module.css";

const UsersReservationPage = () => {
  const params = useParams();
  const [bookDetail, setBookDetail] = useState({});
  document.title = bookDetail.title;

  useEffect(() => {
    const fetch = async () => {
      const response = await getBookDetail(params);
      setBookDetail(response);
    };
    fetch();
  }, [params]);

  return (
    <UsersLayout>
      <div className={classes.reservation}>
        <div className={classes.reservation_content}>
          <div className={classes.image_container}>
            <img src={bookDetail.img} alt={bookDetail.title} className={classes.image}></img>
          </div>
          <div className={classes.book_details}>
            <ul>
              <li>
                <span>Title:</span>
                <span>{bookDetail.title}</span>
              </li>
              <li>
                <span>Author:</span>
                <span>{bookDetail.author}</span>
              </li>
              <li>
                <span>Year:</span>
                <span>{bookDetail.year}</span>
              </li>
              <li>
                <span>ISBN:</span>
                <span>{bookDetail.isbn}</span>
              </li>
              <li>
                <span>Date added to site:</span>
                <span>{bookDetail.date_created}</span>
              </li>
              <li>
                <span>Status: </span>
                <span>
                  {bookDetail.qty > 0 ? `(${bookDetail.qty}) Available` : "Not Available"}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.book_description}>
          <h5>Description</h5>
          <p>{bookDetail.description}</p>
        </div>
        <ReservationFormComponent
          bookData={bookDetail.qty}
        ></ReservationFormComponent>
        <div className={classes.backtohome}>
          <Link to="/">Back to Home Page</Link>
        </div>
      </div>
    </UsersLayout>
  );
};

export default UsersReservationPage;
