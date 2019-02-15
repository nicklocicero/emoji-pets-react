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

const fetchedStatusesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchedStatusesSuccess = (state, action) => {
  return updateObject(state, {
    statuses: action.statuses,
    loading: false
  });
};

const fetchedStatusesFail = (state, action) => {
  return updateObject(state, { loading: false });
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
    case actionTypes.FETCHED_STATUSES_START:
      return fetchedStatusesStart(state, action);
    case actionTypes.FETCHED_STATUSES_SUCCESS:
      return fetchedStatusesSuccess(state, action);
    case actionTypes.FETCHED_STATUSES_FAIL:
      return fetchedStatusesFail(state, action);
    default:
      return state;
  }
};

export default reducer;