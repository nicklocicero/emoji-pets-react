import React from "react";

import classes from "./Status.css";
const status = props => {
  const deleteButton = props.isUsers ? <button onClick={props.onPress} >DELETE</button> : null;
  return (
    <div className={classes.Status}>
      <div className={classes.PetDiv}>
        <div style={{paddingBottom: 8}}>{props.name}</div>
        <div className={classes.EmojiChar}>{props.emoji}</div>
      </div>
      <div className={classes.StatusText}>{props.content}</div>
      {deleteButton}
    </div>
  );
};

export default status;
