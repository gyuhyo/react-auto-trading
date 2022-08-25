import React, { useCallback, useEffect } from "react";
import { TableCell, TableRow } from "@mui/material";

function CoinRow({ data, name }) {
  const {
    code,
    trade_price,
    change_rate,
    acc_trade_price_24h,
    change,
    change_price,
  } = data;

  const textColor = useCallback((change) => {
    if (change === "RISE") {
      return "text-[#245dd8]";
    } else if (change === "FALL") {
      return "text-[#d82424]";
    }
    return "";
  }, []);

  const changeLiteral = useCallback((change) => {
    if (change === "RISE") {
      return "+";
    } else if (change === "FALL") {
      return "-";
    }
    return "";
  }, []);

  const fixPrice = useCallback((price) => {
    // 가격 단위 조정 함수
    return Number(price.toFixed(2)).toLocaleString();
  }, []);

  return (
    <TableRow
      key={code}
      sx={{
        "& MuiTableRow-root p": {
          margin: 0,
        },
      }}
    >
      <TableCell align="left">
        <p className="m-0">{name}</p>
        <span className="text-[0.8em] text-[#7c7c7c]">{code}</span>
      </TableCell>
      <TableCell align="right">
        <span className={textColor(change)}>
          {trade_price.toLocaleString()}
        </span>
      </TableCell>
      <TableCell align="right">
        <p className={`m-0 ${textColor(change)}`}>{`${changeLiteral(change)} ${(
          change_rate * 100
        ).toFixed(2)}%`}</p>
        <span className={textColor(change)}>{`${changeLiteral(
          change
        )} ${fixPrice(change_price)}`}</span>
      </TableCell>
      <TableCell align="right">
        {parseInt((acc_trade_price_24h * 0.000001).toFixed(0)).toLocaleString()}
        백만
      </TableCell>
    </TableRow>
  );
}

export default React.memo(CoinRow);
