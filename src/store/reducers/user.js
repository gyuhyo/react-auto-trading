import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    apiKey: null,
    secret: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.auth = action.payload.auth;
      localStorage.removeItem("auth");
      localStorage.setItem("auth", JSON.stringify(action.payload.auth));
    },
  },
});

export const { LOGIN } = userSlice.actions;
export const userReducer = userSlice.reducer;
