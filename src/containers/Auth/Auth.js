import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";
import EmojiPicker from "../../components/Signup/EmojiPicker/EmojiPicker";
import Signup from "../../components/Signup/Signup";

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
        touched: false
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
        touched: false
      }
    },
    isSignup: false,
    emojiIndex: null,
    emojiPetName: ""
  };

  componentWillMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath) {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
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
      this.state.isSignup,
      this.state.emojiIndex,
      this.state.emojiPetName
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  setEmojiHandler = index => {
    this.setState({ emojiIndex: index });
  };

  setEmojiNameHandler = event => {
    this.setState({ emojiPetName: event.target.value });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
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

    const signup = (
      <Signup
        setEmojiHandler={this.setEmojiHandler}
        setEmojiNameHandler={event => this.setEmojiNameHandler(event)}
        emojiIndex={this.state.emojiIndex}
        emojiPetName={this.state.emojiPetName}
      />
    );

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          {this.state.isSignup
            ? "SWITCH TO SIGNIN"
            : "ARE YOU NEW? CLICK HERE TO SIGNUP!"}
        </Button>
        <form onSubmit={this.submitHandler}>
          {this.state.isSignup ? signup : null}
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup, emojiIndex, emojiPetName) =>
      dispatch(actions.auth(email, password, isSignup, emojiIndex, emojiPetName)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);