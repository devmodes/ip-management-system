import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "@services/auth-service";
import { authReducer } from "@store/reducers/auth";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const authConfig = {
  key: "Auth",
  storage,
};

const reducers = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  [authApi.reducerPath]: authApi.reducer,
});

export default reducers;
