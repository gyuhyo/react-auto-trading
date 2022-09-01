import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_COIN_LIST,
  GET_REALTIME_DATA_ERROR,
  GET_REALTIME_DATA_SUCCESS,
  GET_REALTIME_ORDERBOOK_SUCCESS,
  GET_REALTIME_TRADE_DATA_ERROR,
  GET_REALTIME_TRADE_DATA_SUCCESS,
} from "../../store/reducers/coin";
import { SET_MY_WALLETS_PRICE } from "../../store/reducers/trading";

export default function useSocket() {
  const dispatch = useDispatch();
  const markets = useSelector((state) => state.coin.market.data);

  useEffect(() => {
    async function GET_MARKETS_LIST() {
      const response = await axios.get("https://api.upbit.com/v1/market/all");

      dispatch(GET_COIN_LIST(response.data));

      const marketList = response.data
        ?.filter((list) => list.market.includes("KRW-"))
        .map((list) => list.market);

      const data = new Set();
      const tradeData = new Set();
      const orderData = new Set();

      const flush = () => {
        dispatch(GET_REALTIME_DATA_SUCCESS(Array.from(data)));
        dispatch(GET_REALTIME_TRADE_DATA_SUCCESS(Array.from(tradeData)));
        dispatch(SET_MY_WALLETS_PRICE(Array.from(data)));

        data.clear();
        tradeData.clear();
      };

      const orderBookFlush = () => {
        dispatch(GET_REALTIME_ORDERBOOK_SUCCESS(Array.from(orderData)));

        orderData.clear();
      };

      let timer = setInterval(flush, 500);
      let orderTimer = setInterval(orderBookFlush, 1000);

      const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
      ws.onopen = () => {
        // 웹소켓 연결
        ws.send(
          `[{"ticket":"123123"},{"type":"ticker","codes": ${JSON.stringify(
            marketList
          )}}]`
        );
      };

      ws.onmessage = async (e) => {
        const { data: tickerData } = e;
        const text = await new Response(tickerData).text();

        data.add(text);
      };

      ws.onerror = (e) => {
        console.error(e);
      };

      const trade = new WebSocket("wss://api.upbit.com/websocket/v1");
      trade.onopen = () => {
        // 웹소켓 연결
        trade.send(
          `[{"ticket":"htg3wgr"},{"type":"trade","codes": ${JSON.stringify(
            marketList
          )}}]`
        );
      };

      trade.onmessage = async (e) => {
        const { data: tickerData } = e;
        const text = await new Response(tickerData).text();

        tradeData.add(text);
      };

      trade.onerror = (e) => {
        console.error(e);
      };

      const orderbook = new WebSocket("wss://api.upbit.com/websocket/v1");
      orderbook.onopen = () => {
        // 웹소켓 연결
        orderbook.send(
          `[{"ticket":"qwdfqwfd"},{"type":"orderbook","codes": ${JSON.stringify(
            marketList
          )}}]`
        );
      };

      orderbook.onmessage = async (e) => {
        const { data: orderDatas } = e;
        const text = await new Response(orderDatas).text();

        orderData.add(text);
      };

      orderbook.onerror = (e) => {
        console.error(e);
      };

      return () => {
        clearInterval(timer);
        clearInterval(orderTimer);
        ws.close();
        trade.close();
        orderbook.close();
        flush();
        orderBookFlush();
      };
    }

    GET_MARKETS_LIST();
  }, []);
}
