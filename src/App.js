import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import Layout from "./hoc/Layout/Layout";
import * as actions from "./store/actions/index";
import Logout from "./containers/Auth/Logout/Logout";

const asyncHome = asyncComponent(() => {
  return import("./containers/Home/Home");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
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
        {/* <Route path="/react/emoji-pets" exact component={asyncHome} />
         */}
      </Switch>
    );

    if (this.props.isAuthenticated) {
      console.log("Is authed...");
      routes = (
        <Switch>
          <Route path="/react/emoji-pets/logout" component={Logout} />
          <Route path="/react/emoji-pets" exact component={asyncHome} />
          <Redirect to="/react/emoji-pets" />
        </Switch>
      );
    }
    console.log("is authenticated: ", this.props.isAuthenticated);
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
