import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderbookRow from "./OrderbookRow";

function OrderbookContainer() {
  const markets = useSelector((state) => state.coin.market.data);
  const realtimeData = useSelector(
    (state) => state.coin.realtimeOrderbookData.data
  );

  const sortOrderbook = useCallback(() => {
    return [...realtimeData].sort(
      (a, b) =>
        (b.total_ask_size / (b.total_ask_size + b.total_bid_size)) * 100 -
        (a.total_ask_size / (a.total_ask_size + a.total_bid_size)) * 100
    );
  });

  return (
    <div className="max-h-[312px] overflow-y-auto flex flex-col gap-y-2 p-3">
      {sortOrderbook() &&
        sortOrderbook().map((data) => (
          <OrderbookRow
            key={data.code}
            data={data}
            name={
              markets.filter((list) => list.market === data.code)[0].korean_name
            }
          />
        ))}
    </div>
  );
}

export default React.memo(OrderbookContainer);
