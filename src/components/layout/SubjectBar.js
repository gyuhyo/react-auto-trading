import React, { useCallback, useEffect, useState } from "react";
import {
  AppBar,
  FormControlLabel,
  Paper,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_ON_START } from "../../store/reducers/trading";

export default function SubjectBar({ text }) {
  const realtimeData = useSelector((state) => state.coin.realtimeData.data);
  const trading = useSelector((state) => state.trading.onStart);
  const { apiKey, secret } = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();

  const todayData = useCallback(() => {
    let copyData = realtimeData && [...realtimeData];

    return (
      <div className="flex flex-cols gap-x-5">
        <span>
          상승장:{" "}
          {copyData
            ? copyData.filter((data) => data["change"] === "RISE").length
            : 0}
        </span>
        <span>
          보합장:{" "}
          {copyData
            ? copyData.filter((data) => data["change"] === "EVEN").length
            : 0}
        </span>
        <span>
          하락장:{" "}
          {copyData
            ? copyData.filter((data) => data["change"] === "FALL").length
            : 0}
        </span>
      </div>
    );
  }, [realtimeData]);
  return (
    <AppBar sx={{ display: "contents" }}>
      <Toolbar
        sx={{
          backgroundColor: "#1a1a1a",
          borderRadius: "4px 4px 0 0",
        }}
        className="flex flex-cols justify-between items-center"
      >
        <Typography variant="h7" component="div">
          {text}
        </Typography>

        {text === "Chart" && todayData()}
        {text === "AUTO TRADING" && (
          <FormControlLabel
            value="트레이딩 ON/OFF"
            control={
              <Switch
                disabled={!apiKey || !secret ? true : false}
                color="primary"
                checked={trading}
                onChange={(e) => {
                  if (
                    e.target.checked &&
                    !confirm(
                      "자동매매 사용으로 인한 피해는 개발자가 책임지지 않습니다.\n\n동의하시면 [확인] 버튼을 클릭해주세요."
                    )
                  ) {
                    e.preventDefault();
                    return;
                  }

                  dispatch(CHANGE_ON_START(e.target.checked));
                }}
              />
            }
            label="트레이딩 ON/OFF"
            labelPlacement="start"
          />
        )}
      </Toolbar>
    </AppBar>
  );
}
