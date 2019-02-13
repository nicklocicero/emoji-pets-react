import React from "react";
import ScaleText from "react-scale-text";
import { Textfit } from "react-textfit";

import classes from "./Wall.css";

const wall = props => {
  const wall = (
    <div className={classes.Wall}>
      <div className={classes.WallColumn}>
        <p className={classes.WallContent} style={{overflow: 'auto', whiteSpace: 'pre-line'}}>{props.wall}</p>
        <button className={classes.ClearWallButton} onClick={props.wallClicked}>
          EDIT MY WALL
        </button>
      </div>
      <div className={classes.PetColumn} >
        <button className={classes.ChangePetButton} onClick={props.petClicked}>
          CHANGE MY PET
        </button>
        <Textfit mode="single" forceSingleModeWidth={true} max={240} style={{margin: '0 auto'}}>
          <p className={classes.PetContent}>{props.pet}</p>
        </Textfit>
      </div>
    </div>
  );

  return wall;
};

export default wall;
