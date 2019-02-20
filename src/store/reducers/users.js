import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = () => {
  return { users: null, loading: false, error: null };
};

const start = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const fail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const fetchUsersSuccess = (state, action) => {
  const ret = updateObject(state, {
    users: action.users,
    error: null,
    loading: false
  });
  return ret;
};

const patchUserSuccess = (state, action) => {
  return {
    ...state,
    users: {
      ...state.users,
      [action.userId]: {
        ...state.users[action.userId],
        ...action.data
      }
    },
    loading: false
  };
};

const putAddUserSuccess = (state, action) => {
  console.log("putAddUserSuccess() action: ", action)
  return {
    ...state,
    users: {
      ...state.users,
      [action.userId]: {
        ...state.users[action.userId],
        ...action.data
      }
    }
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_FAIL:
      return fail(state, action);
    case actionTypes.USER_START:
      return start(state, action);
    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUsersSuccess(state, action);
    case actionTypes.PATCH_USER_SUCCESS:
      return patchUserSuccess(state, action);
    case actionTypes.PUT_ADD_USER_SUCCESS:
      return putAddUserSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
