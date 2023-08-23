import React from "react";

const Button = (props) => {
  return (
    <div className="text-center">
      <button
        type="button"
        className="roll-button btn btn-primary"
        onClick={props.handleClick}
      >
        {props.gameStatus ? "Reset Game" : "Roll"}
      </button>
    </div>
  );
};

export default Button;
