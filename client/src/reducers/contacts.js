import { GET_CONTACTS } from "../constants/actionTypes";

const contactReducer = (state = { contacts: [], success: false }, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        success: true,
      };

    default:
      return state;
  }
};

export default contactReducer;
