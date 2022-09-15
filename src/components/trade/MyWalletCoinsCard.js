import { Divider, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_MY_WALLETS, SET_MY_WALLETS } from "../../store/reducers/trading";
import { getToken } from "../../utils/hooks/common/cusAxios";
import { orders } from "../../utils/hooks/common/ordersCoin";
import useInterval from "../../utils/hooks/useInterval";
import MyWalletCoinsRow from "./MyWalletCoinsRow";

function MyWalletCoinsCard() {
  const dispatch = useDispatch();
  const trading = useSelector((state) => state.trading);
  const key = useSelector((state) => state.user.auth);
  const markets = useSelector((state) => state.coin.market.data);

  useInterval(() => {
    CallWallet();
  }, 60000);

  function CallWallet() {
    dispatch(CLEAR_MY_WALLETS());

    async function CallAccount() {
      const response = await axios.get("/api/v1/accounts", {
        headers: {
          Authorization: getToken(key),
          Accept: `application/json`,
        },
      });

      response.data
        .filter((x) => x.currency !== "KRW")
        .forEach((coin) => {
          dispatch(
            SET_MY_WALLETS({
              code: "KRW-" + coin.currency,
              korean_name: markets.filter(
                (m) => m.market === "KRW-" + coin.currency
              )[0].korean_name,
              avg_buy_price: Number(coin.avg_buy_price),
              balance: Number(coin.balance),
              bid_price: coin.balance * coin.avg_buy_price,
              now_price: 0,
            })
          );
        });
    }

    CallAccount();
  }

  useEffect(() => {
    if (trading.onStart) {
      if (
        trading.setting.autoAskType === "per" ||
        trading.setting.autoAskType === "rsiPer"
      ) {
        const askCoins = [...trading.mywallet].filter(
          (x) =>
            x.now_price > 0 &&
            (((x.now_price - x.avg_buy_price) / x.avg_buy_price) * 100 >
              trading.setting.askUpPer ||
              ((x.now_price - x.avg_buy_price) / x.avg_buy_price) * 100 <
                trading.setting.askDownPer)
        );

        if (askCoins.length > 0) {
          async function CallOrdersCheck() {
            const response = await axios.get("/api/v1/orders", {
              headers: {
                Authorization: getToken(key),
                Accept: `application/json`,
              },
            });

            const accounts = await axios.get("/api/v1/accounts", {
              headers: {
                Authorization: getToken(key),
                Accept: `application/json`,
              },
            });

            askCoins.forEach((c) => {
              if (
                accounts.data.filter((o) => "KRW-" + o.currency === c.code)
                  .length <= 0 ||
                response.data.filter(
                  (o) => o.state === "wait" && o.market === c.code
                ).length > 0
              )
                return;

              const body = {
                market: c.code,
                side: "ask",
                volume: c.balance,
                price: c.now_price,
                ord_type: "limit",
              };

              orders(body, key);
            });
          }

          CallOrdersCheck();
        }
      }
    }
  }, [trading.mywallet]);

  return (
    <Paper elevation={3} className="p-1 flex-1 flex flex-col text-xs">
      <div className="flex-1 flex flex-row text-right px-2">
        <p className="w-[20%] text-left">코인명</p>
        <p className="w-[20%]">매수평균가</p>
        <p className="w-[20%]">보유수량</p>
        <p className="w-[20%]">매수금액</p>
        <p className="w-[20%]">평가금액</p>
        <p className="w-[12%]">등락률</p>
      </div>
      <Divider />
      <div className="overflow-auto max-h-[200px] flex-1 flex flex-col">
        {trading.mywallet &&
          trading.mywallet.map((data) => (
            <MyWalletCoinsRow key={data.code} data={data} />
          ))}
      </div>
    </Paper>
  );
}

export default React.memo(MyWalletCoinsCard);
