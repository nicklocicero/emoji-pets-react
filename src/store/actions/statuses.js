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

export const fetchUserStatusesFail = error => {
  return {
    type: actionTypes.FETCH_USER_STATUSES_FAIL,
    error: error
  };
};

export const fetchUserStatusesSuccess = statuses => {
  return {
    type: actionTypes.FETCH_USER_STATUSES_SUCCESS,
    statuses: statuses
  };
};

export const fetchUserStatusesStart = () => {
  return {
    type: actionTypes.FETCH_USER_STATUSES_START
  };
};

export const fetchUserStatuses = (token, userId = null) => {
  return dispatch => {
    dispatch(fetchUserStatusesStart());
    let queryParams = "?auth=" + token;
    if (userId) {
      queryParams =
        "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    }
    axios
      .get("/statuses.json" + queryParams)
      .then(res => {
        const fetchUserStatuses = [];
        for (let key in res.data) {
          fetchUserStatuses.push({ ...res.data[key], id: key });
        }
        dispatch(fetchUserStatusesSuccess(fetchUserStatuses));
      })
      .catch(err => {
        dispatch(fetchUserStatusesFail(err));
      });
  };
};

export const deleteStatus = (token, id) => {
  return dispatch => {
    dispatch(deleteStatusStart());
    axios
      .delete("/statuses/" + id + ".json?auth=" + token)
      .then(res => {
        console.log(res);
        dispatch(deleteStatusSuccess(id));
      })
      .catch(err => {
        dispatch(deleteStatusFail(err));
      });
  }
}

export const deleteStatusStart = () => {
  return {
    type: actionTypes.DELETE_STATUS_START
  };
};

export const deleteStatusSuccess = id => {
  return {
    type: actionTypes.DELETE_STATUS_SUCCESS,
    id: id
  };
}

export const deleteStatusFail = error => {
  return {
    type: actionTypes.DELETE_STATUS_FAIL,
    error: error
  };
};