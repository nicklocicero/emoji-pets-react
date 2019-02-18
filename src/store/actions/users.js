import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axios-pets";

export const fetchUsersSuccess = (data) => {
  console.log("dispatched fetchUsersSuccess users: ", data)
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: data
  };
};

export const fetchUsersFail = error => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error
  };
};

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START
  };
};

export const fetchUsers = (token) => {
  return dispatch => {
    dispatch(fetchUsersStart());
    axiosInstance
      .get("/users.json?auth=" + token)
      .then(response => {
        console.log("response from fetchUsers() ", response);
        dispatch(fetchUsersSuccess(response));
      })
      .catch(error => {
        dispatch(fetchUsersFail(error));
      });
  };
};

export const patchWallFail = error => {
  return {
    type: actionTypes.PATCH_WALL_FAIL,
    error: error
  };
};

export const patchWallSuccess = (wall, userId) => {
  return {
    type: actionTypes.PATCH_WALL_SUCCESS,
    wall: wall,
    userId: userId
  };
};

export const patchWall = (token, userId, wall) => {
  return dispatch => {
    axiosInstance
      .patch("/users/" + userId + "/userData.json?auth=" + token, {
        userId: userId,
        wall: wall
      })
      .then(response => {
        dispatch(patchWallSuccess(wall, userId));
      })
      .catch(error => {
        dispatch(patchWallFail(error));
      });
  };
};
