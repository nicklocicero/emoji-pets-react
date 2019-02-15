import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/react/emoji-pets",
  emojiIndex: null,
  emojiPetName: ""
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  const ret = updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
  });
  return ret;
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const signupRequestSuccess = (state, action) => {
  return updateObject(state, {
    emojiIndex: action.emojiIndex,
    emojiPetName: action.emojiPetName
  });
};

const signupRequestFail = (state, action) => {
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
    default:
      return state;
  }
};

export default reducer;
