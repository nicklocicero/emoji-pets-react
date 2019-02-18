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

export const signupRequestSuccess = (userInformation) => {
  return {
    type: actionTypes.SIGNUP_REQUEST_SUCCESS,
    userInformation: userInformation
  };
};

export const signupRequestFail = error => {
  return {
    type: actionTypes.SIGNUP_REQUEST_FAIL,
    error: error
  };
};

export const getUserData = response => {
  return dispatch => {
    axiosInstance
      .get(
        "/users/" +
          response.data.localId +
          "/userData.json?auth=" +
          response.data.idToken
      )
      .then(response => {
        dispatch(
          signupRequestSuccess(response.data)
        );
      })
      .catch(error => {
        dispatch(signupRequestFail(error));
      });
  };
};

export const auth = (
  email,
  password,
  isSignup,
  userInformation
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
      if (userInformation.emojiIndex === null || userInformation.emojiPetName === "" || userInformation.emojiBio === "") {
        dispatch(authFail("Enter all information please."));
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
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
        userInformation["userId"] = response.data.localId
        if (isSignup) {
          axiosInstance
            .put(
              "/users/" +
                response.data.localId +
                "/userData.json?auth=" +
                response.data.idToken,
              userInformation
            )
            .then(response => {
              dispatch(
                signupRequestSuccess(userInformation)
              );
            })
            .catch(error => {
              dispatch(signupRequestFail(error));
            });
        } else {
          // console.log("Id: ", response.data.localId, " | Token: ", response.data.idToken);
          dispatch(getUserData(response));
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

export const setPet = (token, userId, emojiIndex, emojiPetName) => {
  return dispatch => {
    axiosInstance
      .patch("/users/" + userId + "/userData.json?auth=" + token, {
        emojiIndex: emojiIndex,
        emojiPetName: emojiPetName
      })
      .then(response => {
        dispatch(
          signupRequestSuccess(response.data)
        );
      })
      .catch(error => {
        dispatch(signupRequestFail(error));
      });
  };
};

export const wallUpdate = wall => {
  return {
    type: actionTypes.USER_WALL_UPDATE,
    wall: wall
  };
};

export const setWall = (token, userId, wall) => {
  return dispatch => {
    axiosInstance
      .patch("/users/" + userId + "/userData.json?auth=" + token, {
        userId: userId,
        wall: wall
      })
      .then(response => {
        dispatch(wallUpdate(wall));
      })
      .catch(error => {
        dispatch(signupRequestFail(error));
      });
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
