import { Box, Paper, Skeleton } from "@mui/material";
import { throttle } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import useClearSummary from "../../../utils/hooks/useClearSummary";
import SummaryCard from "./SummaryCard";

function SummaryContainer(props) {
  const { sorted, clearTime } = props;
  const [newArray, setNewArray] = useState([]);
  useClearSummary(clearTime);
  const summaryData = useSelector(
    (state) => state.coin.totalSummaryData.data,
    shallowEqual
  );
  const markets = useSelector((state) => state.coin.market.data);

  useEffect(() => {
    const saveData = setTimeout(() => {
      setNewArray(
        sortedSummaryData().filter((data) => data.korean_name.includes(""))
      );
    }, 500);

    return () => clearTimeout(saveData);
  }, [newArray]);

  const sortedSummaryData = useCallback(() => {
    switch (sorted) {
      case "total_cnt":
        return [...summaryData].sort((a, b) => b.cnt - a.cnt);
      case "ask_cnt":
        return [...summaryData].sort((a, b) => b.ask_cnt - a.ask_cnt);
      case "bid_cnt":
        return [...summaryData].sort((a, b) => b.bid_cnt - a.bid_cnt);
      case "total_price":
        return [...summaryData].sort((a, b) => b.total_price - a.total_price);
      case "ask_price":
        return [...summaryData].sort((a, b) => b.ask_price - a.ask_price);
      case "bid_price":
        return [...summaryData].sort((a, b) => b.bid_price - a.bid_price);
      default:
        break;
    }
  }, [summaryData, sorted]);
  return (
    <div className="z-0 p-3 flex flex-cols flex-wrap gap-3 max-h-[336px] overflow-y-auto">
      {newArray.length > 6
        ? newArray.map((data) => (
            <SummaryCard
              sorted={sorted}
              key={data.code}
              data={data}
              name={data.korean_name}
            />
          ))
        : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((data) => (
            <Skeleton
              key={data}
              elevation={3}
              height={239}
              variant="rounded"
              className="p-3 flex-1 basis-[15%]"
            />
          ))}
    </div>
  );
}

export default React.memo(SummaryContainer);
