import React, { Component } from "react";

import StatusInput from "../../components/Home/StatusInput/StatusInput";
import Status from "../../components/Home/Status/Status";
import { emojis } from "../../resources/Emojis/Emojis";

import Wall from "../../components/Home/Wall/Wall";
import classes from "./Home.css";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";

class Home extends Component {
  state = {
    wall: "some writing from some people see?",
    wallEdit: "",
    pet: "🍜",
    statusInput: "",
    statuses: [
      "I want you to want me!",
      "she love that love you know that love that love that love",
      "It's gonna take a lot to drag me away from you; There's nothing that a hundred men or more could ever do "
    ],
    edittingWall: false,
    edittingPet: false
  };

  saveWallEditHandler = () => {
    this.setState({ edittingWall: true, wallEdit: this.state.wall });
  };

  cancelEditHandler = () => {
    this.setState({ edittingWall: false });
  };

  wallEditHandler = event => {
    this.setState({ wallEdit: event.target.value });
  };

  wallSaveHandler = () => {
    this.setState({
      wall: this.state.wallEdit,
      wallEdit: "",
      edittingWall: false
    });
  };

  cancelPetHandler = () => {
    this.setState({ edittingPet: false });
  };

  editPetHandler = () => {
    this.setState({
      edittingPet: true
    });
  };
  
  setPetHandler = id => {
    this.setState({pet: emojis[id], edittingPet: false});
  }

  statusInputHandler = event => {
    this.setState({ statusInput: event.target.value });
  };

  addStatusHandler = event => {
    event.preventDefault();
    console.log(this.state.statuses);
    const newStatusList = [...this.state.statuses];
    newStatusList.push(this.state.statusInput);
    this.setState({ statuses: newStatusList, statusInput: "" });
  };

  render() {
    const statuses = [];

    for (let i = this.state.statuses.length - 1; i >= 0; i--) {
      // Going backwards to get most recent first
      statuses.push(<Status content={this.state.statuses[i]} key={i} />);
    }

    const emojisView = emojis.map((emoj, index) => (
      <div className={classes.Emojis} key={index} onClick={() => this.setPetHandler(index)}>{emoj}</div>
    ));

    return (
      <Aux>
        <Modal
          show={this.state.edittingWall}
          modalClosed={this.cancelEditHandler}
        >
          <textarea
            rows="7"
            value={this.state.wallEdit}
            style={{ height: "auto", width: "100%" }}
            onChange={event => this.wallEditHandler(event)}
          />
          <button onClick={this.cancelEditHandler} className={classes.cancel}>
            CANCEL
          </button>
          <button onClick={this.wallSaveHandler} className={classes.save}>
            SAVE
          </button>
        </Modal>

        <Modal
          show={this.state.edittingPet}
          modalClosed={this.cancelPetHandler}
        >
          <div className={classes.EmojiDiv}>{emojisView}</div>
        </Modal>

        <div className={classes.Home}>
          <StatusInput
            clicked={this.clearWallHandler}
            value={this.state.statusInput}
            changed={event => this.statusInputHandler(event)}
            set={event => this.addStatusHandler(event)}
          />
          <Wall
            isEditable={this.state.editable}
            wall={this.state.wall}
            pet={this.state.pet}
            petClicked={this.editPetHandler}
            wallClicked={this.saveWallEditHandler}
          />
          {statuses}
        </div>
      </Aux>
    );
  }
}

export default Home;
