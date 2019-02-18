import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-pets";

import classes from "./Friends.css";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { emojis } from "../../resources/Emojis/Emojis";
import Friend from "../../components/UI/Friend/Friend";
import FriendProfile from "../../components/UI/FriendProfile/FriendProfile";

class Friends extends Component {
  state = {
    selectedUser: null,
    wallEdit: "",
    edittingWall: false,
    petNameEdit: ""
  };

  componentDidMount() {
    this.props.onFetchUsers(this.props.token);
  }

  userCardClicked = key => {
    this.setState({ selectedUser: key });
  };

  setSelectedUserHandler = () => {
    this.setState({ selectedUser: null });
  };
  
  editWallHandler = () => {
    this.setState({ edittingWall: true, wallEdit: this.props.users[this.state.selectedUser].userData.wall });
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
      this.state.selectedUser,
      this.state.wallEdit,
      true
    );
    this.setState({
      wallEdit: "",
      edittingWall: false
    });
  };

  render() {
    const users = [];
    for (let key in this.props.users) {
      users.push(
        <Friend
          key={key}
          emojiChar={emojis[this.props.users[key].userData.emojiIndex]}
          emojiPetName={this.props.users[key].userData.emojiPetName}
          clicked={() => this.userCardClicked(key)}
          bio={this.props.users[key].userData.emojiBio}
        />
      );
    }

    const display = this.state.selectedUser ? (
      <FriendProfile
        goBack={this.setSelectedUserHandler}
        emojiPetName={
          this.props.users[this.state.selectedUser].userData.emojiPetName
        }
        emojiChar={
          emojis[this.props.users[this.state.selectedUser].userData.emojiIndex]
        }
        edittingWall={this.state.edittingWall}
        cancelEditHandler={this.cancelEditHandler}
        wallEdit={this.state.wallEdit}
        wallEditHandler={this.wallEditHandler}
        editWallHandler={this.editWallHandler}
        wall={this.props.users[this.state.selectedUser].userData.wall}
        wallSaveHandler={this.wallSaveHandler}
      />
    ) : (
      <div className={classes.Friends}>
        <h1>Make a new friend!</h1>
        <div className={classes.FriendsDiv}>{users}</div>
      </div>
    );

    return display;
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
    users: state.users.users,
    wall: state.auth.wall
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: token => dispatch(actions.fetchUsers(token)),
    onUpdateWall: (token, userId, wall) => dispatch(actions.patchWall(token, userId, wall))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Friends, axios));