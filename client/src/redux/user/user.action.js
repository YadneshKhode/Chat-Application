import UserActionTypes from "./user.type";

export const login = (user) => ({
  type: UserActionTypes.LOGIN,
  payload: user,
});
export const logout = () => ({
  type: UserActionTypes.LOGOUT,
});
