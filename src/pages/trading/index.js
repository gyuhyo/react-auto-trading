import React from "react";
import WhaleContainer from "../../components/layout/whale/WhaleContainer";
import useSocket from "../../utils/hooks/useSocket";

function Index() {
  useSocket();
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
