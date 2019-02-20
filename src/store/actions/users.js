import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axios-pets";

export const start = () => {
  return {
    type: actionTypes.USER_START
  };
};

export const fail = error => {
  return {
    type: actionTypes.USER_FAIL,
    error: error
  };
};

export const fetchUsersSuccess = users => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users
  };
};

export const patchRequestSuccess = (data, userId) => {
  return {
    type: actionTypes.PATCH_USER_SUCCESS,
    userId: userId,
    data: data
  };
};

export const putAddUserSuccess = (data, userId) => {
  return {
    type: actionTypes.PUT_ADD_USER_SUCCESS,
    userId: userId,
    data: data
  };
};

export const fetchUsers = (token, userId) => {
  return dispatch => {
    dispatch(start());
    axiosInstance
      .get("/users.json?auth=" + token)
      .then(response => {
        dispatch(fetchUsersSuccess(response.data));
        console.log("got fetchUsers() response");
        if (!response.data.hasOwnProperty(userId)) {
          console.log("Calling addUser() with userId...", userId);
          dispatch(addUser(token, userId));
        }
      })
      .catch(error => {
        dispatch(fail(error));
      });
  };
};

export const patchUser = (token, userId, data) => {
  return dispatch => {
    dispatch(start());
    axiosInstance
      .patch("/users/" + userId + ".json?auth=" + token, data)
      .then(response => {
        dispatch(patchRequestSuccess(data, userId));
      })
      .catch(error => {
        dispatch(fail(error));
      });
  };
};

export const addUser = (token, userId) => {
  return dispatch => {
    dispatch(start);
    const newData = {
      emojiName: "[add a name]",
      emojiIndex: 0,
      emojiBio: "[write a bio]",
      wall: "Write on your wall..."
    };
    console.log("pre users put");
    axiosInstance
      .put("/users/" + userId + ".json?auth=" + token, newData)
      .then(response => {
        dispatch(putAddUserSuccess(newData, userId));
      })
      .catch(error => {
        dispatch(fail(error));
      });
  };
};
