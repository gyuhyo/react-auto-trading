import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { coinReducer } from "./reducers/coin";
import counterReducer from "./reducers/counter";
import { userReducer } from "./reducers/user";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: {
    counter: counterReducer,
    coin: coinReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
