import { Paper } from "@mui/material";
import React from "react";
import useAuth from "../../utils/hooks/useAuth";
import { useDispatch } from "react-redux";
import CoinListContainer from "../../components/layout/coinList/CoinListContainer";

function Index() {
  const dispatch = useDispatch();
  const [apiKey, secret] = useAuth();

  return (
    <div className="flex flex-row flex-wrap gap-x-5 gap-y-5">
      <CoinListContainer />
      <Paper elevation={3} className="flex-1 p-3">
        123
      </Paper>
    </div>
  );
}

export default React.memo(Index);
