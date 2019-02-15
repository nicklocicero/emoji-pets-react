import React from 'react'
import { emojis } from "../../../resources/Emojis/Emojis";

import classes from "./EmojiPicker.css";
 
const emojiPicker = props => {
  
  const emojisView = emojis.map((emoj, index) => (
    <div
      className={classes.Emojis}
      key={index}
      onClick={() => props.clicked(index)}
      style={
        props.emojiKey === index
          ? { backgroundColor: "dodgerblue" }
          : null
      }
    >
      {emoj}
    </div>
  ));
  
  return (
    <div className={classes.EmojiDiv}>{emojisView}</div>
  );
}
 
export default emojiPicker;