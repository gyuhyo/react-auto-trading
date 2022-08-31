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
import { verify } from "crypto";
import searchCoin from "../../utils/hooks/common/searchCoin";
import ordersCoin from "../../utils/hooks/common/ordersCoin";
const key = {
  apiKey: "VnoQQa49yi0o39ve4nnlRMGWVauAHrP5jRMYkars",
  secret: "wIUq0ROHbT50HCKDFgBvd2bf96GOqvjXd7PQzsOE",
};
function SearchTradeCoin() {
  const [searchOpened, setSearchOpened] = useState(false);
  const dispatch = useDispatch();
  const markets = useSelector((state) => state.coin.market.data);

  useInterval(() => {
    const date = new Date();
    if (Number(date.getSeconds()) === 0) {
      setSearchOpened(true);

      async function Call() {
        return await new Promise((resolve) => {
          const coinSignal = searchCoin(
            [...markets].filter((x) => x.market.includes("KRW"))
          );

          resolve(coinSignal);
        });
      }

      Call().then((result) => {
        if (result.ask.length > 0 || result.bid.length > 0) {
          function CallAccount() {
            return new Promise(async (resolve) => {
              const response = await axios.get("/api/v1/accounts", {
                headers: {
                  Authorization: getToken(key),
                  Accept: `application/json`,
                },
              });

              resolve(response.data);
            });
          }

          CallAccount().then((account) => {
            ordersCoin(result, account);
            setSearchOpened(false);
          });
        }
      });
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
