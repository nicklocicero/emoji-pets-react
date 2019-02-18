import React, { Component } from "react";
import { Textfit } from "react-textfit";

import classes from "./Wall.css";
import Aux from "../../../hoc/Aux/Aux";
import Modal from "../../UI/Modal/Modal";

const wall = props => {
  const wall = (
    <Aux>
      <Modal
        show={props.edittingWall}
        modalClosed={props.cancelEditHandler}
      >
        <textarea
          rows="7"
          value={props.wallEdit}
          style={{ height: "auto", width: "100%" }}
          onChange={event => props.wallEditHandler(event)}
        />
        <button onClick={props.cancelEditHandler} className={classes.cancel}>
          CANCEL
        </button>
        <button onClick={props.wallSaveHandler} className={classes.save}>
          SAVE
        </button>
      </Modal>
      <div className={classes.Wall}>
        <div className={classes.WallColumn}>
          <Textfit
            mode="single"
            forceSingleModeWidth={true}
            max={122}
            style={{ margin: "0 auto", height: "80%", overflowY: "scroll" }}
          >
            <p
              className={classes.WallContent}
              style={{ overflow: "auto", whiteSpace: "pre-line" }}
            >
              {props.wall}
            </p>
          </Textfit>

          <button
            className={classes.WallButton}
            onClick={() => props.editWallHandler()}
          >
            CHANGE {props.emojiPetName.toUpperCase()}'S WALL
          </button>
        </div>
      </div>
    </Aux>
  );

  return wall;
};

export default wall;
