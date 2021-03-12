import ChatActionTypes from "./chat.type";

const initialState = {
  username: "",
  room: "",
  message: "",
  messages: [],
  usersList: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ChatActionTypes.ADD_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case ChatActionTypes.ADD_ROOM:
      return {
        ...state,
        room: action.payload,
      };
    case ChatActionTypes.ADD_CURRENT_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case ChatActionTypes.ADD_TO_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case ChatActionTypes.CLEAR_STATE:
      return {
        username: "",
        room: "",
        message: "",
        messages: [],
      };
    case ChatActionTypes.ADD_IN_USERS:
      return {
        ...state,
        usersList: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
