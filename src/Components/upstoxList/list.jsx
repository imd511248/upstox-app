import React from "react";
const ListData = ({ listName, className, TabHandler }) => {
  return (
    <>
      <li onClick={TabHandler} className={className}>
        {listName}
      </li>
    </>
  );
};
export default ListData;
