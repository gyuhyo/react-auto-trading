import { CircularProgress, Divider, Paper, styled } from "@mui/material";
import axios from "axios";
import { forEach } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_MY_WALLETS, SET_MY_WALLETS } from "../../store/reducers/trading";
import { getToken } from "../../utils/hooks/common/cusAxios";

export default function MyWalletCoinsCard() {
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.trading.mywallet);
  const key = useSelector((state) => state.user.auth);
  const markets = useSelector((state) => state.coin.market.data);

  useEffect(() => {
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
              avg_buy_price: coin.avg_buy_price,
              balance: coin.balance,
              bid_price: coin.balance * coin.avg_buy_price,
              now_price: 0,
            })
          );
        });
    }

    CallAccount();
  }, []);

  const CustomProgress = styled(CircularProgress)(({ theme }) => ({
    height: "12px !important",
    width: "12px !important",
  }));

  return (
    <Paper elevation={3} className="p-1 flex-1 flex flex-col text-xs">
      <div className="flex-1 flex flex-row text-center">
        <p className="w-[20%]">코인명</p>
        <p className="w-[20%]">매수평균가</p>
        <p className="w-[20%]">보유수량</p>
        <p className="w-[20%]">매수금액</p>
        <p className="w-[20%]">평가금액</p>
        <p className="w-[12%]">등락률</p>
      </div>
      <Divider />
      <div className="overflow-auto max-h-[200px] flex-1 flex flex-col">
        {wallets &&
          wallets.map((data) => (
            <div
              key={data.code}
              className="flex-1 flex flex-row text-right px-2"
            >
              <p className="w-[20%] text-left">{data.korean_name}</p>
              <p className="w-[20%]">
                {Number(
                  Number(data.avg_buy_price).toFixed(
                    data.avg_buy_price > 100 ? 0 : 5
                  )
                ).toLocaleString()}
              </p>
              <p className="w-[20%]">
                {Number(Number(data.balance).toFixed(8)).toLocaleString()}
              </p>
              <p className="w-[20%]">
                {Number(
                  (data.balance * data.avg_buy_price).toFixed(0)
                ).toLocaleString()}
              </p>
              <p className="w-[20%]">
                {data.now_price === 0 ? (
                  <CustomProgress color="inherit" disableShrink />
                ) : (
                  Math.floor(data.now_price * data.balance).toLocaleString()
                )}
              </p>
              <p className="w-[12%]">
                {data.now_price === 0 ? (
                  <CustomProgress color="inherit" disableShrink />
                ) : (
                  Number(
                    ((data.now_price - data.avg_buy_price) /
                      data.avg_buy_price) *
                      100
                  ).toFixed(2)
                )}
              </p>
            </div>
          ))}
      </div>
    </Paper>
  );
}
