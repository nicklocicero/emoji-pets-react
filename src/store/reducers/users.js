import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = () => {
  return { users: {}, loading: false, error: null };
};

const fetchUsersStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const fetchUsersSuccess = (state, action) => {
  console.log(
    "fetchUsersSuccess in reducer, action.users: ",
    action.users.data
  );
  const ret = updateObject(state, {
    users: action.users.data,
    error: null,
    loading: false
  });
  return ret;
};

const fetchUsersFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const patchWallSuccess = (state, action) => {
  return {
    ...state,
    users: {
      ...state.users,
      [action.userId]: {
        ...state.users[action.userId],
        userData: {
          ...state.users[action.userId].userData,
          wall: action.wall
        }
      }
    }
  };
};

const patchWallFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START:
      return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL:
      return fetchUsersFail(state, action);
    case actionTypes.PATCH_WALL_SUCCESS:
      return patchWallSuccess(state, action);
    case actionTypes.PATCH_WALL_FAIL:
      return patchWallFail(state, action);
    default:
      return state;
  }
};

export default reducer;
