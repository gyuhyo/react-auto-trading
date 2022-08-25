import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
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
  totalSummaryData: {
    data: [],
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

    GET_SUMMARY_DATA_SUCCESS: (state, { payload: data }) => {
      const idx = state.totalSummaryData.data.findIndex(
        (x) => x.code === data.code
      );

      if (idx >= 0) {
        state.totalSummaryData.data[idx].cnt += 1;
        state.totalSummaryData.data[idx].change = data.change;
        state.totalSummaryData.data[idx].change_price = data.change_price;
        state.totalSummaryData.data[idx].ask_cnt +=
          data.ask_bid === "ASK" ? 1 : 0;
        state.totalSummaryData.data[idx].bid_cnt +=
          data.ask_bid === "BID" ? 1 : 0;
        state.totalSummaryData.data[idx].total_price +=
          data.trade_price * data.trade_volume;
        state.totalSummaryData.data[idx].ask_price +=
          data.ask_bid === "ASK" ? data.trade_price * data.trade_volume : 0;
        state.totalSummaryData.data[idx].bid_price +=
          data.ask_bid === "BID" ? data.trade_price * data.trade_volume : 0;
      } else {
        state.totalSummaryData.data.push({
          code: data.code,
          cnt: 1,
          prev_closing_price: data.prev_closing_price,
          change: data.change,
          change_price: data.change_price,
          ask_cnt: data.ask_bid === "ASK" ? 1 : 0,
          bid_cnt: data.ask_bid === "BID" ? 1 : 0,
          total_price: data.trade_price * data.trade_volume,
          ask_price:
            data.ask_bid === "ASK" ? data.trade_price * data.trade_volume : 0,
          bid_price:
            data.ask_bid === "BID" ? data.trade_price * data.trade_volume : 0,
        });
      }
    },

    CLEAR_SUMMARY_DATA: (state) => {
      state.totalSummaryData.data = [];
    },
  },
});

export const {
  GET_COIN_LIST,
  GET_REALTIME_DATA_SUCCESS,
  GET_REALTIME_DATA_ERROR,
  GET_REALTIME_TRADE_DATA_SUCCESS,
  GET_REALTIME_TRADE_DATA_ERROR,
  GET_SUMMARY_DATA_SUCCESS,
  CLEAR_SUMMARY_DATA,
} = coinSlice.actions;
export const coinReducer = coinSlice.reducer;
