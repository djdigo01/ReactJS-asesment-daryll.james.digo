import classes from "./datalist.module.css";

const DataListComponent = (props) => {
  const data = props.data;
  let populateData = [];
  if (props.search.trim() !== "") {
    const search = data.filter(
      (val) =>
        val.title.toLowerCase().indexOf(props.search.toLowerCase()) !== -1
    );
    populateData.push(...search);
  } else {
    populateData.push(...props.data)
  }

  const viewHandler = (e) => {
    const book_id = e.target.dataset.id;
    const dataFilter = populateData.filter((val) => val._id === book_id);
    props.onView({ isShow: true, data: dataFilter });
  };

  const editHandler = (e) => {
    const book_id = e.target.dataset.id;
    const dataFilter = populateData.filter((val) => val._id === book_id);
    props.onEdit({ isShow: true, data: dataFilter });
  };

  const removeHandler = (e) => {
    const book_id = e.target.dataset.id;
    const dataFilter = populateData.filter((val) => val._id === book_id);
    props.onRemove({ isShow: true, data: dataFilter });
  };

  const revertDeletedHandler = (e) => {
    const book_id = e.target.dataset.id;
    const dataFilter = populateData.filter((val) => val._id === book_id);
    props.onRemove({ isShow: true, data: dataFilter });
  };

  return (
    <div className={classes.table}>
      <ul>
        <li>Title</li>
        <li>ISBN</li>
        <li>Author</li>
        <li>Year/Volume</li>
        <li>Qty</li>
        <li>Action</li>
      </ul>
      {populateData.map((value, key) => (
        <ul key={key}>
          <li>{value.title}</li>
          <li>{value.isbn}</li>
          <li>{value.author}</li>
          <li>{value.year}</li>
          <li>{value.qty}</li>
          <li>
            <button data-id={value._id} onClick={viewHandler} className={classes.view}>
              View
            </button>
            {props.page !== "deleted" && (
              <button data-id={value._id} onClick={editHandler} className={classes.edit}>
                Edit
              </button>
            )}
            {props.page !== "deleted" && (
              <button data-id={value._id} onClick={removeHandler} className={classes.remove}>
                Remove
              </button>
            )}
            {props.page === "deleted" && (
              <button data-id={value._id} onClick={revertDeletedHandler} className={classes.revert}>
                Revert
              </button>
            )}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default DataListComponent;
