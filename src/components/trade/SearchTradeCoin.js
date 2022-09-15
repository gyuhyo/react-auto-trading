import { Collapse, LinearProgress, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import useInterval from "../../utils/hooks/useInterval";
import { cusAxios, getToken } from "../../utils/hooks/common/cusAxios";
import axios from "axios";
import request from "request";
import searchCoin from "../../utils/hooks/common/searchCoin";
import ordersCoin from "../../utils/hooks/common/ordersCoin";

function SearchTradeCoin() {
  const [searchOpened, setSearchOpened] = useState(false);
  const dispatch = useDispatch();
  const realtimeData = useSelector((state) => state.coin.realtimeData.data);
  const markets = useSelector((state) => state.coin.market.data);
  const key = useSelector((state) => state.user.auth);
  const trading = useSelector((state) => state.trading);
  const setting = useSelector((state) => state.trading.setting);

  useInterval(() => {
    if (!trading.onStart) return;

    const date = new Date();
    if (Number(date.getSeconds()) === 0) {
      setSearchOpened(true);

      let account;

      async function Call() {
        return await new Promise(async (resolve) => {
          account = await axios.get("/api/v1/accounts", {
            headers: {
              Authorization: getToken(key),
              Accept: `application/json`,
            },
          });

          const okMarkets = [...realtimeData]
            .sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h)
            .slice(0, setting.coinTop)
            .map((x) => x.code);

          const acc = account.data
            .map((x) => {
              if (x.currency != "KRW") return "KRW-" + x.currency;
            })
            .filter((x) => x !== undefined);

          const result = [...new Set([...acc, ...okMarkets])];

          const coinSignal = searchCoin(
            result,
            { rsiBid: trading.setting.rsiBid, rsiAsk: trading.setting.rsiAsk },
            setting.searchTime
          );

          resolve(coinSignal);
        });
      }

      Call().then((result) => {
        if (result.bid.length > 0) {
          (async () => {
            const orders = await axios.get("/api/v1/orders", {
              headers: {
                Authorization: getToken(key),
                Accept: `application/json`,
              },
            });

            const acc = account.data.map((x) => "KRW-" + x.currency);
            const ord = orders.data.map((x) => x.market);

            const coins = bidList
              .map((x) => {
                if (![...acc, ...ord].includes(x.code)) return x;
              })
              .filter((x) => x !== undefined);

            const krw = coins.filter((x) => x.code === "KRW-KRW");
            let result = [];
            coins
              .filter((x) => x.code !== "KRW-KRW")
              .slice(
                0,
                Math.floor(
                  krw.price /
                    (coins.length -
                      1 *
                        trading.setting.onePrice *
                        (trading.setting.askDownPer * -1))
                )
              )
              .forEach((x) => {
                let size = x.price;
                const warterSize =
                  1 - (trading.setting.askDownPer * -1 - 1) * 0.01;
                for (var i = 1; i >= warterSize; i -= 0.01) {
                  const prevSize = size;
                  size = prevSize * i;
                  if (size >= 100) {
                    size = size.toFixed(0);
                  } else if (size >= 1) {
                    size = size.toFixed(2);
                  } else {
                    size = size.toFixed(4);
                  }
                  result.push({ code: x.code, price: size });
                  size = (size + prevSize) / 2;
                }
              });

            ordersCoin(key, { bid: result }, trading.setting.onePrice);
          })();
        }
        if (result.ask.length > 0) {
          if (
            trading.setting.autoAskType === "rsi" ||
            trading.setting.autoAskType === "rsiPer"
          ) {
            ordersCoin(
              key,
              { ask: result.ask },
              trading.setting.onePrice,
              trading.mywallet
            );
          }
        }

        setSearchOpened(false);
      });
    }
  }, 1000);

  return (
    <Collapse in={searchOpened}>
      <Paper
        elevation={2}
        className="mt-3 shadow-xl absolute top-0 left-[calc(50vw_-_306px)] w-[613px] my-0 mx-auto"
      >
        <div className="flex flex-row justify-between items-center p-3">
          <InfoIcon color="primary" fontSize="large" />
          <Typography>Searching Coins...</Typography>
        </div>
        <LinearProgress />
      </Paper>
    </Collapse>
  );
}

export default React.memo(SearchTradeCoin);
