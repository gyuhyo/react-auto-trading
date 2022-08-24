import { Alert } from "@mui/material";
import React, { useCallback, useEffect } from "react";

function WhaleAlertRow({ data }) {
  const { key, time, coin, price, usd, type, from, fromType, to, toType } =
    data;

  const changeFromText = useCallback((from) => {
    if (from === "unknown" || from === undefined) {
      return "알수없는 지갑";
    }

    return from;
  }, []);

  const changeTypeText = useCallback((text) => {
    switch (text) {
      case "unknown":
        return "송금";
      case "exchange":
        return "교환";
      default:
        return text;
    }
  }, []);

  const changeAlert = useCallback((usd) => {
    if (usd > 10000000) return "error";
    if (usd > 5000000) return "warning";
    if (usd > 1000000) return "info";

    return "success";
  }, []);

  return (
    <Alert variant="outlined" severity={changeAlert(usd)}>
      <p className="flex flex-cols gap-x-2 m-0 text-xs">
        <span className="font-bold">{time.toString()} : </span>
        <span className="text-[#e68d45]">
          {Number(price).toLocaleString("ko-kr")}
        </span>
        <span>{coin.toString().toUpperCase()}</span>
        <span>({Number(usd).toLocaleString("ko-kr")} USD)</span>
        <span>
          {changeFromText()}에서 {changeFromText()}(으)로{" "}
          {changeTypeText(toType)}
        </span>
      </p>
    </Alert>
  );
}

export default React.memo(WhaleAlertRow);
