import {
  Button,
  ButtonGroup,
  Paper,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_SUMMARY_DATA } from "../../../store/reducers/coin";
import AutoTradingContainer from "../../trade/AutoTradingContainer";
import SubjectBar from "../SubjectBar";
import OrderbookContainer from "./OrderbookContainer";
import SummaryContainer from "./SummaryContainer";
import UpbitWhaleAlertContainer from "./UpbitWhaleAlertContainer";
import WhaleAlertContainer from "./WhaleAlertContainer";
import Chart from "./../../trade/Chart";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

function WhaleContainer() {
  const dispatch = useDispatch();
  const [sorted, setSorted] = useState("total_cnt");
  const [clearTime, setClearTime] = useState(1);
  const [krwMarkets, setKrwMarkets] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const markets = useSelector((state) => state.coin.market.data);

  useEffect(() => {
    const startClearTimer = setInterval(() => {
      //dispatch(CLEAR_SUMMARY_DATA());

      const date = new Date();
      if (clearTime === 60) {
        if (
          Number(date.getMinutes()) === 0 &&
          Number(date.getSeconds()) === 0
        ) {
          dispatch(CLEAR_SUMMARY_DATA());
        }
      } else {
        if (
          Number(date.getMinutes()) % clearTime === 0 &&
          Number(date.getSeconds()) === 0
        ) {
          dispatch(CLEAR_SUMMARY_DATA());
        }
      }
    }, 1000);

    return () => clearInterval(startClearTimer);
  }, [clearTime]);

  return (
    <div className="flex-1 grid grid-rows-2 auto-rows-[minmax(0, 0.5fr)] gap-y-5">
      <Paper elevation={5} className="flex-1 h-[450px]">
        <SubjectBar text="Chart" />
        <Chart watchList={null} />
        {/*
        <Paper
          elevation={3}
          className={`p-3 z-[9999] border-0 border-b-2 border-[#e0e0e0] border-solid shadow-lg rounded-none text-right flex ${
            matches ? "flex-row" : "flex-col gap-y-3"
          } justify-between items-center`}
        >
          
          
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              flexWrap: "wrap",
            }}
            className="items-center pl-2"
          >
            <Typography component="h5" className="text-sm font-bold pr-5 pl-1">
              ????????? ??????
            </Typography>
            <StyledToggleButtonGroup
              size="small"
              value={clearTime}
              exclusive
              onChange={(e, time) => {
                if (time !== null) setClearTime(time);
              }}
            >
              <ToggleButton value={1}>1???</ToggleButton>
              <ToggleButton value={3}>3???</ToggleButton>
              <ToggleButton value={5}>5???</ToggleButton>
              <ToggleButton value={10}>10???</ToggleButton>
              <ToggleButton value={30}>30???</ToggleButton>
              <ToggleButton value={60}>60???</ToggleButton>
            </StyledToggleButtonGroup>
          </Paper>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              flexWrap: "wrap",
            }}
            className="items-center pl-2"
          >
            <Typography component="h5" className="text-sm font-bold pr-5 pl-1">
              ????????????
            </Typography>
            <StyledToggleButtonGroup
              size="small"
              value={sorted}
              exclusive
              onChange={(e, sort) => {
                if (sort !== null) setSorted(sort);
              }}
            >
              <ToggleButton value="total_cnt">??? ????????????</ToggleButton>
              <ToggleButton value="bid_cnt">?????? ????????????</ToggleButton>
              <ToggleButton value="ask_cnt">?????? ????????????</ToggleButton>
              <ToggleButton value="total_price">??? ????????????</ToggleButton>
              <ToggleButton value="bid_price">?????? ????????????</ToggleButton>
              <ToggleButton value="ask_price">?????? ????????????</ToggleButton>
            </StyledToggleButtonGroup>
          </Paper>
        </Paper>
        <SummaryContainer sorted={sorted} clearTime={clearTime} />
            */}
      </Paper>
      <div className={`grid-cols-3 grid gap-5 max-h-[375px] mt-14`}>
        <Paper elevation={5} className="max-h-[375px]">
          <SubjectBar text="AUTO TRADING" />
          {/*<WhaleAlertContainer />*/}
          <AutoTradingContainer />
        </Paper>
        <Paper elevation={5} className="max-h-[375px]">
          <SubjectBar text="ORDER BOOK" />
          {/*<WhaleAlertContainer />*/}
          <OrderbookContainer />
        </Paper>
        <Paper elevation={5} className="max-h-[375px]">
          <SubjectBar text="????????? ?????? ?????????" />
          <UpbitWhaleAlertContainer />
        </Paper>
      </div>
    </div>
  );
}

export default React.memo(WhaleContainer);
