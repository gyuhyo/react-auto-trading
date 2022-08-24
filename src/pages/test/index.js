import { Alert, Paper } from "@mui/material";
import axios from "axios";
import produce from "immer";
import React, { useCallback, useEffect, useState } from "react";
import useWhaleAlert from "../../utils/hooks/useWhaleAlert";

function index() {
  const whaleData = useWhaleAlert();

  const sliceWhale = useCallback(() => {
    return whaleData.slice(-30);
  }, [whaleData]);

  return (
    <Paper className="min-h-[500px] max-h-[500px] overflow-y-auto flex flex-col gap-y-2 p-3">
      {sliceWhale() &&
        sliceWhale().map((data) => (
          <Alert severity="info" key={data.key}>
            {JSON.stringify(data)}
          </Alert>
        ))}
    </Paper>
  );
}
