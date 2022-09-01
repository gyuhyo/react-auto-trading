import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onStart: false,
};

const tradingSlice = createSlice({
  name: "trading",
  initialState,
  reducers: {
    CHANGE_ON_START: (state, { payload: data }) => {
      state.onStart = data;
    },
  },
});

export const { CHANGE_ON_START } = tradingSlice.actions;
export const tradingReducer = tradingSlice.reducer;
