import * as actionTypes from "./actionTypes";
import axios from "../../axios-pets";

export const postStatusSuccess = (id, postData) => {
  return {
    type: actionTypes.POST_STATUS_SUCCESS,
    postId: id,
    postData: postData
  };
};
export const postStatusFail = error => {
  return {
    type: actionTypes.POST_STATUS_FAIL,
    error: error
  };
};

export const postStatusStart = () => {
  return {
    type: actionTypes.POST_STATUS_START
  };
};

export const postStatus = (postData, token) => {
  return dispatch => {
    dispatch(postStatusStart());
    axios
      .post("/statuses.json?auth=" + token, postData)
      .then(response => {
        dispatch(postStatusSuccess(response.data.name, postData));
      })
      .catch(error => {
        dispatch(postStatusFail(error));
      });
  };
};

export const postInit = () => {
  return {
    type: actionTypes.POST_INIT
  };
};

export const fetchedStatusesFail = error => {
  return {
    type: actionTypes.FETCHED_STATUSES_FAIL,
    error: error
  };
};

export const fetchedStatusesSuccess = statuses => {
  return {
    type: actionTypes.FETCHED_STATUSES_SUCCESS,
    statuses: statuses
  };
};

export const fetchedStatusesStart = () => {
  return {
    type: actionTypes.FETCHED_STATUSES_START
  };
};

export const fetchedStatuses = (token, userId = null) => {
  return dispatch => {
    dispatch(fetchedStatusesStart());
    let queryParams = "?auth=" + token;
    if (userId) {
      queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    }
    axios
      .get("/statuses.json" + queryParams)
      .then(res => {
        const  fetchedStatuses = [];
        for (let key in res.data) {
           fetchedStatuses.push({ ...res.data[key], id: key });
        }
        dispatch(fetchedStatusesSuccess( fetchedStatuses));
      })
      .catch(err => {
        dispatch(fetchedStatusesFail(err));
      });
  };
};
