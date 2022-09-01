import { CircularProgress, styled } from "@mui/material";
import React, { useCallback } from "react";

function MyWalletCoinsRow({ data }) {
  const CustomProgress = styled(CircularProgress)(({ theme }) => ({
    height: "12px !important",
    width: "12px !important",
  }));

  const color = useCallback((now_price, avg_buy_price) => {
    const per = Number(
      Number(((now_price - avg_buy_price) / avg_buy_price) * 100).toFixed(2)
    );

    if (per > 0) return "text-red-400";
    if (per === 0) return "";
    if (per < 0) return "text-blue-400";
  });

  return (
    <div key={data.code} className="flex-1 flex flex-row text-right px-2">
      <p className="w-[20%] text-left">{data.korean_name}</p>
      <p className="w-[20%]">
        {Number(
          Number(data.avg_buy_price).toFixed(data.avg_buy_price > 100 ? 0 : 5)
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
      <p className={`w-[12%] ${color(data.now_price, data.avg_buy_price)}`}>
        {data.now_price === 0 ? (
          <CustomProgress color="inherit" disableShrink />
        ) : (
          (Number(
            Number(
              ((data.now_price - data.avg_buy_price) / data.avg_buy_price) * 100
            ).toFixed(2)
          ) > 0
            ? "+"
            : "",
          Number(
            ((data.now_price - data.avg_buy_price) / data.avg_buy_price) * 100
          ).toFixed(2))
        )}
      </p>
    </div>
  );
}

export default React.memo(MyWalletCoinsRow);
