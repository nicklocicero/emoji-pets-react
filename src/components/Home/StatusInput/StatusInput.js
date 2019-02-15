import React from "react";

import classes from "./StatusInput.css";

const statusInput = props => {
  const button = (
    <button className={classes.StatusButton}>SET YOUR STATUS</button>
  );
  
  return (
    <div className={classes.Input}>
      <form onSubmit={props.set}>
        <input
          placeholder={props.placeHolder}
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          style={props.styleSpecific}
        />
        {props.isStatus ? button : null}
      </form>
    </div>
  );
};

export default statusInput;
