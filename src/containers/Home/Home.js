import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-pets";

import classes from "./Home.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import BigInput from "../../components/UI/BigInput/BigInput";
import Status from "../../components/UI/Status/Status";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { emojis } from "../../resources/Emojis/Emojis";

class Home extends Component {
  state = {
    statusInput: "",
    isMounted: false,
  };

  componentDidMount() {
    if (!this.props.statuses) {
      this.props.onFetchStatuses(this.props.token);
    }
    if (!this.props.users) {
      this.props.onFetchUsers(this.props.token, this.props.userId);
    }
    this.setState({ isMounted: true });
  }

  addStatusHandler = event => {
    event.preventDefault();
    const newStatus = {
      status: this.state.statusInput,
      userId: this.props.userId
    };
    this.setState({ statusInput: "" });
    this.props.onPostStatus(newStatus, this.props.token);
  };

  statusInputHandler = event => {
    this.setState({ statusInput: event.target.value });
  };

  deleteStatus = (token, postId) => {
    this.props.onDeleteStatus(this.props.token, postId);
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
    for (let i = this.props.statuses.length - 1; i >= 0; i--) {
      statuses.push(
        <Status
          emoji={emojis[this.props.statuses[i].emojiIndex]}
          content={this.props.statuses[i].status}
          key={i}
          name={this.props.statuses[i].emojiName}
          isUsers={this.props.statuses[i].userId === this.props.userId}
          onPress={() =>
            this.deleteStatus(this.props.token, this.props.statuses[i].id)
          }
        />
      );
    }

    return (
      <div className={classes.Home}>
        <h1 className={classes.Title}>EmojiPets Feed</h1>
        <BigInput
          value={this.state.statusInput}
          changed={event => this.statusInputHandler(event)}
          set={this.addStatusHandler}
          placeHolder="Enter a new status..."
          isStatus={true}
        />
        {statuses}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadingStatuses: state.statuses.loading,
    loadingUsers: state.users.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    statuses: state.statuses.statuses,
    users: state.users.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: (token, userId) => dispatch(actions.fetchUsers(token, userId)),
    onPostStatus: (postData, token) =>
      dispatch(actions.postStatus(postData, token)),
    onFetchStatuses: token => dispatch(actions.fetchStatuses(token)),
    onDeleteStatus: (token, id) => dispatch(actions.deleteStatus(token, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Home, axios));
