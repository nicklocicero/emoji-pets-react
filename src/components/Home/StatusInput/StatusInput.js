import React from "react";

import classes from "./StatusInput.css";

const statusInput = props => {
  return (
    <div className={classes.Input}>
      <form onSubmit={props.set}>
        <button className={classes.StatusButton}>SET A STATUS</button>
        <input
          placeholder="Enter a new status..."
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      </form>
    </div>
  );
};

export default statusInput;
