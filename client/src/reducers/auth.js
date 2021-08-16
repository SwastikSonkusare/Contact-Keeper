import { AUTH } from "../constants/actionTypes";

const authReducer = (state = { authData: null, isLoggedIn: false }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action?.payload?.data })
      );
      return {
        ...state,
        authData: action?.payload?.data,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default authReducer;
