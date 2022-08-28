import React, { useCallback, useEffect, useState } from "react";
import { AppBar, Paper, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function SubjectBar({ text }) {
  const realtimeData = useSelector((state) => state.coin.realtimeData.data);

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

        {text === "실시간 체결 순위" && todayData()}
      </Toolbar>
    </AppBar>
  );
}
