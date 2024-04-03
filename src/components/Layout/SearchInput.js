import React, { Fragment } from "react";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./SearchInput.module.css";

const SearchInput = (props) => {
  const onChangeHandle = (e) => {
    console.log(e.target.value);
  };

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <SearchIcon className={classes.icon} fontSize="small" />
        <input
          className={classes.input}
          onChange={onChangeHandle}
          placeholder="Next Food Doorを検索"
        />
      </div>
    </Fragment>
  );
};

export default SearchInput;
