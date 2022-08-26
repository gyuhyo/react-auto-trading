import { LinearProgress } from "@mui/material";
import React from "react";

function OrderbookRow({ data, name }) {
  const { total_ask_size, total_bid_size } = data;
  return (
    <div className="flex flex-row justify-between items-center gap-y-4 text-xs">
      <span className="flex-1">{name}</span>
      <span className="mr-2">
        {((total_ask_size / (total_ask_size + total_bid_size)) * 100).toFixed(
          0
        )}
        %
      </span>
      <LinearProgress
        variant="determinate"
        value={(total_ask_size / (total_ask_size + total_bid_size)) * 100}
        className="flex-1"
        style={{
          transform: "scaleX(-1)",
        }}
      />
      <LinearProgress
        color="secondary"
        variant="determinate"
        value={(total_bid_size / (total_ask_size + total_bid_size)) * 100}
        className="flex-1"
      />
      <span className="ml-2">
        {((total_bid_size / (total_ask_size + total_bid_size)) * 100).toFixed(
          0
        )}
        %
      </span>
    </div>
  );
}

export default React.memo(OrderbookRow);
