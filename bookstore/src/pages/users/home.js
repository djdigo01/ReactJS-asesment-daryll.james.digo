import { useEffect, useState } from "react";
import { getHttp } from "../../lib/users";
import { Link } from "react-router-dom";
import useHttp from "../../store/users/use-http";
import UsersLayout from "../../layout/users/index";
import classes from "./home.module.css";

const UsersHomePage = () => {
  const { sendingData, status, data } = useHttp(getHttp);
  const [search, setSearch] = useState("");
  document.title = "Home Page";

  useEffect(() => {
    sendingData();
  }, [sendingData]);

  let filteredData = [];

  if (status === "completed") {
    if (search) {
      const filter = data.filter((v) => v.isDeleted === 0);
      const searchFilter = filter.filter(
        (val) => val.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
      filteredData.push(...searchFilter);
    } else {
      const filter = data.filter((v) => v.isDeleted === 0);
      filteredData.push(...filter);
    }
  }

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <UsersLayout>
      <div className={classes.search}>
        <input
          type="text"
          value={search}
          placeholder="Search Here..."
          onChange={searchHandler}
        ></input>
      </div>
      <div className={classes.books}>
        <ul className={classes.books__list}>
          {status === "completed" &&
            filteredData.map((val) => (
              <li key={val._id} className={classes.books__item}>
                {val.qty < 1 && (
                  <div className={classes.reserved_mark}> Reserved </div>
                )}
                <div className={classes.books__imagecontainer}>
                  <img
                    src={val.img}
                    alt={val.title}
                    className={classes.books__image}
                  ></img>
                </div>
                <div className={classes.title}>{val.title}</div>
                <div className={classes.author}>Author: {val.author}</div>
                <div className={classes.author}>ISBN: {val.isbn}</div>
                <div
                  className={
                    val.qty > 0 ? `${classes.action}` : `${classes.reserved}`
                  }
                >
                  <Link to={`/detail/${val._id}`}>View</Link>
                  {val.qty > 0 && (
                    <Link to={`/reservation/${val._id}`}>Reserve</Link>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </UsersLayout>
  );
};

export default UsersHomePage;
