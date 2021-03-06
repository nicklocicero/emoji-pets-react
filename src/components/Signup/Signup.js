import React from "react";

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
        value={props.emojiName}
        changed={props.setEmojiNameHandler}
      />
      <Input
        elementType="input"
        label="Emoji's Bio"
        value={props.emojiBio}
        changed={props.setEmojiBioHandler}
      />
    </div>
  );
};

export default signup;
