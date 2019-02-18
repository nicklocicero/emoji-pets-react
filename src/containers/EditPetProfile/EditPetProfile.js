import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-pets";

import BigInput from "../../components/UI/BigInput/BigInput";
import Status from "../../components/UI/Status/Status";
import { emojis } from "../../resources/Emojis/Emojis";

import Wall from "../../components/EditPetProfile/Wall/Wall";
import AboutMe from "../../components/EditPetProfile/AboutMe/AboutMe";
import classes from "./EditPetProfile.css";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class EditPetProfile extends Component {
  state = {
    wall: "some writing from some people see?",
    wallEdit: "",
    statusInput: "",
    edittingWall: false,
    edittingPet: false,
    emojiKeyEdit: null,
    petNameEdit: ""
  };

  componentWillMount() {
    this.props.onFetchUsers(this.props.token);
    this.props.onFetchUserStatuses(this.props.token, this.props.userId);
  }

  saveWallEditHandler = () => {
    this.setState({ edittingWall: true, wallEdit: this.props.wall });
  };

  cancelEditHandler = () => {
    this.setState({ edittingWall: false });
  };

  wallEditHandler = event => {
    this.setState({ wallEdit: event.target.value });
  };

  wallSaveHandler = () => {
    this.props.onUpdateWall(
      this.props.token,
      this.props.userId,
      this.state.wallEdit
    );
    this.setState({
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
      petNameEdit: this.props.emojiPetName
    });
  };

  petSaveHandler = (key, name) => {
    this.props.onSetPet(this.props.token, this.props.userId, key, name);
    this.setState({
      petName: name,
      petNameEdit: "",
      edittingPet: false
    });
  };

  setStatePetKey = id => {
    this.setState({ emojiKeyEdit: id });
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
      userId: this.props.userId,
      emojiIndex: this.props.emojiIndex,
      emojiPetName: this.props.emojiPetName
    };
    this.setState({ statusInput: "" });
    this.props.onPostStatus(newStatus, this.props.token);
  };

  petNameInputHandler = event => {
    this.setState({ petNameEdit: event.target.value });
  };

  render() {
    const statuses = [];

    for (let i = this.props.statuses.length - 1; i >= 0; i--) {
      // Going backwards to get most recent first
      statuses.push(
        <Status
          emoji={
            emojis[
              this.props.statuses[i].emojiIndex
            ]
          }
          content={this.props.statuses[i].status}
          key={i}
          name={this.props.statuses[i].emojiPetName}
        />
      );
    }

    const emojiIndex =
      this.state.emojiKeyEdit === null
        ? this.props.emojiIndex
        : this.state.emojiKeyEdit;

    const emojisView = emojis.map((emoj, index) => (
      <div
        className={classes.Emojis}
        key={index}
        onClick={() => this.setStatePetKey(index)}
        style={emojiIndex === index ? { backgroundColor: "dodgerblue" } : null}
      >
        {emoj}
      </div>
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
          <BigInput
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
          <button
            onClick={() =>
              this.petSaveHandler(emojiIndex, this.state.petNameEdit)
            }
            className={classes.save}
          >
            SAVE
          </button>
        </Modal>

        <div className={classes.EditPetProfile}>
          { 
            /*  This will be updated later to edit the bio.... to be continued.
            <AboutMe
            value={this.state.statusInput}
            changed={event => this.statusInputHandler(event)}
            set={this.addStatusHandler}
            placeHolder="Enter a new status..."
            isStatus={true}
          /> */}
          <Wall
            isEditable={this.state.editable}
            wall={this.props.wall}
            pet={emojis[this.props.emojiIndex]}
            petName={this.props.emojiPetName}
            petClicked={this.editPetHandler}
            wallClicked={this.saveWallEditHandler}
          />
          <BigInput
            value={this.state.statusInput}
            changed={event => this.statusInputHandler(event)}
            set={this.addStatusHandler}
            placeHolder="Enter a new status..."
            isStatus={true}
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
    emojiPetName: state.auth.emojiPetName,
    wall: state.auth.wall,
    users: state.users.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
    onPostStatus: (postData, token) =>
      dispatch(actions.postStatus(postData, token)),
    onFetchUserStatuses: (token, userId) =>
      dispatch(actions.fetchUserStatuses(token, userId)),
    onSetPet: (token, userId, emojiIndex, emojiPetName) =>
      dispatch(actions.setPet(token, userId, emojiIndex, emojiPetName)),
    onFetchUsers: token => dispatch(actions.fetchUsers(token)),
    onUpdateWall: (token, userId, wall) => {
      dispatch(actions.setWall(token, userId, wall));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(EditPetProfile, axios));
