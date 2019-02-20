import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  statuses: null,
  loading: false
};

const start = (state, action) => {
  return updateObject(state, { loading: true });
};

const fail = (state, action) => {
  return updateObject(state, { loading: false });
};

const postStatusSuccess = (state, action) => {
  console.log("status reducer: ", action.newStatus);
  return updateObject(state, {
    loading: false,
    statuses: Object.assign(state.statuses, action.newStatus)
  });
};

const fetchStatusesSuccess = (state, action) => {
  return updateObject(state, {
    statuses: action.statuses,
    loading: false
  });
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STATUS_START:
      return start(state, action);
    case actionTypes.STATUS_FAIL:
      return fail(state, action);
    case actionTypes.POST_STATUS_SUCCESS:
      return postStatusSuccess(state, action);
    case actionTypes.FETCH_USER_STATUSES_SUCCESS:
      return fetchStatusesSuccess(state, action);
    case actionTypes.DELETE_STATUS_SUCCESS:
      return deleteStatusSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
