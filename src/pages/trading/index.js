import { Paper, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import useAuth from "../../utils/hooks/useAuth";
import { useDispatch } from "react-redux";
import CoinListContainer from "../../components/layout/coinList/CoinListContainer";
import WhaleContainer from "../../components/layout/whale/WhaleContainer";
import SubjectBar from "../../components/layout/SubjectBar";
import useSocket from "../../utils/hooks/useSocket";
import {
  cusAxios,
  cusMyWallet,
  getToken,
} from "../../utils/hooks/common/cusAxios";
import axios from "axios";

function Index() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  useSocket();

  useEffect(() => {
    const param = {
      key: {
        apiKey: "VnoQQa49yi0o39ve4nnlRMGWVauAHrP5jRMYkars",
        secret: "wIUq0ROHbT50HCKDFgBvd2bf96GOqvjXd7PQzsOE",
      },
    };

    async function Call() {
      const response = await axios.get("/api/v1/accounts", {
        headers: {
          Authorization: getToken(param.key),
          Accept: `application/json`,
        },
      });
      console.log(response.data);
    }

    Call();
  }, []);
  return (
    <div className="flex flex-row flex-wrap gap-x-5 gap-y-5">
      {/*
      <Paper
        className={`${
          matches ? "sticky top-[20px] flex-none" : ""
        } min-w-[300px] max-w-[550px] max-h-[calc(100vh_-_150px)] bg-white`}
      >
        <SubjectBar text="업비트 시세" />
        <CoinListContainer />
      </Paper>
      */}
      <WhaleContainer />
    </div>
  );
}

export default React.memo(Index);
