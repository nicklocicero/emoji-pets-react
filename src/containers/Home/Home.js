import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-pets";

import StatusInput from "../../components/Home/StatusInput/StatusInput";
import Status from "../../components/Home/Status/Status";
import { emojis } from "../../resources/Emojis/Emojis";

import Wall from "../../components/Home/Wall/Wall";
import classes from "./Home.css";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class Home extends Component {
  state = {
    wall: "some writing from some people see?",
    wallEdit: "",
    statusInput: "",
    edittingWall: false,
    edittingPet: false,
    emojiKey: 2,
    petNameEdit: ""
  };
  
  componentDidMount() {
    this.props.onFetchStatuses(this.props.token, this.props.userId);
  }

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
      edittingPet: true,
      petNameEdit: this.state.petName
    });
  };

  petSaveHandler = () => {
    this.setState({
      petName: this.state.petNameEdit,
      petNameEdit: "",
      edittingPet: false,
      pet: emojis[this.state.emojiKey]
    });
  };

  setPetHandler = id => {
    this.setState({ emojiKey: id });
  };

  petInputHandler = event => {
    this.setState({ petNameEdit: event.target.value });
  };

  statusInputHandler = event => {
    this.setState({ statusInput: event.target.value });
  };

  addStatusHandler = event => {
    event.preventDefault();
    const newStatus = {
      status: this.state.statusInput,
      userId: this.props.userId
    }
    this.props.onPostStatus(newStatus, this.props.token);
  };

  petNameInputHandler = event => {
    this.setState({ petNameEdit: event.target.value });
  };

  render() {
    const statuses = [];

    for (let i = this.props.statuses.length - 1; i >= 0; i--) {
      // Going backwards to get most recent first
      statuses.push(<Status content={this.props.statuses[i].status} key={i} />);
    }

    const emojisView = emojis.map((emoj, index) => (
      <div
        className={classes.Emojis}
        key={index}
        onClick={() => this.setPetHandler(index)}
        style={
          this.props.emojiIndex === index
            ? { backgroundColor: "dodgerblue" }
            : null
        }
      >
        {emoj}
      </div>
    ));
    console.log("the emoji should be: ", emojis[this.props.emojiIndex]);
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
          <StatusInput
            value={this.state.petNameEdit}
            changed={event => this.petInputHandler(event)}
            styleSpecific={{
              border: "1px solid dodgerblue",
              backgroundColor: "white",
              color: "dodgerblue"
            }}
          />
          <div className={classes.EmojiDiv}>{emojisView}</div>
          <button onClick={this.cancelPetHandler} className={classes.cancel}>
            CANCEL
          </button>
          <button onClick={this.petSaveHandler} className={classes.save}>
            SAVE
          </button>
        </Modal>

        <div className={classes.Home}>
          <StatusInput
            value={this.state.statusInput}
            changed={event => this.statusInputHandler(event)}
            set={this.addStatusHandler}
            placeHolder="Enter a new status..."
            isStatus={true}
          />
          <Wall
            isEditable={this.state.editable}
            wall={this.state.wall}
            pet={emojis[this.props.emojiIndex]}
            petName={this.props.emojiPetName}
            petClicked={this.editPetHandler}
            wallClicked={this.saveWallEditHandler}
          />
          {statuses}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    statuses: state.statuses.statuses,
    loading: state.statuses.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    emojiIndex: state.auth.emojiIndex,
    emojiPetName: state.auth.emojiPetName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
    onPostStatus: (postData, token) =>
      dispatch(actions.postStatus(postData, token)),
    onFetchStatuses: (token, userId) => dispatch(actions.fetchedStatuses(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Home, axios));
