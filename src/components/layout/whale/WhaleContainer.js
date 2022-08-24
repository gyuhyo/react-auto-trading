import { Paper } from "@mui/material";
import React from "react";
import UpbitWhaleAlertContainer from "./UpbitWhaleAlertContainer";
import WhaleAlertContainer from "./WhaleAlertContainer";

function WhaleContainer() {
  return (
    <div className="flex-1 grid grid-rows-2 auto-rows-[minmax(0, 0.5fr)] gap-y-5">
      <div className="grid grid-cols-2 gap-x-5">
        <Paper>
          <WhaleAlertContainer />
        </Paper>
        <Paper>
          <UpbitWhaleAlertContainer />
        </Paper>
      </div>
      <Paper className="flex-1">123</Paper>
    </div>
  );
}

export default React.memo(WhaleContainer);
