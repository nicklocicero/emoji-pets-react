import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import Layout from "./hoc/Layout/Layout";
import * as actions from "./store/actions/index";
import Logout from "./containers/Auth/Logout/Logout";

const asyncEditPetProfile = asyncComponent(() => {
  return import("./containers/EditPetProfile/EditPetProfile");
});

const asyncHome = asyncComponent(() => {
  return import("./containers/Home/Home");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
})

const asyncFriends = asyncComponent(() => {
  return import("./containers/Friends/Friends");
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAuthSignup();
  }

  render() {
    let routes = (
      <Switch>
        {/* <Route path="/react/emoji-pets/auth" component={asyncAuth} /> */}
        <Route to="/react/emoji-pets" exact component={asyncAuth} />
        <Redirect to="/react/emoji-pets" />
        {/* <Route path="/react/emoji-pets" exact component={asyncEditPetProfile} />
         */}
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/react/emoji-pets/logout" component={Logout} />
          <Route path="/react/emoji-pets/edit-pet-profile" exact component={asyncEditPetProfile} />
          <Route path="/react/emoji-pets/friends" exact component={asyncFriends} />
          <Route path="/react/emoji-pets" exact component={asyncHome} />
          <Redirect to="/react/emoji-pets" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuthSignup: () => dispatch(actions.authCheckState)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
