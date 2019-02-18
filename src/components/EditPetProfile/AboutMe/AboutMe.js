import React from 'react'
 
import classes from "./AboutMe.css";

const aboutMe = props => {
  return (
    <div className={classes.Input}>
        <form onSubmit={props.set}>
          <input
            placeholder="Enter a new status..."
            className={classes.InputElement}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            style={props.styleSpecific}
          />
          <button className={classes.StatusButton}>SET YOUR STATUS</button>
        </form>
      </div>
  );
}
 
export default aboutMe;