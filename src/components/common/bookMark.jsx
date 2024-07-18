import React from "react";
const BookMark = (props) => {
  return (
    <>
      <button onClick={() => props.onClick()}>
        <i
          className={"bi bi-bookmark" + (props.status ? "-heart-fill" : "")}
        ></i>
      </button>
    </>
  );
};
export default BookMark;
