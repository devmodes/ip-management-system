import { combineReducers, configureStore } from "@reduxjs/toolkit";
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

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
