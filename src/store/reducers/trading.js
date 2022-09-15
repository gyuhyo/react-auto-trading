import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onStart: false,
  setting: {
    onePrice: 0,
    rsiBid: 30,
    rsiAsk: 70,
    autoAskType: "per",
    askUpPer: 3,
    askDownPer: 100,
    searchTime: "5",
    coinTop: 20,
  },
  mywallet: [],
};

const tradingSlice = createSlice({
  name: "trading",
  initialState,
  reducers: {
    CHANGE_ON_START: (state, { payload: data }) => {
      state.onStart = data;
    },
    CHANGE_TRADE_SETTING: (state, { payload: data }) => {
      state.setting = data;
    },
    CLEAR_MY_WALLETS: (state) => {
      state.mywallet = [];
    },
    SET_MY_WALLETS: (state, { payload: data }) => {
      if (state.mywallet.filter((x) => x.code === data.code).length <= 0) {
        state.mywallet.push(data);
      }
    },
    SET_MY_WALLETS_PRICE: (state, { payload: data }) => {
      data.forEach((d) => {
        const j = JSON.parse(d);
        const index = state.mywallet.findIndex((x) => x.code === j.code);

        if (index > -1) {
          state.mywallet[index].now_price = j.trade_price;
        }
      });
    },
  },
});

export const {
  CHANGE_ON_START,
  CHANGE_TRADE_SETTING,
  CLEAR_MY_WALLETS,
  SET_MY_WALLETS,
  SET_MY_WALLETS_PRICE,
} = tradingSlice.actions;
export const tradingReducer = tradingSlice.reducer;
