import React from "react";

const Dice = (props) => {
  return (
    <button
      type="button"
      className={`btn ${props.lockStatus ? "btn-danger" : "btn-info"}`}
      onClick={props.handleClick}
    >
      {props.number}
    </button>
  );
};

export default Dice;
