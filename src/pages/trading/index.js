import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import useAuth from "../../utils/hooks/useAuth";
import { useDispatch } from "react-redux";
import CoinListContainer from "../../components/layout/coinList/CoinListContainer";
import WhaleContainer from "../../components/layout/whale/WhaleContainer";

function Index() {
  const dispatch = useDispatch();
  const [apiKey, secret] = useAuth();

  return (
    <div className="flex flex-row flex-wrap gap-x-5 gap-y-5">
      <CoinListContainer />
      <WhaleContainer />
    </div>
  );
}

export default React.memo(Index);
