import { AUTH, LOGOUT } from "../constants/actionTypes";

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
