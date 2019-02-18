import React from "react";

import classes from "./FriendProfile.css";
import Wall from "../../UI/Wall/Wall";

const friendProfile = props => {
  return (
    <div className={classes.FriendProfile}>
      <div style={{ width: "100%" }}>
        <button className={classes.Button} onClick={props.goBack}>
          {"← BACK TO FRIENDS"}
        </button>
      </div>
      <h1>{props.emojiPetName}</h1>
      <p style={{ fontSize: "144px", padding: 0, margin: 0 }}>
        {props.emojiChar}
      </p>
      <Wall
        emojiPetName={props.emojiPetName}
        edittingWall={props.edittingWall}
        cancelEditHandler={props.cancelEditHandler}
        wallEdit={props.wallEdit}
        wallEditHandler={props.wallEditHandler}
        wallSaveHandler={props.wallSaveHandler}
        wall={props.wall}
        editWallHandler={props.editWallHandler}
      />
    </div>
  );
};

export default friendProfile;
