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
    data: [],
    error: null,
  },
  realtimeTradeData: {
    isLoad: false,
    data: [],
    error: null,
  },
  totalSummaryData: {
    data: [],
  },
  realtimeOrderbookData: {
    data: [],
  },
  autoTradeSummaryData: {
    data: [],
  },
  autoTradeData: {
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
          data.forEach((elem) => {
            const jsonData = JSON.parse(elem);
            const idx = state.realtimeData.data?.findIndex(
              (x) => x.code === jsonData.code
            );
            if (idx > -1) {
              state.realtimeData.data[idx] = jsonData;
            } else {
              state.realtimeData.data?.push(jsonData);
            }
          });

          return state.realtimeData.data;
        })(),
        error: null,
      };
    },

    GET_REALTIME_DATA_ERROR: (state, { payload: data }) => {
      state.realtimeData = { isLoad: false, data: null, error: data };
    },

    GET_REALTIME_TRADE_DATA_SUCCESS: (state, { payload: datas }) => {
      datas.forEach((elem) => {
        const data = JSON.parse(elem);
        state.realtimeTradeData.data = data;

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
          state.totalSummaryData.data[idx].prev_cnt =
            state.totalSummaryData.data[idx].cnt;
        } else {
          state.totalSummaryData.data.push({
            code: data.code,
            korean_name: state.market.data.filter(
              (list) => list.market === data.code
            )[0].korean_name,
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
            prev_cnt: 0,
          });
        }
      });

      datas.forEach((elem) => {
        const data = JSON.parse(elem);

        const idx = state.autoTradeSummaryData.data.findIndex(
          (x) => x.code === data.code
        );

        if (idx >= 0) {
          state.autoTradeSummaryData.data[idx].cnt += 1;
          state.autoTradeSummaryData.data[idx].change = data.change;
          state.autoTradeSummaryData.data[idx].change_price = data.change_price;
          state.autoTradeSummaryData.data[idx].ask_cnt +=
            data.ask_bid === "ASK" ? 1 : 0;
          state.autoTradeSummaryData.data[idx].bid_cnt +=
            data.ask_bid === "BID" ? 1 : 0;
          state.autoTradeSummaryData.data[idx].total_price +=
            data.trade_price * data.trade_volume;
          state.autoTradeSummaryData.data[idx].ask_price +=
            data.ask_bid === "ASK" ? data.trade_price * data.trade_volume : 0;
          state.autoTradeSummaryData.data[idx].bid_price +=
            data.ask_bid === "BID" ? data.trade_price * data.trade_volume : 0;
          state.autoTradeSummaryData.data[idx].prev_cnt =
            state.autoTradeSummaryData.data[idx].cnt;
        } else {
          state.autoTradeSummaryData.data.push({
            code: data.code,
            korean_name: state.market.data.filter(
              (list) => list.market === data.code
            )[0].korean_name,
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
            prev_cnt: 0,
          });
        }
      });

      datas.forEach((elem) => {
        const data = JSON.parse(elem);

        const idx = state.autoTradeData.data.findIndex(
          (x) => x.code === data.code
        );

        if (idx >= 0) {
          const subIdx = state.autoTradeData.data[idx].realData.findIndex(
            (x) => x.code === data.code
          );
          if (subIdx >= 0) {
            state.autoTradeData.data[idx].realData[subIdx].cnt += 1;
            state.autoTradeData.data[idx].realData[subIdx].change = data.change;
            state.autoTradeData.data[idx].realData[subIdx].change_price =
              data.change_price;
            state.autoTradeData.data[idx].realData[subIdx].ask_cnt +=
              data.ask_bid === "ASK" ? 1 : 0;
            state.autoTradeData.data[idx].realData[subIdx].bid_cnt +=
              data.ask_bid === "BID" ? 1 : 0;
            state.autoTradeData.data[idx].realData[subIdx].total_price +=
              data.trade_price * data.trade_volume;
            state.autoTradeData.data[idx].realData[subIdx].ask_price +=
              data.ask_bid === "ASK" ? data.trade_price * data.trade_volume : 0;
            state.autoTradeData.data[idx].realData[subIdx].bid_price +=
              data.ask_bid === "BID" ? data.trade_price * data.trade_volume : 0;
            state.autoTradeData.data[idx].realData[subIdx].prev_cnt =
              state.autoTradeData.data[idx].realData[subIdx].cnt;
          } else {
            state.autoTradeData.data[idx].realData.push({
              code: data.code,
              korean_name: state.market.data.filter(
                (list) => list.market === data.code
              )[0].korean_name,
              cnt: 1,
              prev_closing_price: data.prev_closing_price,
              change: data.change,
              change_price: data.change_price,
              ask_cnt: data.ask_bid === "ASK" ? 1 : 0,
              bid_cnt: data.ask_bid === "BID" ? 1 : 0,
              total_price: data.trade_price * data.trade_volume,
              ask_price:
                data.ask_bid === "ASK"
                  ? data.trade_price * data.trade_volume
                  : 0,
              bid_price:
                data.ask_bid === "BID"
                  ? data.trade_price * data.trade_volume
                  : 0,
              prev_cnt: 0,
            });
          }
        }
      });
    },

    GET_REALTIME_TRADE_DATA_ERROR: (state, { payload: data }) => {
      state.realtimeTradeData = { isLoad: false, data: null, error: data };
    },

    CLEAR_SUMMARY_DATA: (state) => {
      state.totalSummaryData.data = [];
    },

    CLEAR_AUTO_TRADE_SUMMARY_DATA: (state) => {
      state.autoTradeSummaryData.data = [];
    },

    GET_REALTIME_ORDERBOOK_SUCCESS: (state, { payload: datas }) => {
      datas.forEach((elem) => {
        const jsonData = JSON.parse(elem);
        const idx = state.realtimeOrderbookData.data?.findIndex(
          (x) => x.code === jsonData.code
        );
        if (idx > -1) {
          state.realtimeOrderbookData.data[idx] = jsonData;
        } else {
          state.realtimeOrderbookData.data?.push(jsonData);
        }
      });
    },

    ADD_AUTO_TRADE_DATA: (state, { payload: datas }) => {
      state.autoTradeData.data.push(datas);
    },

    CLEAR_AUTO_TRADE_DATA: (state) => {
      state.autoTradeData.data = [];
    },

    CLEAR_AUTO_TRADE_REAL_DATA: (state) => {
      state.autoTradeData.data.forEach((data) => {
        data.realData = [];
      });
    },

    REMOVE_AUTO_TRADE_DATA: (state, { payload: data }) => {
      state.autoTradeData.data = state.autoTradeData.data.filter(
        (x) => x.code !== data.code
      );
    },
  },
});

export const {
  GET_COIN_LIST,
  GET_REALTIME_DATA_SUCCESS,
  GET_REALTIME_DATA_ERROR,
  GET_REALTIME_TRADE_DATA_SUCCESS,
  GET_REALTIME_TRADE_DATA_ERROR,
  CLEAR_SUMMARY_DATA,
  GET_REALTIME_ORDERBOOK_SUCCESS,
  CLEAR_AUTO_TRADE_SUMMARY_DATA,
  ADD_AUTO_TRADE_DATA,
  CLEAR_AUTO_TRADE_DATA,
  CLEAR_AUTO_TRADE_REAL_DATA,
  REMOVE_AUTO_TRADE_DATA,
} = coinSlice.actions;
export const coinReducer = coinSlice.reducer;
