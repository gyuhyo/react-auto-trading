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

      async function Call() {
        return await new Promise((resolve) => {
          const coinSignal = searchCoin(
            [...markets].filter((x) => x.market.includes("KRW")),
            { rsiBid: trading.setting.rsiBid, rsiAsk: trading.setting.rsiAsk },
            setting.searchTime
          );

          resolve(coinSignal);
        });
      }

      Call().then((result) => {
        const okMarkets = [...realtimeData]
          .sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h)
          .slice(0, 20);

        const bidList = result.bid.filter((x) =>
          okMarkets.some((y) => x.code === y.code)
        );

        if (result.bid.length > 0) {
          ordersCoin(key, { bid: bidList }, trading.setting.onePrice);
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
          setSearchOpened(false);
        }
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
