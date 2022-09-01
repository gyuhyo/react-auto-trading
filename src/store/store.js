import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { coinReducer } from "./reducers/coin";
import counterReducer from "./reducers/counter";
import { userReducer } from "./reducers/user";
import { tradingReducer } from "./reducers/trading";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import createMigrate from "redux-persist/lib/createMigrate";

const migrations = {
  0: (state) => {
    return {
      ...state,
    };
  },
  1: (state) => {
    return {
      ...state,
      trading: {
        onStart: false,
      },
    };
  },
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: true }),
};

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const rootReducer = combineReducers({
  counter: counterReducer,
  coin: coinReducer,
  user: userReducer,
  trading: tradingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
