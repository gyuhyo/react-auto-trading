import { Alert } from "@mui/material";
import React, { useCallback } from "react";

function UpbitWhaleAlertRow({ data, name }) {
  const { code, trade_price, trade_volume, ask_bid, trade_timestamp, change } =
    data;

  const changeAlert = useCallback((usd) => {
    if (usd > 100000000) return "error";
    if (usd > 70000000) return "warning";
    if (usd > 50000000) return "info";

    return "success";
  }, []);

  const changeTime = useCallback((time) => {
    const date = new Date(time);

    return (
      date.getHours() +
      ":" +
      (date.getMinutes().toString().length < 2
        ? "0" + date.getMinutes()
        : date.getMinutes()) +
      ":" +
      (date.getSeconds().toString().length < 2
        ? "0" + date.getSeconds()
        : date.getSeconds())
    );
  }, []);

  const changeAskBid = useCallback((type) => {
    return type === "ASK" ? "매도" : "매수";
  }, []);

  const changeVariant = useCallback((type) => {
    return type === "ASK" ? "outlined" : "filled";
  });

  return (
    <Alert
      variant={changeVariant(ask_bid)}
      severity={changeAlert(trade_price * trade_volume)}
    >
      <p className="flex flex-cols gap-x-2 m-0 text-xs">
        <span>{changeTime(trade_timestamp)} : </span>
        <span>{name}</span>
        <span>{Number(trade_price).toLocaleString()}원에</span>
        <span>
          {trade_volume.toFixed(2)} {code.replace("KRW-", "")}
        </span>
        <span>
          ({Number((trade_price * trade_volume).toFixed(0)).toLocaleString()}
          원)
        </span>
        <span>{changeAskBid(ask_bid)}</span>
      </p>
    </Alert>
  );
}

export default React.memo(UpbitWhaleAlertRow);
