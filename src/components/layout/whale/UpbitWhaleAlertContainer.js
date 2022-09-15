import produce from "immer";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UpbitWhaleAlertRow from "./UpbitWhaleAlertRow";

function UpbitWhaleAlertContainer() {
  const [trade, setTrade] = useState([]);
  const markets = useSelector((state) => state.coin.market.data);
  const realtimeData = useSelector(
    (state) => state.coin.realtimeTradeData.data
  );

  useEffect(() => {
    if (
      realtimeData &&
      realtimeData.trade_price * realtimeData.trade_volume > 10000000
    ) {
      setTrade(
        produce((draft) => {
          draft.unshift(realtimeData);
        })
      );
    }
  }, [realtimeData]);

  const postWhaleUniqueData = useCallback(() => {
    return trade.reduce((acc, current) => {
      if (
        acc.findIndex(
          ({ sequential_id }) => sequential_id === current.sequential_id
        ) === -1
      ) {
        acc.push(current);
      }
      return acc.slice(0, 20);
    }, []);
  }, [trade]);

  return (
    <div className="max-h-[312px] overflow-y-auto flex flex-col gap-y-2 p-3">
      {postWhaleUniqueData().map((data, index) => {
        return (
          <UpbitWhaleAlertRow
            key={index}
            data={data}
            name={
              markets.filter((list) => list.market === data.code)[0].korean_name
            }
          />
        );
      })}
    </div>
  );
}

export default React.memo(UpbitWhaleAlertContainer);
