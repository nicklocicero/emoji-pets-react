import React from 'react';

import classes from './Button.css';

const button = (props) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    style={props.disabled ? {color: "#ccc", cursor: "not-allowed"} : null}
    onClick={props.clicked}>{props.children}</button>
);

export default button;