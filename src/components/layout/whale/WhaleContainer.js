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
import { useDispatch } from "react-redux";
import { CLEAR_SUMMARY_DATA } from "../../../store/reducers/coin";
import SubjectBar from "../SubjectBar";
import OrderbookContainer from "./OrderbookContainer";
import SummaryContainer from "./SummaryContainer";
import UpbitWhaleAlertContainer from "./UpbitWhaleAlertContainer";
import WhaleAlertContainer from "./WhaleAlertContainer";

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
  const [clearTime, setClearTime] = useState(5);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    const startClearTimer = setInterval(() => {
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
      <Paper className="flex-1">
        <SubjectBar text="실시간 체결 순위" />
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
            <Typography component="h5" className="text-sm font-bold pr-5">
              초기화 시간
            </Typography>
            <StyledToggleButtonGroup
              size="small"
              value={clearTime}
              exclusive
              onChange={(e, time) => {
                if (time !== null) setClearTime(time);
              }}
            >
              <ToggleButton value={1}>1분</ToggleButton>
              <ToggleButton value={3}>3분</ToggleButton>
              <ToggleButton value={5}>5분</ToggleButton>
              <ToggleButton value={10}>10분</ToggleButton>
              <ToggleButton value={30}>30분</ToggleButton>
              <ToggleButton value={60}>60분</ToggleButton>
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
            <Typography component="h5" className="text-sm font-bold pr-5">
              정렬순서
            </Typography>
            <StyledToggleButtonGroup
              size="small"
              value={sorted}
              exclusive
              onChange={(e, sort) => {
                if (sort !== null) setSorted(sort);
              }}
            >
              <ToggleButton value="total_cnt">총 체결횟수</ToggleButton>
              <ToggleButton value="bid_cnt">매수 체결횟수</ToggleButton>
              <ToggleButton value="ask_cnt">매도 체결횟수</ToggleButton>
              <ToggleButton value="total_price">총 체결금액</ToggleButton>
              <ToggleButton value="bid_price">매수 체결금액</ToggleButton>
              <ToggleButton value="ask_price">매도 체결금액</ToggleButton>
            </StyledToggleButtonGroup>
          </Paper>
        </Paper>
        <SummaryContainer sorted={sorted} clearTime={clearTime} />
      </Paper>
      <div
        className={`${
          matches
            ? "grid-cols-2"
            : "grid-cols-[repeat(auto-fill, minmax(0, 1fr))]"
        } grid gap-5 max-h-[336px]`}
      >
        <Paper>
          <SubjectBar text="ORDER BOOK" />
          {/*<WhaleAlertContainer />*/}
          <OrderbookContainer />
        </Paper>
        <Paper>
          <SubjectBar text="업비트 고래 알리미" />
          <UpbitWhaleAlertContainer />
        </Paper>
      </div>
    </div>
  );
}

export default React.memo(WhaleContainer);
