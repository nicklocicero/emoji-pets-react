import axios from "axios";
import { config } from "../../config";
import axiosInstance from "../../axios-pets";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationDate => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate * 1000);
  };
};

export const signupRequestSuccess = (id, userInformation) => {
  return {
    type: actionTypes.SIGNUP_REQUEST_SUCCESS,
    emojiIndex: userInformation.emojiIndex,
    emojiPetName: userInformation.emojiPetName
  };
};

export const signupRequestFail = error => {
  return {
    type: actionTypes.SIGNUP_REQUEST_FAIL,
    error: error
  };
};

export const auth = (
  email,
  password,
  isSignup,
  emojiIndex = null,
  emojiPetName = null
) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      config.apiKey;

    if (isSignup) {
      if (emojiIndex === null || emojiPetName === "") {
        dispatch(authFail("Enter all information"));
        return;
      }
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
        config.apiKey;
    }
    axios
      .post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        console.log("first responses: ", response);
        const userId = response.data.localId;
        const idToken = response.data.idToken;
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
        if (isSignup) {
          const userInformation = {
            userId: response.data.localId,
            emojiIndex: emojiIndex,
            emojiPetName: emojiPetName
          };
          axiosInstance
            .post("/users.json?auth=" + response.data.idToken, userInformation)
            .then(response => {
              dispatch(signupRequestSuccess(response.data.name, userInformation));
            })
            .catch(error => {
              dispatch(signupRequestFail(error));
            });
        } else {
          axiosInstance
            .get("/users.json?auth=" + idToken + '&orderBy="userId"&equalTo="' + userId + '"')
            .then(response => {
              console.log("This is the respsone from login: ", response.data);
              for (let key in response.data) {
                dispatch(signupRequestSuccess(response.data[key.userId], response.data[key]));
              }
            })
            .catch(error => {
              dispatch(signupRequestFail(error));
            });
        }
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
