import UserActionTypes from "./user.type";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case UserActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
