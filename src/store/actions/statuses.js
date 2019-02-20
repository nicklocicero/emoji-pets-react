import * as actionTypes from "./actionTypes";
import axios from "../../axios-pets";


export const fail = error => {
  return {
    type: actionTypes.STATUS_FAIL,
    error: error
  };
};

export const start = () => {
  return {
    type: actionTypes.STATUS_START
  };
};

export const postStatusSuccess = (id, newStatus) => {
  return {
    type: actionTypes.POST_STATUS_SUCCESS,
    newStatus: {[id]: newStatus}
  };
};

export const deleteStatusSuccess = id => {
  return {
    type: actionTypes.DELETE_STATUS_SUCCESS,
    id: id
  };
}

export const fetchStatusesSuccess = statuses => {
  return {
    type: actionTypes.FETCH_USER_STATUSES_SUCCESS,
    statuses: statuses
  };
};

export const postStatus = (token, newStatus) => {
  return dispatch => {
    dispatch(start());
    axios
      .post("/statuses.json?auth=" + token, newStatus)
      .then(response => {
        dispatch(postStatusSuccess(response.data.name, newStatus));
      })
      .catch(error => {
        dispatch(fail(error));
      });
  };
};

export const deleteStatus = (token, id) => {
  return dispatch => {
    dispatch(start());
    axios
      .delete("/statuses/" + id + ".json?auth=" + token)
      .then(res => {
        dispatch(deleteStatusSuccess(id));
      })
      .catch(err => {
        dispatch(fail(err));
      });
  }
}

export const fetchStatuses = (token) => {
  return dispatch => {
    dispatch(start());
    let queryParams = "?auth=" + token;
    axios
      .get("/statuses.json" + queryParams)
      .then(res => {
        dispatch(fetchStatusesSuccess(res.data));
      })
      .catch(err => {
        dispatch(fail(err));
      });
  };
};