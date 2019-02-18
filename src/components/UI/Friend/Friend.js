import React from "react";

import classes from "./Friend.css";
import { Textfit } from "react-textfit";

const friend = props => {
  return (
    <div className={classes.Friend} onClick={props.clicked}>
      <div style={{fontSize: '22px'}}>{props.emojiPetName}</div>
      <Textfit
        mode="single"
        forceSingleModeWidth={true}
        max={128}
      >
        <p className={classes.PetContent}>{props.emojiChar}</p>
      </Textfit>
      <div style={{position: "absolute", bottom:"0", paddingBottom: 8}}>{props.bio}</div>
    </div>
  );
};

export default friend;
