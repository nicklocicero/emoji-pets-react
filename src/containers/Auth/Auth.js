import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        forSignup: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        forSignup: false
      },
      confirmPassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Confirm Password"
        },
        value: "",
        validation: {
          equalTo: "password"
        },
        valid: false,
        touched: false,
        forSignup: true
      }
    },
    isSignup: false
  };

  componentDidMount() {
    if (this.props.authRedirectPath) {
      this.props.onSetAuthRedirectPath();
    }
  }

  showSignup = showSignup => {
    this.setState({ isSignup: showSignup });
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid:
          controlName === "confirmPassword"
            ? event.target.value === this.state.controls.password.value || !this.state.isSignup
            : checkValidity(
                event.target.value,
                this.state.controls[controlName].validation
              ),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      if (!this.state.isSignup && key === "confirmPassword") {
        continue;
      }
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        label={formElement.config.elementConfig.placeholder}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    
    let enableSubmit = true;
    for (let control in this.state.controls) {
      if (this.state.isSignup && this.state.controls[control].forSignup) {
        enableSubmit = this.state.controls[control].valid;
      } else if (!this.state.controls[control].forSignup) {
        enableSubmit = this.state.controls[control].valid;
      }
    }
    console.log("pre submission", enableSubmit);

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;

    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <div>
          <div>
            <button
              className={classes.TabButton}
              style={
                this.state.isSignup
                  ? { backgroundColor: "#ccc" }
                  : { borderBottom: "0px" }
              }
              onClick={() => this.showSignup(false)}
            >
              signin
            </button>
            <button
              className={classes.TabButton}
              style={
                !this.state.isSignup
                  ? { backgroundColor: "#ccc" }
                  : { borderBottom: "0px" }
              }
              onClick={() => this.showSignup(true)}
            >
              signup
            </button>
          </div>
          <div className={classes.FormDiv}>
            <form onSubmit={this.submitHandler}>
              {form}
              <Button btnType="Success" disabled={!enableSubmit}>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    auth: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
