import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import chatReducer from "./chats/chat.reducer";
import userReducer from "./user/user.reducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["chat,user"],
};

const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
