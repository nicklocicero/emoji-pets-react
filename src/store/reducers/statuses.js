import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  statuses: [],
  loading: false,
  posted: false,
  userPet: ""
};

const postStatusInit = (state, action) => {
  return updateObject(state, { posted: false });
};

const postStatusStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const postStatusSuccess = (state, action) => {
  const newPost = updateObject(action.postData, {
    id: action.postId
  });
  return updateObject(state, {
    loading: false,
    posted: true,
    statuses: state.statuses.concat(newPost)
  });
};

const postStatusFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchUserStatusesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchUserStatusesSuccess = (state, action) => {
  return updateObject(state, {
    statuses: action.statuses,
    loading: false
  });
};

const fetchUserStatusesFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const deleteStatusStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const deleteStatusSuccess = (state, action) => {
  const prevStatuses = [...state.statuses];
  const updatedStatuses = prevStatuses.filter(el => {
    return el.id !== action.id;
  });
  return updateObject(state, {
    statuses: updatedStatuses,
    loading: false
  });
};

const deleteStatusFail = (state, action) => {
  return updateObject(state, { err: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_INIT:
      return postStatusInit(state, action);
    case actionTypes.POST_STATUS_START:
      return postStatusStart(state, action);
    case actionTypes.POST_STATUS_SUCCESS:
      return postStatusSuccess(state, action);
    case actionTypes.POST_STATUS_FAIL:
      return postStatusFail(state, action);
    case actionTypes.FETCH_USER_STATUSES_START:
      return fetchUserStatusesStart(state, action);
    case actionTypes.FETCH_USER_STATUSES_SUCCESS:
      return fetchUserStatusesSuccess(state, action);
    case actionTypes.FETCH_USER_STATUSES_FAIL:
      return fetchUserStatusesFail(state, action);
    case actionTypes.DELETE_STATUS_START:
      return deleteStatusStart(state, action);
    case actionTypes.DELETE_STATUS_SUCCESS:
      return deleteStatusSuccess(state, action);
    case actionTypes.DELETE_STATUS_FAIL:
      return deleteStatusFail(state, action);
    default:
      return state;
  }
};

export default reducer;
