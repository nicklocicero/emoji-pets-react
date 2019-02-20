import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  walls: {}
};

const wallRequestSuccess = (state, action) => {
  return updateObject(state, {
    wall: action.wall
  });
};

const wallRequestFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.SIGNUP_REQUEST_SUCCESS:
      return signupRequestSuccess(state, action);
    case actionTypes.SIGNUP_REQUEST_FAIL:
      return signupRequestFail(state, action);
    case actionTypes.WALL_REQUEST_SUCCESS:
      return wallRequestSuccess(state, action);
    case actionTypes.WALL_REQUEST_FAIL:
      return wallRequestFail(state, action);
    case actionTypes.USER_WALL_UPDATE:
      return setWall(state, action);
    default:
      return state;
  }
};

export default reducer;
