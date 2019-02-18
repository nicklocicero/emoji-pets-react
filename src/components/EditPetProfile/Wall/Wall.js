import React from "react";
import { Textfit } from "react-textfit";

import classes from "./Wall.css";

const wall = props => {
  const wall = (
    <div className={classes.Wall}>
      <div className={classes.WallColumn}>
        
      <Textfit mode="single" forceSingleModeWidth={true} max={122} style={{margin: '0 auto', height: "80%", overflowY: 'scroll'}}>
        <p className={classes.WallContent} style={{overflow: 'auto', whiteSpace: 'pre-line'}}>{props.wall}</p>
        </Textfit>
        
        <button className={classes.ClearWallButton} onClick={props.wallClicked}>
          EDIT MY WALL
        </button>
      </div>
      <div className={classes.PetColumn} >
        <Textfit mode="single" forceSingleModeWidth={true} max={144} style={{margin: '0 auto', height: "80%"}}>
          <p className={classes.PetContent}>{props.pet}</p>
        </Textfit>
        <button className={classes.ChangePetButton} onClick={props.petClicked}>
          {"CHANGE " + props.petName}
        </button>
      </div>
    </div>
  );

  return wall;
};

export default wall;
