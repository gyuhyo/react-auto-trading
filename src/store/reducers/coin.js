import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  market: {
    isLoad: false,
    data: null,
    error: null,
  },
  realtimeData: {
    isLoad: false,
    data: null,
    error: null,
  },
  realtimeTradeData: {
    isLoad: false,
    data: null,
    error: null,
  },
};

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    GET_COIN_LIST: (state, action) => {
      state.market = { isLoad: true, data: action.payload, error: null };
    },

    GET_REALTIME_DATA_SUCCESS: (state, { payload: data }) => {
      state.realtimeData = {
        isLoad: false,
        data: (function () {
          // console.log(realtimeData.data)
          if (state.realtimeData.data) {
            if (
              !state.realtimeData.data
                .map((list) => list.code)
                .includes(data.code)
            ) {
              return state.realtimeData.data.concat(data);
            } else {
              return state.realtimeData.data
                .filter((list) => list.code !== data.code)
                .concat(data);
            }
          } else {
            const tempArr = [];
            state.realtimeData.data = tempArr.concat(data);
            return state.realtimeData.data;
          }
        })(),
        error: null,
      };
    },

    GET_REALTIME_DATA_ERROR: (state, { payload: data }) => {
      state.realtimeData = { isLoad: false, data: null, error: data };
    },

    GET_REALTIME_TRADE_DATA_SUCCESS: (state, { payload: data }) => {
      state.realtimeTradeData.data = data;
    },

    GET_REALTIME_TRADE_DATA_ERROR: (state, { payload: data }) => {
      state.realtimeTradeData = { isLoad: false, data: null, error: data };
    },
  },
});

export const {
  GET_COIN_LIST,
  GET_REALTIME_DATA_SUCCESS,
  GET_REALTIME_DATA_ERROR,
  GET_REALTIME_TRADE_DATA_SUCCESS,
  GET_REALTIME_TRADE_DATA_ERROR,
} = coinSlice.actions;
export const coinReducer = coinSlice.reducer;
