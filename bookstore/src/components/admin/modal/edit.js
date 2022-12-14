import { useState } from "react";
import { updateHttp } from "../../../lib/admin";
import ModalLayoutComponent from "./modalLayout";

const EditBooksModal = (props) => {
  const [successNotif, setSuccessNotif] = useState(false)
  const [formError, setFormError] = useState();
  const [formValue, setFormValue] = useState({
    _id: props.data[0]._id,
    img: props.data[0].img,
    title: props.data[0].title,
    description: props.data[0].description,
    author: props.data[0].author,
    year: props.data[0].year,
    isbn: props.data[0].isbn,
    qty: props.data[0].qty,
    isDeleted: 0,
    date_created: props.data[0].date_created,
  });

  const isDeleted = 0;
  const date_created = new Date();

  const formInputHandler = (val) => {
    setFormValue((prev) => {
      return { ...prev, ...val, date_created, isDeleted };
    });
  };

  const updateBookHandler = (e) => {
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
      return
    } else {
      updateHttp(formValue);
      setSuccessNotif(true)
      setTimeout(() => {
        setSuccessNotif(false)
        closeHandler();
      },3000)
    }
  };

  const closeHandler = () => {
    props.onClose({ isShow: false, data: null });
  };

  return (
    <ModalLayoutComponent title="Edit Book Information">
      <form onSubmit={updateBookHandler}>
        {successNotif && <div className="notification">Succesfully Edited the Item.</div>}
        <div className="">
          <label htmlFor="title">Book Image: </label>
          <input
            type="text"
            value={formValue.img}
            onChange={(e) => formInputHandler({ img: e.target.value })}
          />
        </div>
        <div className="">
          <label htmlFor="title">Book Title: </label>
          <input
            type="text"
            value={formValue.title}
            onChange={(e) => formInputHandler({ title: e.target.value })}
          />
        </div>
        <div className="">
          <label htmlFor="description">Book Description: </label>
          <textarea
            value={formValue.description}
            onChange={(e) => formInputHandler({ description: e.target.value })}
          />
        </div>
        <div className="">
          <label htmlFor="isbn">ISBN: </label>
          <input
            type="text"
            value={formValue.isbn}
            onChange={(e) => formInputHandler({ isbn: e.target.value })}
          />
        </div>
        <div className="">
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            value={formValue.author}
            onChange={(e) => formInputHandler({ author: e.target.value })}
          />
        </div>
        <div className="">
          <label htmlFor="year">Year / Volume: </label>
          <input
            type="text"
            value={formValue.year}
            onChange={(e) => formInputHandler({ year: e.target.value })}
          />
        </div>
        <div className="">
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            value={formValue.qty}
            onChange={(e) => formInputHandler({ qty: e.target.value })}
          />
        </div>
        <span>{formError}</span>
        <div className="action">
          <button type="button" onClick={closeHandler}>
            Close
          </button>
          <button>Update</button>
        </div>
      </form>
    </ModalLayoutComponent>
  );
};

export default EditBooksModal;
