import AdminLayout from "../../layout/admin";
import { useState } from "react";
import { sendHttp } from "../../lib/admin";
import useHttp from "../../store/admin/use-http";
import classes from "./add.module.css";

const SuperAdminAddPage = () => {
  const [notification, setNotification] = useState(false);
  const [formError, setFormError] = useState("");
  const [formValue, setFormValue] = useState({
    img: "",
    title: "",
    description: "",
    author: "",
    year: "",
    isbn: "",
    qty: "",
  });
  const { sendingData } = useHttp(sendHttp);
  const isDeleted = 0;
  const date_created = new Date();

  const formInputHandler = (val) => {
    setFormValue((prev) => {
      return { ...prev, ...val, date_created, isDeleted };
    });
  };

  const submitBookHandler = (e) => {
    e.preventDefault();
    if (
      formValue.img.trim() === "" ||
      formValue.title.trim() === "" ||
      formValue.description.trim() === "" ||
      formValue.author.trim() === "" ||
      formValue.year.trim() === "" ||
      formValue.isbn.trim() === "" ||
      formValue.qty.trim() === ""
    ) {
      setFormError("Please fill out all the details");
    } else {
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 3000);

      setFormError("");
      sendingData(formValue);
      resetHandler();
    }
  };

  const resetHandler = () => {
    setFormValue({
      img: "",
      title: "",
      description: "",
      author: "",
      year: "",
      isbn: "",
      qty: "",
    });
  };

  return (
    <AdminLayout title="ADD BOOK">
      <div className={classes.add}>
        {notification && (
          <div className={classes.notif}> SUCCESSFULLY ADDED </div>
        )}
        <form onSubmit={submitBookHandler}>
          <div className={classes.input_item}>
            <label htmlFor="img">Image Link: * </label>
            <input
              type="text"
              value={formValue.img}
              onChange={(e) => formInputHandler({ img: e.target.value })}
            />
          </div>
          <div className={classes.input_item}>
            <label htmlFor="title">Book Title: * </label>
            <input
              type="text"
              value={formValue.title}
              onChange={(e) => formInputHandler({ title: e.target.value })}
            />
          </div>
          <div className={classes.input_item}>
            <label htmlFor="description">Book Description: * </label>
            <textarea
              value={formValue.description}
              onChange={(e) =>
                formInputHandler({ description: e.target.value })
              }
            />
          </div>
          <div className={classes.input_item}>
            <label htmlFor="isbn">ISBN: * </label>
            <input
              type="text"
              value={formValue.isbn}
              onChange={(e) => formInputHandler({ isbn: e.target.value })}
            />
          </div>
          <div className={classes.input_item}>
            <label htmlFor="author">Author: *</label>
            <input
              type="text"
              value={formValue.author}
              onChange={(e) => formInputHandler({ author: e.target.value })}
            />
          </div>
          <div className={classes.input_item}>
            <label htmlFor="year">Year / Volume: * </label>
            <input
              type="text"
              value={formValue.year}
              onChange={(e) => formInputHandler({ year: e.target.value })}
            />
          </div>
          <div className={classes.input_item}>
            <label htmlFor="quantity">Quantity: *</label>
            <input
              type="number"
              value={formValue.qty}
              onChange={(e) => formInputHandler({ qty: e.target.value })}
            />
          </div>
          <div className={classes.errorMsg}>{formError}</div>
          <div className={classes.action}>
            <button
              type="button"
              onClick={resetHandler}
              className={classes.reset}
            >
              Reset
            </button>
            <button className={classes.submit}>Submit</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default SuperAdminAddPage;
