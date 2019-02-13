import React from 'react'

import classes from './Status.css';
const status = props => {
  return (
    <div className={classes.Status}>
      {props.content}
    </div>
  );
}
 
export default status;