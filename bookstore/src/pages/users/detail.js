import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBookDetail } from "../../lib/users";
import UsersLayout from "../../layout/users/index";
import classes from "./detail.module.css";

const BookDetailPage = () => {
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
      <div className={classes.view}>
        <div className={classes.view_content}>
          <div className={classes.image_container}>
            <img
              src={bookDetail.img}
              alt={bookDetail.title}
              className={classes.image}
            ></img>
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
        <div className={classes.action}>
          {bookDetail.qty > 0 && (
            <Link to={`/reservation/${bookDetail._id}`}>Reserved</Link>
          )}
          <div className={classes.backtohome}>
            <Link to="/">Back to Home Page</Link>
          </div>
        </div>
      </div>
    </UsersLayout>
  );
};

export default BookDetailPage;
