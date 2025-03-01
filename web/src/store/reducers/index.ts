import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "@store/reducers/auth";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { authApi } from "@store/api/auth-api";

const authConfig = {
  key: "Auth",
  storage,
};

const reducers = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  [authApi.reducerPath]: authApi.reducer,
});

export default reducers;
