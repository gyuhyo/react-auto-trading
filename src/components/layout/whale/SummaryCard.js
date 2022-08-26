import { Divider, Paper, useMediaQuery, useTheme } from "@mui/material";
import React, { useCallback } from "react";

function SummaryCard(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { data, sorted, name, style } = props;

  const nowVol = useCallback((change, prev_closing_price, change_price) => {
    if (change === "RISE") {
      const nowPrice = prev_closing_price + change_price;
      return (
        <span className="text-red-600">
          ▲{" "}
          {(
            ((nowPrice - prev_closing_price) / prev_closing_price) *
            100
          ).toFixed(2)}
          %
        </span>
      );
    } else if (change === "FALL") {
      const nowPrice = prev_closing_price - change_price;
      return (
        <span className="text-blue-600">
          ▼{" "}
          {(
            ((nowPrice - prev_closing_price) / prev_closing_price) *
            100
          ).toFixed(2)}
          %
        </span>
      );
    } else {
      return <span>0.00%</span>;
    }
  }, []);

  return (
    <Paper
      elevation={3}
      className={`${
        matches ? "basis-[20%]" : "basis-[100%]"
      } p-3 flex-1 bg-gradient-to-br from-[#fff] to-[#e6e6e6]`}
      style={style}
    >
      <h5 className="m-2">
        {name} ({data.code}){" "}
        {nowVol(data.change, data.prev_closing_price, data.change_price)}
      </h5>
      <Divider />
      <div className="text-sm">
        <p
          className={`m-1 ${
            sorted === "total_cnt" ? "text-base font-bold text-blue-600" : ""
          }`}
        >
          체결횟수: {data.cnt.toLocaleString()}
        </p>
        <p
          className={`m-1 ${
            sorted === "bid_cnt" ? "text-base font-bold text-blue-600" : ""
          }`}
        >
          매수횟수: {data.bid_cnt.toLocaleString()}
        </p>
        <p
          className={`m-1 ${
            sorted === "ask_cnt" ? "text-base font-bold text-blue-600" : ""
          }`}
        >
          매도횟수: {data.ask_cnt.toLocaleString()}
        </p>
        <p
          className={`m-1 ${
            sorted === "total_price" ? "text-base font-bold text-blue-600" : ""
          }`}
        >
          체결금액: {Number(data.total_price.toFixed(0)).toLocaleString()}원
        </p>
        <p
          className={`m-1 ${
            sorted === "bid_price" ? "text-base font-bold text-blue-600" : ""
          }`}
        >
          매수금액: {Number(data.bid_price.toFixed(0)).toLocaleString()}원
        </p>
        <p
          className={`m-1 ${
            sorted === "ask_price" ? "text-base font-bold text-blue-600" : ""
          }`}
        >
          매도금액: {Number(data.ask_price.toFixed(0)).toLocaleString()}원
        </p>
      </div>
    </Paper>
  );
}

export default React.memo(SummaryCard);
