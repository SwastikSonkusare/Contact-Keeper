import * as api from "../api";
import { GET_CONTACTS } from "../constants/actionTypes";

export const getContacts = () => async (dispatch) => {
  try {
    const { data } = await api.getContacts();

    dispatch({ type: GET_CONTACTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
