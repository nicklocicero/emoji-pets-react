import React, { Component } from "react";

import classes from "./BigInput.css";

class BigInput extends Component {
  
  render() {
    const button = (
      <button className={classes.StatusButton}>SET YOUR STATUS</button>
    );
    
    return (
      <div className={classes.Input}>
        <form onSubmit={this.props.set}>
          <input
            placeholder="Enter a new status..."
            className={classes.InputElement}
            {...this.props.elementConfig}
            value={this.props.value}
            onChange={this.props.changed}
            style={this.props.styleSpecific}
          />
          {this.props.isStatus ? button : null}
        </form>
      </div>
    );
  }
};

export default BigInput;
