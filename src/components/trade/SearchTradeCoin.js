import { Collapse, LinearProgress, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  ADD_AUTO_TRADE_DATA,
  CLEAR_AUTO_TRADE_DATA,
  CLEAR_AUTO_TRADE_REAL_DATA,
  CLEAR_AUTO_TRADE_SUMMARY_DATA,
  REMOVE_AUTO_TRADE_DATA,
} from "../../store/reducers/coin";
import useInterval from "../../utils/hooks/useInterval";
import { cusAxios, getToken } from "../../utils/hooks/common/cusAxios";
import axios from "axios";
import request from "request";

function SearchTradeCoin() {
  const [searchOpened, setSearchOpened] = useState(false);
  const [copyTradeCoin, setCopyTradeCoin] = useState([]);
  const dispatch = useDispatch();
  const tradeCoin = useSelector(
    (state) => state.coin.autoTradeSummaryData.data
  );
  const realtimeData = useSelector((state) => state.coin.realtimeData.data);
  const autoTradeData = useSelector((state) => state.coin.autoTradeData.data);

  useEffect(() => {
    console.log(1);
    dispatch(CLEAR_AUTO_TRADE_DATA());
  }, []);

  useEffect(() => {
    const ask_coin = [...autoTradeData].filter(
      (x) =>
        (x.realData[0]?.cnt > 100 &&
          x.realData[0]?.ask_price / x.realData[0]?.total_price) *
          100 >
        70
    );

    ask_coin.forEach((x) => {
      const coins_now_trade = [...realtimeData].filter(
        (coin) => coin.code === x.code
      );

      const key = {
        apiKey: "VnoQQa49yi0o39ve4nnlRMGWVauAHrP5jRMYkars",
        secret: "wIUq0ROHbT50HCKDFgBvd2bf96GOqvjXd7PQzsOE",
      };

      const body = {
        market: x.code,
        side: "ask",
        volume: x.trade_volume,
        price: coins_now_trade[0].trade_price.toString(),
        ord_type: "limit",
      };

      const options = {
        method: "POST",
        url: "/api/v1/orders",
        headers: {
          Accept: `application/json; charset=utf-8`,
          "Content-Type": "application/json; charset=utf-8",
          Authorization: getToken(key, body),
        },
        data: body,
      };

      new Promise((resolve, reject) => {
        axios
          .request(options)
          .then(function (response) {
            console.log(resolve(response));
            dispatch(REMOVE_AUTO_TRADE_DATA({ code: x.code }));
          })
          .catch(function (error) {
            console.log(resolve(error));
            dispatch(REMOVE_AUTO_TRADE_DATA({ code: x.code }));
          });
      });
    });
  }, [autoTradeData]);

  useInterval(() => {
    const date = new Date();

    if (Number(date.getSeconds()) === 0) {
      dispatch(CLEAR_AUTO_TRADE_SUMMARY_DATA());
      dispatch(CLEAR_AUTO_TRADE_REAL_DATA());
      setSearchOpened(true);
    }

    if (Number(date.getSeconds()) === 20) {
      const standardCnt =
        (tradeCoin
          .map((item) => item.cnt)
          .reduce((prev, curr) => prev + curr, 0) *
          30) /
        tradeCoin.length;
      console.log(standardCnt);

      const searchCoins = tradeCoin.filter(
        (data) =>
          data.cnt > standardCnt &&
          (data.bid_price / data.total_price) * 100 > 70
      );

      searchCoins.forEach((data) => {
        if (autoTradeData.findIndex((x) => x.code === data.code) === -1) {
          const coins_now_trade = realtimeData.filter(
            (coin) => coin.code === data.code
          );

          const key = {
            apiKey: "VnoQQa49yi0o39ve4nnlRMGWVauAHrP5jRMYkars",
            secret: "wIUq0ROHbT50HCKDFgBvd2bf96GOqvjXd7PQzsOE",
          };

          const body = {
            market: coins_now_trade[0].code,
            side: "bid",
            volume: (
              Math.floor((10000 / coins_now_trade[0].trade_price) * 100000000) /
              100000000
            )
              .toFixed(8)
              .toString(),
            price: coins_now_trade[0].trade_price.toString(),
            ord_type: "limit",
          };

          const options = {
            method: "POST",
            url: "/api/v1/orders",
            headers: {
              Accept: `application/json; charset=utf-8`,
              "Content-Type": "application/json; charset=utf-8",
              Authorization: getToken(key, body),
            },
            data: body,
          };

          new Promise((resolve, reject) => {
            axios
              .request(options)
              .then(function (response) {
                console.log(resolve(response));
                dispatch(
                  ADD_AUTO_TRADE_DATA({
                    code: coins_now_trade[0].code,
                    trade_price: coins_now_trade[0].trade_price,
                    trade_volume: (
                      Math.floor(
                        (10000 / coins_now_trade[0].trade_price) * 100000000
                      ) / 100000000
                    )
                      .toFixed(8)
                      .toString(),
                    total_trade_price: (
                      coins_now_trade[0].trade_price *
                      (
                        Math.floor(
                          (10000 / coins_now_trade[0].trade_price) * 100000000
                        ) / 100000000
                      ).toFixed(8)
                    )
                      .toFixed(8)
                      .toString(),
                    realData: [],
                  })
                );
              })
              .catch(function (error) {
                console.log(resolve(error));
                dispatch(
                  ADD_AUTO_TRADE_DATA({
                    code: coins_now_trade[0].code,
                    trade_price: coins_now_trade[0].trade_price,
                    trade_volume: (
                      Math.floor(
                        (10000 / coins_now_trade[0].trade_price) * 100000000
                      ) / 100000000
                    )
                      .toFixed(8)
                      .toString(),
                    total_trade_price: (
                      coins_now_trade[0].trade_price *
                      (
                        Math.floor(
                          (10000 / coins_now_trade[0].trade_price) * 100000000
                        ) / 100000000
                      ).toFixed(8)
                    )
                      .toFixed(8)
                      .toString(),
                    realData: [],
                  })
                );
              });
          });
        }
      });
      setSearchOpened(false);
    }
  }, 1000);

  return (
    <Collapse in={searchOpened}>
      <Paper elevation={2} className="mt-3 shadow-xl">
        <div className="flex flex-row justify-between items-center p-3">
          <InfoIcon color="primary" fontSize="large" />
          <Typography>매수 코인 검색중...</Typography>
        </div>
        <LinearProgress />
      </Paper>
    </Collapse>
  );
}

export default React.memo(SearchTradeCoin);
