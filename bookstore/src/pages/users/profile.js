import { useEffect, useState } from "react";
import { getReservedHttp } from "../../lib/users";
import UsersLayout from "../../layout/users/index";
import classes from "./home.module.css";
import { useNavigate } from "react-router-dom";

const UsersProfilePage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  document.title = "Home Page";

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/");
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await getReservedHttp();
      setData(response);
    };
    fetch();
  }, []);

  let filteredData = [];
  data.filter((v, key) => {
    const email = v.email === user.email ? data : "";
    const books = email[key].book_reserved.filter(
      (bookValue) => bookValue._id === email[key].book_id
    );
    const resultData = { ...email, ...books };
    return filteredData.push(resultData);
  });

  return (
    <UsersLayout>
      <div className={classes.reserved_title}>
        {filteredData.length > 0 && <div>Hi, You reserved the Following Books Below</div>}
        {filteredData.length === 0 && <div>Hi, No Books Borrowed so far</div>}
      </div>
      <div className={classes.books}>
        <ul className={classes.books__list}>
          {filteredData.map((val) => (
            <li key={val._id} className={classes.books__item}>
              <div className={classes.books__imagecontainer}>
                <img
                  src={val[0].img}
                  alt={val[0].title}
                  className={classes.books__image}
                ></img>
              </div>
              <div className={classes.title}>{val[0].title}</div>
              <div className={classes.author}>Author: {val[0].author}</div>
              <div className={classes.author}>
                Date Borrowed:
                <div>{new Date(val[0].date_created).toLocaleString()}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </UsersLayout>
  );
};

export default UsersProfilePage;
