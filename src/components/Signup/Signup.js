import React, { Component } from "react";

import EmojiPicker from "./EmojiPicker/EmojiPicker";
import Input from "../UI/Input/Input";
import classes from "./Signup.css";

const signup = props => {
  
  return (
    <div className={classes.Signup}>
      <h2>Pick an Emoji</h2>
      <EmojiPicker
        clicked={props.setEmojiHandler}
        emojiKey={props.emojiIndex}
      />
      <Input
        elementType="input"
        label="Emoji Pet's Name"
        value={props.emojiPetName}
        changed={props.setEmojiNameHandler}
      />
    </div>
  );
};

export default signup;
