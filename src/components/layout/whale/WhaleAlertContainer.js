import { Alert, CircularProgress } from "@mui/material";
import React, { Suspense, useCallback } from "react";
import useWhaleAlert from "../../../utils/hooks/useWhaleAlert";
import WhaleAlertRow from "./WhaleAlertRow";

function WhaleAlertContainer() {
  const whaleData = useWhaleAlert();

  const sliceWhale = useCallback(() => {
    return whaleData.slice(-30);
  }, [whaleData]);

  return (
    <div className="max-h-[500px] overflow-y-auto flex flex-col gap-y-2 p-3">
      {whaleData.length ? (
        sliceWhale().map((data) => <WhaleAlertRow key={data.key} data={data} />)
      ) : (
        <CircularProgress color="inherit" />
      )}
    </div>
  );
}

export default React.memo(WhaleAlertContainer);
