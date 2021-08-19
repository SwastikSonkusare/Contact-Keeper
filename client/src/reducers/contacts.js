import {
  CREATE_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
  GET_CONTACTS_BY_SEARCH,
  UPDATE_CONTACT,
} from "../constants/actionTypes";

const contactReducer = (
  state = {
    contacts: [],
    success: false,
    isContactCreated: false,
    isContactUpdated: false,
    isContactDeleted: false,
  },
  action
) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        success: true,
        isContactCreated: false,
        isContactUpdated: false,
        isContactDeleted: false,
      };
    case GET_CONTACTS_BY_SEARCH:
      return {
        ...state,
        contacts: action.payload,
        success: true,
        isContactCreated: false,
        isContactUpdated: false,
        isContactDeleted: false,
      };

    case CREATE_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        isContactCreated: true,
        isContactUpdated: false,
        isContactDeleted: false,
      };

    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
        isContactCreated: false,
        isContactUpdated: true,
        isContactDeleted: false,
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((c) => c._id !== action.payload),
        isContactCreated: false,
        isContactUpdated: false,
        isContactDeleted: true,
      };

    default:
      return state;
  }
};

export default contactReducer;
