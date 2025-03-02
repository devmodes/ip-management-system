import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@lib/types/user";

type State = {
  user: User | null;
  token: string | null;
};

const initialState: State = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state: State, { payload }: PayloadAction<State>) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout: (state: State) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
