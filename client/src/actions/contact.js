import * as api from "../api";
import {
  CREATE_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
  GET_CONTACTS_BY_SEARCH,
  UPDATE_CONTACT,
} from "../constants/actionTypes";

export const getContacts = () => async (dispatch) => {
  try {
    const { data } = await api.getContacts();

    dispatch({ type: GET_CONTACTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getContactsBySearch = (search) => async (dispatch) => {
  try {
    const { data } = await api.getContactsByQuery(search);

    dispatch({ type: GET_CONTACTS_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createContact = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createContact(formData);

    dispatch({ type: CREATE_CONTACT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateContact = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.updateContact(id, formData);

    dispatch({ type: UPDATE_CONTACT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deleteContact = (id) => async (dispatch) => {
  try {
    await api.deleteContact(id);

    dispatch({ type: DELETE_CONTACT, payload: id });
  } catch (error) {
    console.log(error);
  }
};
