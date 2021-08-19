import {
  AUTH,
  LOGOUT,
  USER_LOGIN_FAIL,
  USER_REGISTER_FAIL,
} from "../constants/actionTypes";

const authReducer = (
  state = { authData: null, isLoggedIn: false, isLoggedOut: false },
  action
) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action?.data,
        isLoggedIn: true,
        isLoggedOut: false,
      };

    case USER_REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        authData: null,
        isLoggedIn: false,
        isLoggedOut: true,
      };

    default:
      return state;
  }
};

export default authReducer;
