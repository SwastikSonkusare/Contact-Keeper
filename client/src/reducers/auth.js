import {
  AUTH,
  AUTH_REQUEST,
  LOGOUT,
  USER_LOGIN_FAIL,
  USER_REGISTER_FAIL,
} from "../constants/actionTypes";

const authReducer = (
  state = {
    authData: null,
    isLoggedIn: false,
    isLoggedOut: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { loading: true };

    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action?.data,
        isLoggedIn: true,
        isLoggedOut: false,
        loading: false,
      };

    case USER_REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        authData: null,
        isLoggedIn: false,
        isLoggedOut: true,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
