import { Collapse, LinearProgress, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { CLEAR_AUTO_TRADE_SUMMARY_DATA } from "../../store/reducers/coin";
import useInterval from "../../utils/hooks/useInterval";

function SearchTradeCoin() {
  const [searchOpened, setSearchOpened] = useState(false);
  const [copyTradeCoin, setCopyTradeCoin] = useState([]);
  const dispatch = useDispatch();
  const tradeCoin = useSelector(
    (state) => state.coin.autoTradeSummaryData.data
  );

  useInterval(() => {
    const date = new Date();

    if (Number(date.getSeconds()) === 0) {
      dispatch(CLEAR_AUTO_TRADE_SUMMARY_DATA());
      setSearchOpened(true);
    }

    if (Number(date.getSeconds()) === 30) {
      console.log(
        tradeCoin.filter(
          (data) =>
            data.cnt > 20 && (data.bid_price / data.total_price) * 100 > 60
        )
      );
      setSearchOpened(false);
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
