import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-pets";

import BigInput from "../../components/UI/BigInput/BigInput";
import Status from "../../components/UI/Status/Status";
import { emojis } from "../../resources/Emojis/Emojis";

import Wall from "../../components/EditPetProfile/Wall/Wall";
// import AboutMe from "../../components/EditPetProfile/AboutMe/AboutMe";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./EditPetProfile.css";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class EditPetProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallEdit: "",
      statusInput: "",
      edittingWall: false,
      edittingPet: false,
      emojiKeyEdit: null,
      petNameEdit: "",
      isMounted: false
    };
  }

  componentDidMount() {
    if (!this.props.users) {
      this.props.onFetchUsers(this.props.token, this.props.userId);
    }
    if (!this.props.statuses) {
      this.props.onFetchStatuses(this.props.token);
    }
    this.setState({ isMounted: true });
  }

  saveWallEditHandler = () => {
    this.setState({
      edittingWall: true,
      wallEdit: this.props.users[this.props.userId].wall
    });
  };

  cancelEditHandler = () => {
    this.setState({ edittingWall: false });
  };

  wallEditHandler = event => {
    this.setState({ wallEdit: event.target.value });
  };

  wallSaveHandler = () => {
    this.props.onPatchUser(this.props.token, this.props.userId, {
      wall: this.state.wallEdit
    });
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
      petNameEdit: this.props.users[this.props.userId].emojiName
    });
  };

  petSaveHandler = data => {
    this.props.onPatchUser(this.props.token, this.props.userId, data);
    this.setState({
      petName: data.name,
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
      userId: this.props.userId
    };
    this.setState({ statusInput: "" });
    this.props.onPostStatus(this.props.token, newStatus);
  };

  petNameInputHandler = event => {
    this.setState({ petNameEdit: event.target.value });
  };

  render() {
    if (
      !this.state.isMounted ||
      this.props.loadingUsers ||
      this.props.loadingStatuses
    ) {
      return <Spinner />;
    }
    const statuses = [];
    console.log(this.props.statuses);
    
    console.log("users: ", this.props.users);
    for (let key in this.props.statuses) {
      // Going backwards to get most recent first
      console.log("key ", key);
      statuses.push(
        <Status
          emoji={emojis[this.props.users[this.props.statuses[key].userId].emojiIndex]}
          content={this.props.statuses[key].status}
          key={key}
          name={this.props.users[this.props.statuses[key].userId].emojiName}
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
              this.petSaveHandler({
                emojiIndex: emojiIndex,
                emojiName: this.state.petNameEdit
              })
            }
            className={classes.save}
          >
            SAVE
          </button>
        </Modal>

        <div className={classes.EditPetProfile}>
          {/*  This will be updated later to edit the bio.... to be continued.
            <AboutMe
            value={this.state.statusInput}
            changed={event => this.statusInputHandler(event)}
            set={this.addStatusHandler}
            placeHolder="Enter a new status..."
            isStatus={true}
          /> */}
          <Wall
            isEditable={this.state.editable}
            wall={this.props.users[this.props.userId].wall}
            pet={emojis[this.props.users[this.props.userId].emojiIndex]}
            petName={this.props.users[this.props.userId].emojiName}
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
    loadingStatuses: state.statuses.loading,
    loadingUsers: state.users.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    users: state.users.users,
    statuses: state.statuses.statuses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
    onFetchUsers: (token, userId) =>
      dispatch(actions.fetchUsers(token, userId)),
    onPatchUser: (token, userId, data) =>
      dispatch(actions.patchUser(token, userId, data)),
    onPostStatus: (token, postData) =>
      dispatch(actions.postStatus(token, postData)),
    onFetchStatuses: token => dispatch(actions.fetchStatuses(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(EditPetProfile, axios));
