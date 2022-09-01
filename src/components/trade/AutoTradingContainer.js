import { Alert, Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import UpbitApiModal from "./UpbitApiModal";
import { useSelector, shallowEqual } from "react-redux";
import SearchTradeCoin from "./SearchTradeCoin";
import TradingSettingModal from "./TradingSettingModal";

function AutoTradingContainer() {
  const [modalOpened, setModalOpened] = useState(false);
  const [settingModalOpened, setSettingModalOpened] = useState(false);
  const { apiKey, secret } = useSelector(
    (state) => state.user.auth,
    shallowEqual
  );

  const SignedUpbitApi = useCallback(() => {
    return (
      <Alert
        variant="filled"
        severity={!apiKey || !secret ? "error" : "success"}
        action={
          <>
            <Button
              hidden={true}
              variant="contained"
              color={!apiKey || !secret ? "error" : "success"}
              size="small"
              className={`font-bold mr-2 ${
                !apiKey || !secret ? "hidden" : "block"
              }`}
              onClick={() => setSettingModalOpened(true)}
            >
              설정
            </Button>
            <Button
              variant="contained"
              color={!apiKey || !secret ? "error" : "success"}
              size="small"
              className="font-bold"
              onClick={() => setModalOpened(true)}
            >
              API 키 {!apiKey || !secret ? "등록" : "수정"}
            </Button>
          </>
        }
      >
        {!apiKey || !secret
          ? "업비트 API 키를 먼저 등록 해주세요."
          : "업비트 API 키가 등록되었습니다."}
      </Alert>
    );
  }, [apiKey, secret]);

  return (
    <div className="p-3">
      <TradingSettingModal
        opened={settingModalOpened}
        setModalOpened={setSettingModalOpened}
      />
      <UpbitApiModal opened={modalOpened} setModalOpened={setModalOpened} />
      <SignedUpbitApi
        setSettingModalOpened={setSettingModalOpened}
        setModalOpened={setModalOpened}
      />
      <SearchTradeCoin />
    </div>
  );
}
export default React.memo(AutoTradingContainer);
