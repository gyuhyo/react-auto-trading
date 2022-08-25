import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GET_COIN_LIST,
  GET_REALTIME_DATA_ERROR,
  GET_REALTIME_DATA_SUCCESS,
  GET_REALTIME_TRADE_DATA_ERROR,
  GET_REALTIME_TRADE_DATA_SUCCESS,
  GET_SUMMARY_DATA_SUCCESS,
} from "../../store/reducers/coin";

export default function useCoinList() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function handleGetCoinList() {
      const response = await axios.get("https://api.upbit.com/v1/market/all");

      dispatch(GET_COIN_LIST(response.data));

      const marketList = response.data
        .filter((list) => list.market.includes("KRW-"))
        .map((list) => list.market);

      const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
      ws.onopen = () => {
        // 웹소켓 연결
        ws.send(
          `[{"ticket":"test"},{"type":"ticker","codes": ${JSON.stringify(
            marketList
          )}}]`
        );
      };
      ws.onmessage = async (e) => {
        // 실시간 데이터 수신
        const { data } = e;
        const text = await new Response(data).text();
        // console.log(JSON.parse(text));
        dispatch(GET_REALTIME_DATA_SUCCESS(JSON.parse(text)));
      };
      ws.onerror = (e) => {
        // 실시간 데이터 수신 에러
        dispatch(GET_REALTIME_DATA_ERROR(e));
      };

      const trade = new WebSocket("wss://api.upbit.com/websocket/v1");
      trade.onopen = () => {
        // 웹소켓 연결
        trade.send(
          `[{"ticket":"test2"},{"type":"trade","codes": ${JSON.stringify(
            marketList
          )}}]`
        );
      };
      trade.onmessage = async (e) => {
        // 실시간 데이터 수신
        const { data } = e;
        const text = await new Response(data).text();
        // console.log(JSON.parse(text));
        dispatch(GET_REALTIME_TRADE_DATA_SUCCESS(JSON.parse(text)));
        dispatch(GET_SUMMARY_DATA_SUCCESS(JSON.parse(text)));
      };
      trade.onerror = (e) => {
        // 실시간 데이터 수신 에러
        dispatch(GET_REALTIME_TRADE_DATA_ERROR(e));
      };
    }
    handleGetCoinList();
  }, []);
}
