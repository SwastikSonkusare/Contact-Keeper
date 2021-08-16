import * as api from "../api";

import { AUTH } from "../constants/actionTypes";

export const signIn = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    console.log(error);
  }
};
