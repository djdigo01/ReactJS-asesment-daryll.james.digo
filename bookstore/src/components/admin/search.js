import classes from "./search.module.css"

const SearchComponent = (props) => {

  const searchHandler = (e) => {
    props.onSearch(e.target.value)
  }
  return (
    <div className={classes.search}>
      <input type="text" placeholder="Search Here" onChange={searchHandler} />
    </div>
  );
};

export default SearchComponent;
