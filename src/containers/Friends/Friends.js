import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-pets";

import classes from "./Friends.css";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { emojis } from "../../resources/Emojis/Emojis";
import Spinner from "../../components/UI/Spinner/Spinner";
import Friend from "../../components/UI/Friend/Friend";
import FriendProfile from "../../components/UI/FriendProfile/FriendProfile";

class Friends extends Component {
  state = {
    selectedUser: null,
    wallEdit: "",
    edittingWall: false,
    petNameEdit: "",
    isMounted: false
  };

  componentDidMount() {
    if (!this.props.users) {
      this.props.onFetchUsers(this.props.token);
    }
    this.setState({isMounted: true});
  }

  userCardClicked = key => {
    this.setState({ selectedUser: key });
  };

  setSelectedUserHandler = () => {
    this.setState({ selectedUser: null });
  };

  editWallHandler = () => {
    this.setState({
      edittingWall: true,
      wallEdit: this.props.users[this.state.selectedUser].wall
    });
  };

  cancelEditHandler = () => {
    this.setState({ edittingWall: false });
  };

  wallEditHandler = event => {
    this.setState({ wallEdit: event.target.value });
  };

  wallSaveHandler = () => {
    this.props.onPatchUser(this.props.token, this.state.selectedUser, {
      wall: this.state.wallEdit
    });
    this.setState({
      wallEdit: "",
      edittingWall: false
    });
  };

  render() {
    if (!this.state.isMounted || this.props.loadingUsers || this.props.loadingStatuses){
      return <Spinner />
    }
    const users = [];
    for (let key in this.props.users) {
      users.push(
        <Friend
          key={key}
          emojiChar={emojis[this.props.users[key].emojiIndex]}
          emojiName={this.props.users[key].emojiName}
          clicked={() => this.userCardClicked(key)}
          bio={this.props.users[key].emojiBio}
        />
      );
    }
    
    console.log("props.users and state.selectedUser : ", this.props.users + ", " + this.state.selectedUser)
    
    const display = this.state.selectedUser ? (
      <FriendProfile
        goBack={this.setSelectedUserHandler}
        emojiName={this.props.users[this.state.selectedUser].emojiName}
        emojiChar={
          emojis[this.props.users[this.state.selectedUser].emojiIndex]
        }
        edittingWall={this.state.edittingWall}
        cancelEditHandler={this.cancelEditHandler}
        wallEdit={this.state.wallEdit}
        wallEditHandler={this.wallEditHandler}
        editWallHandler={this.editWallHandler}
        wall={this.props.users[this.state.selectedUser].wall}
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
    loadingStatuses: state.statuses.loading,
    loadingUsers: state.users.loading,
    token: state.auth.token,
    users: state.users.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: token => dispatch(actions.fetchUsers(token)),
    onPatchUser: (token, userId, data) =>
      dispatch(actions.patchUser(token, userId, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Friends, axios));
